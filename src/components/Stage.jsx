function Stage() {

  const plankLines = [-3, -2, -1, 0, 1, 2, 3];

  const joints = [
    { x: -1.5, z: -2 },
    { x: 1.8, z: -2 },
    { x: -1.2, z: -1 },
    { x: 2.7, z: 0 },
    { x: -2.0, z: 1 },
    { x: 1.2, z: 2 },
    { x: -2.8, z: 3 },
  ];

  return (
    <group>

      <mesh position={[0, -1, 0]} receiveShadow>

        <boxGeometry args={[12, 1, 7]} />

        <meshStandardMaterial
          color="#1b1b1b"
          roughness={0.95}
        />

      </mesh>


      <mesh position={[0, -0.45, -0.3]} receiveShadow>

        <boxGeometry args={[11.5, 0.15, 6.5]} />

        <meshStandardMaterial
          color="#5a3520"
          roughness={0.55}
          metalness={0.08}
        />

      </mesh>


      <mesh
        position={[0, -0.34, 3.15]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[12, 0.20, 0.28]} />

        <meshStandardMaterial
          color="#6b5a32"
          metalness={0.30}
          roughness={0.35}
        />
      </mesh>


      <group>

        {plankLines.map((z, index) => (

          <mesh
            key={index}
            position={[0, -0.365, z - 0.3]}
            receiveShadow
          >

            <boxGeometry
              args={[11.35, 0.008, 0.025]}
            />

            <meshStandardMaterial
              color="#2b190f"
              roughness={0.85}
            />

          </mesh>

        ))}


        {joints.map((joint, index) => (
          <mesh
            key={`joint-${index}`}
            position={[
              joint.x,
              -0.364,
              joint.z - 0.3
            ]}
            receiveShadow
          >
            <boxGeometry args={[0.025, 0.009, 1.0]} />
            <meshStandardMaterial
              color="#2b190f"
              roughness={0.85}
            />
          </mesh>
        ))}

      </group>

    </group>
  );
}

export default Stage;
