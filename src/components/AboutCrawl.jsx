import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { sectionProgress } from "../helper/sectionProgress.js";
import { fadeInOut } from "../helper/fadeInOut.js";

export function AboutCrawl({ progress }) {
    const groupRef = useRef();

    const titleRef = useRef();
    const bodyRef = useRef();

    useFrame(() => {

        if (!groupRef.current) {
            return;
        }

        const isActive = progress >= 0.52 && progress < 0.68;
        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        const crawlProgress = sectionProgress(
            progress,
            0.52,
            0.68
        );

        const easedProgress = THREE.MathUtils.smoothstep(
            crawlProgress,
            0,
            1
        );

        const y = THREE.MathUtils.lerp(
            1,
            1.9,
            easedProgress
        );

        const scale = THREE.MathUtils.lerp(
            1.0,
            0.55,
            easedProgress
        );

        const rotationX = THREE.MathUtils.lerp(
            -0.20,
            -0.65,
            easedProgress
        );

        groupRef.current.position.y = y;
        groupRef.current.position.z = 0.30;

        groupRef.current.scale.setScalar(scale);

        groupRef.current.rotation.x = rotationX;

        let opacity = 1;

        if (progress >= 0.52 && progress < 0.57) {
            opacity = THREE.MathUtils.clamp(
                (progress - 0.52) / 0.05,
                0,
                1
            );
        }

        else if (progress >= 0.57 && progress < 0.64) {
            opacity = 1;
        }

        else if (progress >= 0.64 && progress < 0.68) {
            opacity = THREE.MathUtils.clamp(
                1 - (progress - 0.64) / 0.04,
                0,
                1
            );
        }
        else {
            opacity = 0;
        }


        if (titleRef.current) {
            titleRef.current.fillOpacity = opacity;
            titleRef.current.outlineOpacity = opacity;
            titleRef.current.material.opacity = opacity;
        }

        if (bodyRef.current) {
            bodyRef.current.fillOpacity = opacity;
            bodyRef.current.outlineOpacity = opacity;
            bodyRef.current.material.opacity = opacity;
        }
    });


    return (
        <group
            ref={groupRef}
            position={[0, 1, 0.38]}
        >

            {/* ABOUT ME */}

            <Text
                ref={titleRef}
                position={[0, 0.25, 0]}
                fontSize={0.36}
                letterSpacing={0.12}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                ABOUT ME
            </Text>


            {/* ABOUT CONTENT */}

            <Text
                ref={bodyRef}
                position={[0, -0.05, 0]}
                fontSize={0.22}
                maxWidth={5.7}
                lineHeight={1.35}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                transparent
                depthWrite={false}
            >
                I'm a developer who enjoys turning ideas into things.


                {"\n\n"}
                I’ve worked on full-stack web applications and real-time chat web-app to streaming platform and interactive experiences.
                {"\n\n"}
                I enjoy taking an idea, figuring out how it could work, and then building it piece by piece.

                {"\n\n"}
                This portfolio is another one of those experiments.
            </Text>

        </group>
    );
}