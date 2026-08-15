export function BackWall() {
  return (
    <mesh position={[0, 3, -3]}>
      <boxGeometry args={[10.5 , 7.5 , 0.4]} />
      <meshStandardMaterial color="#292929" />
    </mesh>
  );
}