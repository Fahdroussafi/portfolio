import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="px-5 sm:px-9 md:px-14 pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-3">
        <a href="https://github.com/Fahdroussafi" target="_blank" rel="noreferrer" aria-label="GitHub">
          <div className="social-icon active:scale-90 transition-transform">
            <FaGithub className="w-1/2 h-1/2 text-white" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/fahd-roussafi/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <div className="social-icon active:scale-90 transition-transform">
            <FaLinkedin className="w-1/2 h-1/2 text-white" />
          </div>
        </a>
        <a href="https://www.instagram.com/fahd.roussafi/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <div className="social-icon active:scale-90 transition-transform">
            <FaInstagram className="w-1/2 h-1/2 text-white" />
          </div>
        </a>
      </div>

      <p className="text-white-500 text-sm sm:text-base">© {year} Fahd Roussafi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
