import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiReact, SiShopware } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: "Products", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
  ];

  const socialLinks = [
    { icon: <FaGithub className="h-5 w-5" />, href: "#" },
    { icon: <FaLinkedin className="h-5 w-5" />, href: "#" },
    { icon: <FaTwitter className="h-5 w-5" />, href: "#" },
  ];

  const techStack = [
    { icon: <SiReact className="h-5 w-5 text-cyan-400" />, name: "React" },
    { icon: <SiTailwindcss className="h-5 w-5 text-sky-400" />, name: "Tailwind" },
    { icon: <SiFramer className="h-5 w-5 text-purple-400" />, name: "Framer" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-900 to-pink-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <SiShopware className="h-8 w-8 text-teal-300" />
              <span className="ml-2 text-xl font-bold font-mono">
                Product<span className="text-teal-300">Hub</span>
              </span>
            </div>
            <p className="text-pink-100">
              The ultimate product management solution for modern teams.
            </p>
          </motion.div>

          <div>
            <h3 className="text-sm font-semibold text-teal-300 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-pink-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-teal-300 tracking-wider uppercase">
              Powered By
            </h3>
            <div className="mt-4 space-y-3">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  {tech.icon}
                  <span className="text-pink-100">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-teal-300 tracking-wider uppercase">
              Connect With Us
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-pink-700 flex flex-col items-center"
        >
          <p className="text-pink-200 text-sm">
            &copy; {currentYear} ProductHub. All rights reserved.
          </p>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="text-pink-200 hover:text-white text-xs">
              Privacy Policy
            </a>
            <a href="#" className="text-pink-200 hover:text-white text-xs">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;