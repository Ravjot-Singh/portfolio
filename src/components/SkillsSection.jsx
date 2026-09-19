import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sectionProgress } from "../helper/sectionProgress";
import { smootherstep } from "../helper/easing";
import { useResponsiveLayout } from "../helper/useResponsiveLayout";
import { T } from "../timeline";

function setOpacity(ref, value) {
    if (!ref.current) return;

    ref.current.fillOpacity = value;
    ref.current.outlineOpacity = value;
    ref.current.material.opacity = value;
}

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

    const { skills } = useResponsiveLayout();

    const [start, end] = T.skills;
    const span = end - start;

    useFrame(() => {
        if (!groupRef.current) {
            return;
        }

        const isActive = progress >= start && progress <= end;

        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        const titleEase = smootherstep(
            sectionProgress(progress, start, start + span * 0.15)
        );

        const languagesEase = smootherstep(
            sectionProgress(progress, start + span * 0.08, start + span * 0.30)
        );

        const frameworksEase = smootherstep(
            sectionProgress(progress, start + span * 0.14, start + span * 0.36)
        );

        const developmentEase = smootherstep(
            sectionProgress(progress, start + span * 0.26, start + span * 0.48)
        );

        const exitEase = smootherstep(
            sectionProgress(progress, end - span * 0.25, end)
        );

        const hold = 1 - exitEase;

        const titleOpacity = titleEase * hold;
        const languagesOpacity = languagesEase * hold;
        const frameworksOpacity = frameworksEase * hold;
        const developmentOpacity = developmentEase * hold;

        setOpacity(titleRef, titleOpacity);

        if (titleRef.current) {
            titleRef.current.position.y =
                THREE.MathUtils.lerp(1.35, 1.55, titleEase);
        }

        if (languagesGroupRef.current) {
            languagesGroupRef.current.position.x =
                THREE.MathUtils.lerp(-0.4, 0, languagesEase);

            languagesGroupRef.current.position.y =
                THREE.MathUtils.lerp(-0.05, 0, languagesEase);
        }

        setOpacity(languagesTitleRef, languagesOpacity);
        setOpacity(languagesTextRef, languagesOpacity);

        if (frameworksGroupRef.current) {
            frameworksGroupRef.current.position.x =
                THREE.MathUtils.lerp(0.4, 0, frameworksEase);

            frameworksGroupRef.current.position.y =
                THREE.MathUtils.lerp(-0.05, 0, frameworksEase);
        }

        setOpacity(frameworksTitleRef, frameworksOpacity);
        setOpacity(frameworksTextRef, frameworksOpacity);

        if (developmentGroupRef.current) {
            developmentGroupRef.current.position.y =
                THREE.MathUtils.lerp(-0.35, 0, developmentEase);
        }

        setOpacity(developmentTitleRef, developmentOpacity);
        setOpacity(developmentTextRef, developmentOpacity);
    });


    return (
        <group
            ref={groupRef}
            position={[0, 0, 0.30]}
        >

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
                fog={false}
            >
                SKILLS
            </Text>


            <group ref={languagesGroupRef}>

                <Text
                    ref={languagesTitleRef}
                    position={[-skills.colX, 0.95, 0]}
                    fontSize={skills.headingFont}
                    color="#d6b45a"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    depthWrite={false}
                    fog={false}
                >
                    LANGUAGES
                </Text>


                <Text
                    ref={languagesTextRef}
                    position={[-skills.colX, 0.25, 0]}
                    fontSize={skills.colFont}
                    lineHeight={1.45}
                    color="#c8c8c8"
                    anchorX="center"
                    anchorY="top"
                    textAlign="center"
                    transparent
                    depthWrite={false}
                    fog={false}
                >
                    JavaScript{"\n"}
                    HTML{"\n"}
                    CSS{"\n"}
                    C++{"\n"}
                    C
                </Text>

            </group>


            <group ref={frameworksGroupRef}>

                <Text
                    ref={frameworksTitleRef}
                    position={[skills.colX, 0.95, 0]}
                    fontSize={skills.headingFont}
                    color="#d6b45a"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    depthWrite={false}
                    fog={false}
                >
                    FRAMEWORKS
                </Text>


                <Text
                    ref={frameworksTextRef}
                    position={[skills.colX, 0.25, 0]}
                    fontSize={skills.colFont}
                    lineHeight={1.45}
                    color="#c8c8c8"
                    anchorX="center"
                    anchorY="top"
                    textAlign="center"
                    transparent
                    depthWrite={false}
                    fog={false}
                >
                    Node.js{"\n"}
                    Express.js{"\n"}
                    React.js{"\n"}
                    Socket.IO
                </Text>

            </group>


            <group ref={developmentGroupRef}>

                <Text
                    ref={developmentTitleRef}
                    position={[0, -0.95, 0]}
                    fontSize={skills.headingFont}
                    color="#d6b45a"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    depthWrite={false}
                    fog={false}
                >
                    DEVELOPMENT
                </Text>


                <Text
                    ref={developmentTextRef}
                    position={[0, -1.25, 0]}
                    fontSize={skills.devFont}
                    lineHeight={1.4}
                    color="#c8c8c8"
                    anchorX="center"
                    anchorY="top"
                    textAlign="center"
                    maxWidth={skills.devMaxWidth}
                    transparent
                    depthWrite={false}
                    fog={false}
                >
                    RESTful APIs • PostgreSQL{"\n"}
                    MongoDB • Git • GitHub{"\n"}
                    JWT Authentication
                </Text>

            </group>

        </group>
    );
}
