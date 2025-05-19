import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="sm:px-14 px-9 pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-3">
        <a href="https://github.com/Fahdroussafi" target="_blank" rel="noreferrer">
          <div className="social-icon">
            <FaGithub className="w-1/2 h-1/2 text-white" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/fahd-roussafi/" target="_blank" rel="noreferrer">
          <div className="social-icon">
            <FaLinkedin className="w-1/2 h-1/2 text-white" />
          </div>
        </a>
        <a href="https://www.instagram.com/fahdroussafi" target="_blank" rel="noreferrer">
          <div className="social-icon">
            <FaInstagram className="w-1/2 h-1/2 text-white" />
          </div>
        </a>
      </div>

      <p className="text-white-500">© {year} Fahd Roussafi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
