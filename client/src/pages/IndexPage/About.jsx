

const About = () => {
  return (
    <div>
      <div id="about" className="about-section py-10 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#623817]">About NoteNest</h2>
        <p className="text-lg mb-6">
            At NoteNest, we believe in simplifying the way you manage your thoughts, ideas, and tasks. 
            Our mission is to provide a seamless, secure, and efficient platform for capturing and organizing 
            your notes, empowering you to stay productive and focused.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6 py-10">
    <div className="card bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Smart Note Management</h3>
        <p className="text-gray-600">Add, edit, and organize notes effortlessly.</p>
    </div>
    <div className="card bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
        <p className="text-gray-600">Advanced user authentication keeps your notes private.</p>
    </div>
    <div className="card bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Download Anytime</h3>
        <p className="text-gray-600">Export your notes for offline use in a few clicks.</p>
    </div>
    <div className="card bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">User-Friendly Design</h3>
        <p className="text-gray-600">An intuitive interface for a hassle-free experience.</p>
    </div>
</div>
        <p className="text-lg font-semibold mt-6 text-[#623817]">Start organizing your ideas with NoteNest today!</p>
        </div>
    </div>
  )
}

export default About
