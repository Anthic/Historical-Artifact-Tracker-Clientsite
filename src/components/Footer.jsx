import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">ArtifactHub</h3>
            <p className="text-sm">
              Preserving history, one artifact at a time. Join our community of cultural enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Collections</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <p className="text-sm">123 Heritage Street<br/>Cultural City, CC 45678</p>
            <p className="text-sm mt-2">Email: <a href="mailto:info@artifacthub.com" className="text-blue-400 hover:text-blue-300">info@artifacthub.com</a></p>
            <p className="text-sm">Phone: <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-300">+1 (234) 567-890</a></p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ArtifactHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;