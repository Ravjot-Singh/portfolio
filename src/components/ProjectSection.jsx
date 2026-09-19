import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sectionProgress } from "../helper/sectionProgress";
import { smootherstep } from "../helper/easing";
import { useResponsiveLayout } from "../helper/useResponsiveLayout";
import { T, PROJECT_SLIDES } from "../timeline";

const projects = [
    {
        title: "CHAT-IN",
        subtitle: "Real-Time Messaging",
        tech: [
            "React.js",
            "TailwindCSS",
            "MongoDB",
            "Arcjet",
            "Zustand",
            "Socket.IO",
            "Cloudinary",
        ],
        points: [
            "Instant communication between users",
            "Real-time message synchronization",
            "Automatic recovery of missed messages"
        ]
    },
    {
        title: "YTEENS",
        subtitle: "Video & Live Streaming",
        tech: ["React Native", "Expo", "Axios", "Node.js", "LiveKit"],
        points: [
            "Contributed to the video player",
            "Live streaming functionality",
            "Moderation pipeline"
        ]
    },
    {
        title: "COMMN",
        subtitle: "E-Commerce Platform",
        tech: ["React.js", "TailwindCSS", "PostgreSQL", "Polar", "Stream"],
        points: [
            "Product browsing and cart management",
            "Authentication and secure checkout",
            "Admin product and order management"
        ]
    }
];

function formatTech(tech, split) {
    if (!split) return tech.join(" • ");

    const half = Math.ceil(tech.length / 2);

    return (
        tech.slice(0, half).join(" • ") +
        "\n" +
        tech.slice(half).join(" • ")
    );
}

function ProjectSlide({ project, progress, window: win, layout }) {
    const { start, end, enterFrom, enterTo, exitFrom, exitTo } = win;


    const groupRef = useRef();

    const titleRef = useRef();
    const subtitleRef = useRef();
    const techRef = useRef();
    const pointsRef = useRef();

    useFrame(() => {

        if (!groupRef.current) return;

        const local = sectionProgress(progress, start, end);

        groupRef.current.visible =
            progress >= enterFrom &&
            progress <= exitTo;

        const enter = smootherstep(
            sectionProgress(progress, enterFrom, enterTo)
        );

        const exit = smootherstep(
            sectionProgress(progress, exitFrom, exitTo)
        );

        const hold = 1 - exit;

        groupRef.current.position.y =
            THREE.MathUtils.lerp(-0.15, 0.12, smootherstep(local));

        groupRef.current.scale.setScalar(
            THREE.MathUtils.lerp(0.92, 1, enter)
        );

        const rows = [titleRef, subtitleRef, techRef, pointsRef];

        const enterSpan = enterTo - enterFrom;

        rows.forEach((ref, index) => {

            if (!ref.current) return;

            const delay = index * enterSpan * 0.22;

            const rowEnter = smootherstep(
                sectionProgress(
                    progress,
                    enterFrom + delay,
                    enterTo + delay
                )
            );

            const opacity = rowEnter * hold;

            ref.current.material.opacity = opacity;
            ref.current.fillOpacity = opacity;
            ref.current.outlineOpacity = opacity;
        });

    });

    return (

        <group ref={groupRef}>

            <Text
                ref={titleRef}
                position={[0, 1.2, 0]}
                fontSize={0.38}
                letterSpacing={0.12}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                fog={false}
            >
                {project.title}
            </Text>

            <Text
                ref={subtitleRef}
                position={[0, 0.75, 0]}
                fontSize={0.25}
                color="white"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                fog={false}
            >
                {project.subtitle}
            </Text>

            <Text
                ref={techRef}
                position={[0, 0.25, 0]}
                fontSize={layout.techFont}
                lineHeight={1.4}
                color="#bfbfbf"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                maxWidth={layout.techMaxWidth}
                transparent
                depthWrite={false}
                fog={false}
            >
                {formatTech(project.tech, layout.splitTech)}
            </Text>

            <Text
                ref={pointsRef}
                position={[0, -0.55, 0]}
                fontSize={layout.pointsFont}
                lineHeight={1.55}
                color="#c8c8c8"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                maxWidth={layout.pointsMaxWidth}
                transparent
                depthWrite={false}
                fog={false}
            >
                {project.points.join("\n")}
            </Text>

        </group>

    );

}

export function ProjectsSection({ progress }) {

    const groupRef = useRef();
    const headingRef = useRef();

    const { projects: layout } = useResponsiveLayout();

    const [start, end] = T.projects;
    const span = end - start;

    useFrame(() => {

        if (!groupRef.current) return;

        const isActive = progress >= start && progress <= end;

        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        if (headingRef.current) {

            const enterEase = smootherstep(
                sectionProgress(progress, start, start + span * 0.14)
            );

            const exitEase = smootherstep(
                sectionProgress(progress, end - span * 0.14, end)
            );

            const opacity = enterEase * (1 - exitEase);

            headingRef.current.material.opacity = opacity;
            headingRef.current.fillOpacity = opacity;
            headingRef.current.outlineOpacity = opacity;
        }

    });

    const ranges = useMemo(() => PROJECT_SLIDES, []);

    return (

        <group
            ref={groupRef}
            position={[0, -0.3, 0.30]}
        >

            <Text
                ref={headingRef}
                position={[0, 1.95, 0]}
                fontSize={0.40}
                letterSpacing={0.10}
                color="#888888"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                fog={false}
            >
                PROJECTS
            </Text>

            {projects.map((project, i) => (

                <ProjectSlide
                    key={project.title}
                    project={project}
                    progress={progress}
                    window={ranges[i]}
                    layout={layout}
                />

            ))}

        </group>

    );

}
