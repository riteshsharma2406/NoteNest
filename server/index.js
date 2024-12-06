

require("dotenv").config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const {authenticateToken} = require('./utilities')
const User = require('./models/user.model')
const Notes = require('./models/notes.model')

mongoose.connect(process.env.CONNECTION_STRING)

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.get('/', (req,res) => {
    res.send("hello")
})


// Create account API
app.post("/create-account", async (req, res) => {
    const {fullName, email, password} = req.body;
    
    if(!fullName)
    {
        return res.status(400).json({
            error: true,
            message: "Full name is required"
        })
    }

    if(!email)
    {
        return res.status(400).json({
            error: true,
            message: "Email is required"
        })
    }

    if(!password)
    {
        return res.status(400).json({
            error: true,
            message: "Password is required"
        })
    }

    const isUser = await User.findOne({email: email});

    if(isUser)
    {
        return res.status(400).json({
            error: true,
            message: "User already Exists"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save();

    const accessToken = jwt.sign({user
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h"
    });

    return res.json({
        error: false,
        message: "Registration successful",
        user,
        accessToken
    });
});

//get all user API
app.get("/get-user", authenticateToken, async (req,res)=>{
    const {user} = req.user;


    try{
        const isUser = await User.findOne({_id: user._id});
    
        if(!isUser)
        {
            return res.status(404).json({
                error: true
            })
        }

        return res.json({
            user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn},
            message: "user details"
        })
    }catch(error)
    {
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }

})

//login API

app.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    if(!email)
    {
       return  res.status(400).json({
            error: true,
            message: "Email is required"
        })
    }

    if(!password)
    {
        return res.status(400).json({
            error: true,
            message: "password is required"
        })
    }

    try{
        const userInfo = await User.findOne({email: email})
    
        if(!userInfo)
        {
            return res.status(400).json({
                error: true,
                message: "User not found"
            })
        }
    
        if(userInfo.email === email && userInfo.password === password)
        {
            const user = {user: userInfo};
            const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: "2h"
            });
    
            return res.json({
                error: false,
                message: "Login successful",
                accessToken,
                email
            })
        }
    }catch(e)
    {
        console.log("Error:",e);
        return res.status(400).json({
            error: true,
            message: "Invalid Login",
            email
        })
    }
});

//Add Notes API
app.post("/add-notes", authenticateToken, async (req, res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if(!title)
    {
        return res.status(400).json({
            error: true,
            message: "Title is required"
        })
    }

    if(!content)
    {
        return res.status(400).json({
            error: true,
            message: "Content is required"
        })
    }

    try{
        const notes = new Notes({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });
        await notes.save();

        return res.json({
            error: false,
            notes,
            message: "Notes added successfully"
        })
    }catch(error)
    {
        return res.status(500).json({
            error: true,
            message: "Internal Server error"
        });
    }
});

//edit notes API
app.put("/edit-notes/:noteId", authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId;
    const {title, content, tags, isPinned} = req.body;
    const {user} = req.user;

    if(!title && !content && !tags)
    {
        return res.status(400).json({
            error: true,
            message: "No Changes Provided"
        })
    }

    try{
        const notes = await Notes.findOne({_id: noteId, userId: user._id});

        if(!notes)
        {
            res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        if(title) notes.title = title;
        if(content) notes.content = content;
        if(tags) notes.tags = tags;
        notes.isPinned = isPinned ? isPinned : false

        await notes.save();

        return res.json({
            error: false,
            notes,
            message: "Note updated successfully"
        });
    }catch(error)
    {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

//get all notes API
app.get("/get-all-notes", authenticateToken, async (req,res)=>{
    const {user} = req.user;
    
    try{
        const notes = await Notes.find({userId: user._id}).sort({isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully"
        })
    }catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }
})

//delete Note API
app.delete("/delete-note/:noteId", authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId;
    const {user} = req.user;

    try{
        const note = await Notes.findOne({_id: noteId, userId: user._id});

        if(!note)
        {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        await Notes.deleteOne({_id: noteId, userId: user._id});

        return res.json({
            error: false,
            message: "Note deleted successfully"
        })
    }catch(error)
    {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

// Update isPinned value API
app.put("/pinned/:noteId", authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId;
    const {user} = req.user;
    const {isPinned} = req.body;

    try{
        const note = await Notes.findOne({_id: noteId, userId: user._id});

        if(!note)
        {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        note.isPinned = isPinned ? isPinned : false

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated Successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }
})

//search note API
app.get("/search-notes", authenticateToken, async (req, res)=>{
    const {user} = req.user;
    const {query} = req.query

    if(!query)
    {
        return res.status(404).json({
            error: true,
            message: "Search query is required"
        })
    }

    try{
        const matchingNotes = await Notes.find({userId: user._id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}}
            ],
        })

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully"
        })
    }catch(error)
    {
        return res.status(500).json({
            error: true,
            message: "Internal Server error"
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports = app;