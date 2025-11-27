import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';

export function useSafeGLTF(url) {
  const [gltf, setGltf] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const result = useGLTF(url);
      if (result && result.scene) {
        setGltf(result);
        setError(null);
      } else {
        setError(new Error('Invalid GLTF data'));
      }
    } catch (err) {
      console.error(`Failed to load GLTF from ${url}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { gltf, error, loading };
}
