const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6  border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left side */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} Referly. All rights reserved.</p>
        </div>

        {/* Center */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-600 text-sm">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 text-sm">Terms of Use</a>
          <a href="#" className="hover:text-blue-600 text-sm">Contact</a>
        </div>

        {/* Right side (optional credits or version) */}
        <div className="text-sm text-center md:text-right">
          <p>Built with ❤️ by Sajjak</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
