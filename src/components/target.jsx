import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useSafeGLTF } from '../hooks/use-safe-gltf.jsx';

const Target = (props) => {
  const targetRef = useRef();
  const { gltf, error, loading } = useSafeGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf',
  );

  useGSAP(() => {
    if (targetRef.current) {
      gsap.to(targetRef.current.position, {
        y: targetRef.current.position.y + 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
      });
    }
  });

  if (loading) return null;
  if (error || !gltf || !gltf.scene) {
    console.warn('Target model failed to load:', error);
    return null;
  }

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default Target;
