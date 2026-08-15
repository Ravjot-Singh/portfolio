import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const projects = [
    {
        title: "CHAT-IN",
        subtitle: "Real-Time Messaging",
        tech: "React.js • TailwindCSS • MongoDB • Arcjet • Zustand • Socket.IO • Cloudinary",
        points: [
            "Instant communication between users",
            "Real-time message synchronization",
            "Automatic recovery of missed messages"
        ]
    },
    {
        title: "YTEENS",
        subtitle: "Video & Live Streaming",
        tech: "React Native • Expo • Axios • Node.js • LiveKit",
        points: [
            "Contributed to the video player",
            "Live streaming functionality",
            "Moderation pipeline"
        ]
    },
    {
        title: "COMMN",
        subtitle: "E-Commerce Platform",
        tech: "React.js • TailwindCSS • PostgreSQL • Polar • Stream",
        points: [
            "Product browsing and cart management",
            "Authentication and secure checkout",
            "Admin product and order management"
        ]
    }
];

function ProjectSlide({ project, progress, start, end }) {

    const groupRef = useRef();

    const titleRef = useRef();
    const subtitleRef = useRef();
    const techRef = useRef();
    const pointsRef = useRef();

    useFrame(() => {

        if (!groupRef.current) return;

        const local = THREE.MathUtils.clamp(
            (progress - start) / (end - start),
            0,
            1
        );

        groupRef.current.visible =
            progress >= start &&
            progress <= end;

        const enter = THREE.MathUtils.smoothstep(
            Math.min(local / 0.35, 1),
            0,
            1
        );

        const exit = THREE.MathUtils.smoothstep(
            Math.max((local - 0.75) / 0.25, 0),
            0,
            1
        );

        const opacity = enter * (1 - exit);

        groupRef.current.position.y =
            THREE.MathUtils.lerp(
                -0.15,
                0.12,
                local
            );

        const scale = THREE.MathUtils.lerp(
            0.92,
            1,
            enter
        );

        groupRef.current.scale.setScalar(scale);

        [
            titleRef,
            subtitleRef,
            techRef,
            pointsRef
        ].forEach(ref => {

            if (!ref.current) return;

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
            >
                {project.subtitle}
            </Text>

            <Text
                ref={techRef}
                position={[0, 0.25, 0]}
                fontSize={0.19}
                color="#bfbfbf"
                anchorX="center"
                anchorY="middle"
                maxWidth={5.6}
                transparent
                depthWrite={false}
            >
                {project.tech}
            </Text>

            <Text
                ref={pointsRef}
                position={[0, -0.55, 0]}
                fontSize={0.23}
                lineHeight={1.55}
                color="#c8c8c8"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                transparent
                depthWrite={false}
            >
                {project.points.join("\n")}
            </Text>

        </group>

    );

}

export function ProjectsSection({ progress }) {

    const groupRef = useRef();
    const headingRef = useRef();

    useFrame(() => {

        if (!groupRef.current) return;

        const isActive = progress >= 0.90 && progress <= 1.05;
        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        if (headingRef.current) {

            const headingEnter = THREE.MathUtils.clamp(
                (progress - 0.90) / 0.04,
                0,
                1
            );

            const headingExit = THREE.MathUtils.clamp(
                (progress - 1.03) / 0.02,
                0,
                1
            );

            const enterEase = THREE.MathUtils.smoothstep(
                headingEnter,
                0,
                1
            );

            const exitEase = THREE.MathUtils.smoothstep(
                headingExit,
                0,
                1
            );

            const opacity =
                enterEase * (1 - exitEase);

            headingRef.current.material.opacity =
                opacity;

            headingRef.current.fillOpacity =
                opacity;

            headingRef.current.outlineOpacity =
                opacity;
        }

    });

    const ranges = useMemo(() => ([
        [0.90, 0.95],
        [0.95, 1.00],
        [1.00, 1.05]
    ]), []);

    return (

        <group
            ref={groupRef}
            position={[0, -0.3, 0.30]}
        >

            <Text
                ref={headingRef}
                position={[0, 1.75, 0]}
                fontSize={0.40}
                letterSpacing={0.10}
                color="#888888"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
            >
                PROJECTS
            </Text>

            {projects.map((project, i) => (

                <ProjectSlide
                    key={project.title}
                    project={project}
                    progress={progress}
                    start={ranges[i][0]}
                    end={ranges[i][1]}
                />

            ))}

        </group>

    );

}