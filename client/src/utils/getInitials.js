export const getInitials = (name) => {
    if(!name)
    {
        return "";
    }
    let initials = "";
    const words = name.split(" ");
    for(let i=0; i<Math.min(words.length,2); i++)
    {
        initials+=words[i][0];
    }
    return initials.toUpperCase();
}
