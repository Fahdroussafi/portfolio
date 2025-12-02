import clsx from 'clsx';
import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import { navLinks } from '../constants';
import { useGsapHover } from '../hooks/use-gsap-hover';

const NavItem = ({ id, href, name }) => {
  const navRef = useGsapHover({ scale: 1.1, y: -2, duration: 0.3 });

  return (
    <li className="nav-li" key={id}>
      <a ref={navRef} onClick={() => {}} className="nav-li_a hover-lift" href={href}>
        {name}
      </a>
    </li>
  );
};

const NavItems = () => {
  return (
    <ul className="nav-ul">
      {navLinks.map((link) => (
        <NavItem key={link.id} {...link} />
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Fahd
          </a>
          <button
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
            onClick={toggleMenu}>
            {isOpen ? <IoMdClose className="size-6" /> : <CiMenuBurger className="size-6" />}
          </button>
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>
      <div
        className={clsx('nav-sidebar', isOpen ? 'max-h-screen' : 'max-h-0', 'transition-all duration-300 ease-in-out')}>
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
