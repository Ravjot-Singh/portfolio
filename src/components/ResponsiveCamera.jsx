import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;

    if (aspect < 0.7) {
      // Mobile / portrait
      camera.position.set(0, 1.2, 20);
      camera.fov = 52;
    } 
    else if (aspect < 1.1) {
      // Tablet / narrow desktop
      camera.position.set(0, 1.5, 19);
      camera.fov = 48;
    } 
    else {
      // Desktop
      camera.position.set(0, 1.5, 16);
      camera.fov = 45;
    }

    camera.updateProjectionMatrix();

  }, [camera, size]);

  return null;
}