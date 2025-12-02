import { useGsapHover } from '../hooks/use-gsap-hover';

const Button = ({ name, isBeam = false, containerClass }) => {
  const buttonRef = useGsapHover({ scale: 1.08, y: -3, duration: 0.3 });

  return (
    <button ref={buttonRef} className={`btn hover-glow ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {name}
    </button>
  );
};

export default Button;
