import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function JourneySection({ progress }) {

    const groupRef = useRef();

    const titleRef = useRef();

    const experienceTitleRef = useRef();
    const experienceTextRef = useRef();

    const educationTitleRef = useRef();
    const educationTextRef = useRef();

    const certificationTitleRef = useRef();
    const certificationTextRef = useRef();


    useFrame(() => {

        if (!groupRef.current) {
            return;
        }

        const isActive = progress >= 1.05 && progress <= 1.15;
        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        const titleProgress = THREE.MathUtils.clamp(
            (progress - 1.05) / 0.04,
            0,
            1
        );


        const mainProgress = THREE.MathUtils.clamp(
            (progress - 1.07) / 0.05,
            0,
            1
        );


        const certificationProgress = THREE.MathUtils.clamp(
            (progress - 1.10) / 0.04,
            0,
            1
        );


        const exitProgress = THREE.MathUtils.clamp(
            (progress - 1.13) / 0.02,
            0,
            1
        );


        const titleEase = THREE.MathUtils.smoothstep(
            titleProgress,
            0,
            1
        );

        const mainEase = THREE.MathUtils.smoothstep(
            mainProgress,
            0,
            1
        );

        const certificationEase =
            THREE.MathUtils.smoothstep(
                certificationProgress,
                0,
                1
            );

        const exitEase = THREE.MathUtils.smoothstep(
            exitProgress,
            0,
            1
        );


        const titleOpacity =
            titleEase * (1 - exitEase);

        const mainOpacity =
            mainEase * (1 - exitEase);

        const certificationOpacity =
            certificationEase * (1 - exitEase);



        if (titleRef.current) {

            titleRef.current.material.opacity =
                titleOpacity;

            titleRef.current.fillOpacity =
                titleOpacity;

            titleRef.current.outlineOpacity =
                titleOpacity;

            titleRef.current.position.y =
                THREE.MathUtils.lerp(
                    1.45,
                    1.60,
                    titleEase
                );
        }


        if (experienceTitleRef.current) {

            experienceTitleRef.current.material.opacity =
                mainOpacity;

            experienceTitleRef.current.fillOpacity =
                mainOpacity;

            experienceTitleRef.current.outlineOpacity =
                mainOpacity;

            experienceTitleRef.current.position.x =
                THREE.MathUtils.lerp(
                    -2.0,
                    -1.65,
                    mainEase
                );
        }


        if (experienceTextRef.current) {

            experienceTextRef.current.material.opacity =
                mainOpacity;

            experienceTextRef.current.fillOpacity =
                mainOpacity;

            experienceTextRef.current.outlineOpacity =
                mainOpacity;

            experienceTextRef.current.position.x =
                THREE.MathUtils.lerp(
                    -2.0,
                    -1.65,
                    mainEase
                );
        }


        if (educationTitleRef.current) {

            educationTitleRef.current.material.opacity =
                mainOpacity;

            educationTitleRef.current.fillOpacity =
                mainOpacity;

            educationTitleRef.current.outlineOpacity =
                mainOpacity;

            educationTitleRef.current.position.x =
                THREE.MathUtils.lerp(
                    2.0,
                    1.68,
                    mainEase
                );
        }

        if (educationTextRef.current) {

            educationTextRef.current.material.opacity =
                mainOpacity;

            educationTextRef.current.fillOpacity =
                mainOpacity;

            educationTextRef.current.outlineOpacity =
                mainOpacity;

            educationTextRef.current.position.x =
                THREE.MathUtils.lerp(
                    2.0,
                    1.72,
                    mainEase
                );
        }

        if (certificationTitleRef.current) {

            certificationTitleRef.current.material.opacity =
                certificationOpacity;

            certificationTitleRef.current.fillOpacity =
                certificationOpacity;

            certificationTitleRef.current.outlineOpacity =
                certificationOpacity;

            certificationTitleRef.current.position.y =
                THREE.MathUtils.lerp(
                    -1.05,
                    -0.90,
                    certificationEase
                );
        }


        if (certificationTextRef.current) {

            certificationTextRef.current.material.opacity =
                certificationOpacity;

            certificationTextRef.current.fillOpacity =
                certificationOpacity;

            certificationTextRef.current.outlineOpacity =
                certificationOpacity;

            certificationTextRef.current.position.y =
                THREE.MathUtils.lerp(
                    -1.45,
                    -1.20,
                    certificationEase
                );
        }


        groupRef.current.visible =
            progress >= 1.05 &&
            progress <= 1.15;
    });


    return (

        <group
            ref={groupRef}
            position={[0, 0, 0.30]}
        >

            <Text
                ref={titleRef}
                position={[0, 1.50, 0]}
                fontSize={0.34}
                letterSpacing={0.12}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                JOURNEY
            </Text>

            <Text
                ref={experienceTitleRef}
                position={[-1.67, 0.85, 0]}
                fontSize={0.20}
                letterSpacing={0.08}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                EXPERIENCE
            </Text>


            <Text
                ref={experienceTextRef}
                position={[-1.67, 0.50, 0]}
                fontSize={0.17}
                lineHeight={1.45}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                maxWidth={2.6}
                transparent
                depthWrite={false}
            >
                Ryaz.io — Ludhiana{"\n"}
                Backend Development{"\n"}
                Authentication{"\n"}
                Databases{"\n"}
                REST APIs{"\n"}
                Node.js
            </Text>

            <Text
                ref={educationTitleRef}
                position={[1.65, 0.85, 0]}
                fontSize={0.20}
                letterSpacing={0.08}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                EDUCATION
            </Text>


            <Text
                ref={educationTextRef}
                position={[1.65, 0.50, 0]}
                fontSize={0.17}
                lineHeight={1.45}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                maxWidth={2.6}
                transparent
                depthWrite={false}
            >
                B.Tech — Computer Science{"\n"}
                & Engineering{"\n\n"}

                Guru Nanak Dev{"\n"}
                Engineering College{"\n"}

                CGPA: 9.0
            </Text>

            <Text
                ref={certificationTitleRef}
                position={[-0.1, -0.88, 0]}
                fontSize={0.20}
                letterSpacing={0.08}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                CERTIFICATIONS
            </Text>


            <Text
                ref={certificationTextRef}
                position={[0, -1.25, 0]}
                fontSize={0.17}
                lineHeight={1.45}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                maxWidth={5.5}
                transparent
                depthWrite={false}
            >
                Cisco Network Basics — Cisco Networking Academy{"\n\n"}
                AWS Academy — Cloud Foundations
            </Text>

        </group>
    );
}