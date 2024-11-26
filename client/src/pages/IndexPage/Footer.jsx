

const Footer = () => {
  return (
    <div>
<footer className="bg-gray-800 text-gray-300 py-6">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white">NoteNest.</h1>
        </div>

        {/* Quick Links and Contact */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-12">
            {/* Quick Links */}
            <ul className="flex space-x-6">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#feature" className="hover:text-white">Features</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
            </ul>

            {/* Contact Section */}
            <div>
                <h1 className="font-medium text-white">Contact Developer</h1>
                <p>Ritesh Sharma</p>
                <a 
                    href="mailto:sharma.ritesh2406@gmail.com" 
                    className="hover:text-white" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    sharma.ritesh2406@gmail.com
                </a>
            </div>
        </div>
    </div>

    {/* Copyright Section */}
    <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm">
        © {new Date().getFullYear()} NoteNest. Made with ❤️
    </div>
</footer>
    </div>
  )
}

export default Footer
