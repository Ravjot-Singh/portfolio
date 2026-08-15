export function TopBeam(){

    return(

        <group>

            <mesh position={[0 , 6.8 , -2.5]}>
                <boxGeometry args={[12 , 1 , 1]} />
                <meshStandardMaterial color="#353535" />

            </mesh>

            <mesh position={[0 , 6.2 , -2.5]}>

                <boxGeometry args={[11.5 , 0.3 , 0.8]} />

                <meshStandardMaterial color="#454545" />
            </mesh>

        </group>

    )

}