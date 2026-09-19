import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { sectionProgress } from "../helper/sectionProgress.js";
import { fadeInOut } from "../helper/fadeInOut.js";
import { smootherstep } from "../helper/easing.js";
import { useResponsiveLayout } from "../helper/useResponsiveLayout.js";
import { T } from "../timeline";

export function AboutCrawl({ progress }) {
    const groupRef = useRef();

    const titleRef = useRef();
    const bodyRef = useRef();

    const { about } = useResponsiveLayout();

    const [start, end] = T.about;

    useFrame(() => {

        if (!groupRef.current) {
            return;
        }

        const isActive = progress >= start && progress < end;
        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        const crawlProgress = sectionProgress(progress, start, end);

        const easedProgress = smootherstep(crawlProgress);

        groupRef.current.position.y = THREE.MathUtils.lerp(
            about.yFrom,
            about.yTo,
            easedProgress
        );

        groupRef.current.position.z = 0.30;

        groupRef.current.scale.setScalar(
            THREE.MathUtils.lerp(
                about.scaleFrom,
                about.scaleTo,
                easedProgress
            )
        );

        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            about.tiltFrom,
            about.tiltTo,
            easedProgress
        );

        const opacity = fadeInOut(progress, start, end, 0.20, 0.22);

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
            position={[0, about.yFrom, 0.30]}
        >

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
                fog={false}
            >
                ABOUT ME
            </Text>


            <Text
                ref={bodyRef}
                position={[0, -0.05, 0]}
                fontSize={about.bodyFont}
                maxWidth={about.maxWidth}
                lineHeight={about.lineHeight}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                transparent
                depthWrite={false}
                fog={false}
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
