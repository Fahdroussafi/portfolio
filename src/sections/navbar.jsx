import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import { navLinks } from '../constants';
import { useGsapHover } from '../hooks/use-gsap-hover';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const NavItem = ({ id, href, name, onClick }) => {
  const isTouch = isTouchDevice();
  const navRef = useGsapHover(isTouch ? {} : { scale: 1.1, y: -2, duration: 0.3 });

  return (
    <li className="nav-li" key={id}>
      <a ref={navRef} onClick={onClick} className="nav-li_a hover-lift" href={href}>
        {name}
      </a>
    </li>
  );
};

const NavItems = ({ onItemClick }) => {
  return (
    <ul className="nav-ul">
      {navLinks.map((link) => (
        <NavItem key={link.id} {...link} onClick={onItemClick} />
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 sm:py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-lg sm:text-xl hover:text-white transition-colors">
            Fahd
          </a>
          <button
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex p-2 -mr-2 active:scale-95 transition-transform"
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
          <NavItems onItemClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
