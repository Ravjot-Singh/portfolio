import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SkillsSection({ progress }) {
    const groupRef = useRef();
    const languagesGroupRef = useRef();
    const frameworksGroupRef = useRef();
    const developmentGroupRef = useRef();
    const titleRef = useRef();
    const languagesTitleRef = useRef();
    const languagesTextRef = useRef();
    const frameworksTitleRef = useRef();
    const frameworksTextRef = useRef();
    const developmentTitleRef = useRef();
    const developmentTextRef = useRef();


    useFrame(() => {
        if (!groupRef.current) {
            return;
        }

        const isActive =
            progress >= 0.68 &&
            progress <= 0.90;

        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        const skillsProgress = THREE.MathUtils.clamp(
            (progress - 0.68) / (0.90 - 0.64),
            0,
            1
        );


        const titleProgress = THREE.MathUtils.clamp(
            (progress - 0.68) / 0.04,
            0,
            1
        );

        const languagesProgress = THREE.MathUtils.clamp(
            (progress - 0.70) / 0.06,
            0,
            1
        );

        const frameworksProgress = THREE.MathUtils.clamp(
            (progress - 0.70) / 0.06,
            0,
            1
        );

        const developmentProgress = THREE.MathUtils.clamp(
            (progress - 0.75) / 0.06,
            0,
            1
        );


        const titleEase = THREE.MathUtils.smoothstep(
            titleProgress,
            0,
            1
        );

        const languagesEase = THREE.MathUtils.smoothstep(
            languagesProgress,
            0,
            1
        );

        const frameworksEase = THREE.MathUtils.smoothstep(
            frameworksProgress,
            0,
            1
        );

        const developmentEase = THREE.MathUtils.smoothstep(
            developmentProgress,
            0,
            1
        );


        const exitProgress = THREE.MathUtils.clamp(
            (progress - 0.88) / 0.02,
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

        const languagesOpacity =
            languagesEase * (1 - exitEase);

        const frameworksOpacity =
            frameworksEase * (1 - exitEase);

        const developmentOpacity =
            developmentEase * (1 - exitEase);


        if (titleRef.current) {

            titleRef.current.fillOpacity =
                titleOpacity;

            titleRef.current.outlineOpacity =
                titleOpacity;

            titleRef.current.material.opacity =
                titleOpacity;

            titleRef.current.position.y =
                THREE.MathUtils.lerp(
                    1.35,
                    1.55,
                    titleEase
                );
        }


        if (languagesGroupRef.current) {

            languagesGroupRef.current.position.x =
                THREE.MathUtils.lerp(
                    -0.4,
                    0,
                    languagesEase
                );

            languagesGroupRef.current.position.y =
                THREE.MathUtils.lerp(
                    -0.05,
                    0,
                    languagesEase
                );
        }


        if (languagesTitleRef.current) {

            languagesTitleRef.current.fillOpacity =
                languagesOpacity;

            languagesTitleRef.current.outlineOpacity =
                languagesOpacity;

            languagesTitleRef.current.material.opacity =
                languagesOpacity;
        }


        if (languagesTextRef.current) {

            languagesTextRef.current.fillOpacity =
                languagesOpacity;

            languagesTextRef.current.outlineOpacity =
                languagesOpacity;

            languagesTextRef.current.material.opacity =
                languagesOpacity;
        }

        if (frameworksGroupRef.current) {

            frameworksGroupRef.current.position.x =
                THREE.MathUtils.lerp(
                    0.4,
                    0,
                    frameworksEase
                );

            frameworksGroupRef.current.position.y =
                THREE.MathUtils.lerp(
                    -0.05,
                    0,
                    frameworksEase
                );
        }


        if (frameworksTitleRef.current) {

            frameworksTitleRef.current.fillOpacity =
                frameworksOpacity;

            frameworksTitleRef.current.outlineOpacity =
                frameworksOpacity;

            frameworksTitleRef.current.material.opacity =
                frameworksOpacity;
        }


        if (frameworksTextRef.current) {

            frameworksTextRef.current.fillOpacity =
                frameworksOpacity;

            frameworksTextRef.current.outlineOpacity =
                frameworksOpacity;

            frameworksTextRef.current.material.opacity =
                frameworksOpacity;
        }


        if (developmentGroupRef.current) {

            developmentGroupRef.current.position.y =
                THREE.MathUtils.lerp(
                    -0.35,
                    0,
                    developmentEase
                );
        }


        if (developmentTitleRef.current) {

            developmentTitleRef.current.fillOpacity =
                developmentOpacity;

            developmentTitleRef.current.outlineOpacity =
                developmentOpacity;

            developmentTitleRef.current.material.opacity =
                developmentOpacity;
        }


        if (developmentTextRef.current) {

            developmentTextRef.current.fillOpacity =
                developmentOpacity;

            developmentTextRef.current.outlineOpacity =
                developmentOpacity;

            developmentTextRef.current.material.opacity =
                developmentOpacity;
        }


        groupRef.current.visible =
            progress >= 0.68 &&
            progress <= 0.90;
    });


    return (
        <group
            ref={groupRef}
            position={[0, 0, 0.30]}
        >

            {/* TITLe*/}

            <Text
                ref={titleRef}
                position={[0, 1.35, 0]}
                fontSize={0.38}
                letterSpacing={0.12}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                SKILLS
            </Text>


            {/*LANGUAGES*/}

            <group ref={languagesGroupRef}>

                <Text
                    ref={languagesTitleRef}
                    position={[-1.9, 0.95, 0]}
                    fontSize={0.20}
                    color="#d6b45a"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    depthWrite={false}
                >
                    LANGUAGES
                </Text>


                <Text
                    ref={languagesTextRef}
                    position={[-1.9, 0.25, 0]}
                    fontSize={0.19}
                    lineHeight={1.45}
                    color="#c8c8c8"
                    anchorX="center"
                    anchorY="top"
                    textAlign="center"
                    transparent
                    depthWrite={false}
                >
                    JavaScript{"\n"}
                    HTML{"\n"}
                    CSS{"\n"}
                    C++{"\n"}
                    C
                </Text>

            </group>


            {/*FRAMEWORk*/}

            <group ref={frameworksGroupRef}>

                <Text
                    ref={frameworksTitleRef}
                    position={[1.9, 0.95, 0]}
                    fontSize={0.20}
                    color="#d6b45a"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    depthWrite={false}
                >
                    FRAMEWORKS
                </Text>


                <Text
                    ref={frameworksTextRef}
                    position={[1.9, 0.25, 0]}
                    fontSize={0.19}
                    lineHeight={1.45}
                    color="#c8c8c8"
                    anchorX="center"
                    anchorY="top"
                    textAlign="center"
                    transparent
                    depthWrite={false}
                >
                    Node.js{"\n"}
                    Express.js{"\n"}
                    React.js{"\n"}
                    Socket.IO
                </Text>

            </group>


            {/*DEVELOPMENT*/}

            <group ref={developmentGroupRef}>

                <Text
                    ref={developmentTitleRef}
                    position={[0, -0.95, 0]}
                    fontSize={0.20}
                    color="#d6b45a"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    depthWrite={false}
                >
                    DEVELOPMENT
                </Text>


                <Text
                    ref={developmentTextRef}
                    position={[0, -1.25, 0]}
                    fontSize={0.16}
                    lineHeight={1.4}
                    color="#c8c8c8"
                    anchorX="center"
                    anchorY="top"
                    textAlign="center"
                    maxWidth={5.8}
                    transparent
                    depthWrite={false}
                >
                    RESTful APIs • PostgreSQL • MongoDB{"\n"}
                    Git • GitHub • JWT Authentication
                </Text>

            </group>

        </group>
    );
}