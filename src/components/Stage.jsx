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

      {/* Main stage body */}
      <mesh position={[0, -1, 0]} receiveShadow>

        <boxGeometry args={[12, 1, 7]} />

        <meshStandardMaterial color="#262626" />

      </mesh>


      {/* Wooden stage surface */}
      <mesh position={[0, -0.45, -0.3]}>

        <boxGeometry args={[11.5, 0.15, 6.5]} />

        <meshStandardMaterial
          color="#6b4226"
          roughness={0.8}
        />

      </mesh>


      {/* Wooden plank seams */}
      <group>

        {plankLines.map((z, index) => (

          <mesh
            key={index}
            position={[0, -0.365, z - 0.3]}
          >

            <boxGeometry
              args={[11.35, 0.008, 0.025]}
            />

            <meshStandardMaterial
              color="#3f2617"
              roughness={1}
            />

          </mesh>

        ))}

        {/* Long plank seams */}
        {plankLines.map((z, index) => (
          <mesh
            key={`line-${index}`}
            position={[0, -0.365, z - 0.3]}
          >
            <boxGeometry args={[11.35, 0.008, 0.025]} />
            <meshStandardMaterial
              color="#3f2617"
              roughness={1}
            />
          </mesh>
        ))}


        {/* Plank joints */}
        {joints.map((joint, index) => (
          <mesh
            key={`joint-${index}`}
            position={[
              joint.x,
              -0.364,
              joint.z - 0.3
            ]}
          >
            <boxGeometry args={[0.025, 0.009, 1.0]} />
            <meshStandardMaterial
              color="#3f2617"
              roughness={1}
            />
          </mesh>
        ))}

      </group>

    </group>
  );
}

export default Stage;