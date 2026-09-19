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

export function JourneySection({ progress }) {
    const groupRef = useRef();

    const titleRef = useRef();
    const experienceTitleRef = useRef();
    const experienceTextRef = useRef();
    const educationTitleRef = useRef();
    const educationTextRef = useRef();
    const certificationTitleRef = useRef();
    const certificationTextRef = useRef();

    const { journey } = useResponsiveLayout();

    const [start, end] = T.journey;

    useFrame(() => {
        if (!groupRef.current) {
            return;
        }

        const isActive = progress >= start && progress <= end;

        groupRef.current.visible = isActive;

        if (!isActive) {
            return;
        }

        const columnsRange = journey.twoBeats
            ? [start, start + (end - start) * 0.52]
            : [start, end];

        const certRange = journey.twoBeats
            ? [start + (end - start) * 0.52, end]
            : [start, end];

        const columnsSpan = columnsRange[1] - columnsRange[0];
        const certSpan = certRange[1] - certRange[0];

        const titleEase = smootherstep(
            sectionProgress(
                progress,
                columnsRange[0],
                columnsRange[0] + columnsSpan * 0.18
            )
        );

        const experienceEase = smootherstep(
            sectionProgress(
                progress,
                columnsRange[0] + columnsSpan * 0.10,
                columnsRange[0] + columnsSpan * 0.34
            )
        );

        const educationEase = smootherstep(
            sectionProgress(
                progress,
                columnsRange[0] + columnsSpan * 0.18,
                columnsRange[0] + columnsSpan * 0.42
            )
        );

        const certificationEase = smootherstep(
            sectionProgress(
                progress,
                certRange[0] + certSpan * (journey.twoBeats ? 0.10 : 0.30),
                certRange[0] + certSpan * (journey.twoBeats ? 0.34 : 0.54)
            )
        );

        const columnsExit = smootherstep(
            sectionProgress(
                progress,
                columnsRange[1] - columnsSpan * 0.22,
                columnsRange[1]
            )
        );

        const certExit = smootherstep(
            sectionProgress(
                progress,
                certRange[1] - certSpan * 0.22,
                certRange[1]
            )
        );

        const columnsHold = 1 - columnsExit;
        const certHold = 1 - certExit;

        setOpacity(titleRef, titleEase * columnsHold);

        if (titleRef.current) {
            titleRef.current.position.y =
                THREE.MathUtils.lerp(1.45, 1.60, titleEase);
        }

        const experienceOpacity = experienceEase * columnsHold;
        const educationOpacity = educationEase * columnsHold;

        setOpacity(experienceTitleRef, experienceOpacity);
        setOpacity(experienceTextRef, experienceOpacity);
        setOpacity(educationTitleRef, educationOpacity);
        setOpacity(educationTextRef, educationOpacity);

        const experienceX = THREE.MathUtils.lerp(
            -2.0,
            -journey.colX,
            experienceEase
        );

        const educationX = THREE.MathUtils.lerp(
            2.0,
            journey.colX,
            educationEase
        );

        if (experienceTitleRef.current) {
            experienceTitleRef.current.position.x = experienceX;
        }

        if (experienceTextRef.current) {
            experienceTextRef.current.position.x = experienceX;
        }

        if (educationTitleRef.current) {
            educationTitleRef.current.position.x = educationX;
        }

        if (educationTextRef.current) {
            educationTextRef.current.position.x = educationX;
        }

        const certificationOpacity = certificationEase * certHold;

        setOpacity(certificationTitleRef, certificationOpacity);
        setOpacity(certificationTextRef, certificationOpacity);

        const certHeadingY = journey.twoBeats ? 0.95 : -0.90;
        const certBodyY = journey.twoBeats ? 0.55 : -1.12;

        if (certificationTitleRef.current) {
            certificationTitleRef.current.position.y =
                THREE.MathUtils.lerp(
                    certHeadingY - 0.10,
                    certHeadingY,
                    certificationEase
                );
        }

        if (certificationTextRef.current) {
            certificationTextRef.current.position.y =
                THREE.MathUtils.lerp(
                    certBodyY - 0.10,
                    certBodyY,
                    certificationEase
                );
        }
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
                fog={false}
            >
                JOURNEY
            </Text>

            <Text
                ref={experienceTitleRef}
                position={[-journey.colX, 0.85, 0]}
                fontSize={0.20}
                letterSpacing={0.08}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                fog={false}
            >
                EXPERIENCE
            </Text>


            <Text
                ref={experienceTextRef}
                position={[-journey.colX, 0.50, 0]}
                fontSize={journey.colFont}
                lineHeight={journey.colLineHeight}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                maxWidth={journey.colMaxWidth}
                transparent
                depthWrite={false}
                fog={false}
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
                position={[journey.colX, 0.85, 0]}
                fontSize={0.20}
                letterSpacing={0.08}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                fog={false}
            >
                EDUCATION
            </Text>


            <Text
                ref={educationTextRef}
                position={[journey.colX, 0.50, 0]}
                fontSize={journey.colFont}
                lineHeight={journey.colLineHeight}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                maxWidth={journey.colMaxWidth}
                transparent
                depthWrite={false}
                fog={false}
            >
                B.Tech — Computer Science{"\n"}
                & Engineering{"\n\n"}

                Guru Nanak Dev{"\n"}
                Engineering College{"\n"}

                CGPA: 9.0
            </Text>

            <Text
                ref={certificationTitleRef}
                position={[0, -0.90, 0]}
                fontSize={0.20}
                letterSpacing={0.08}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                fog={false}
            >
                CERTIFICATIONS
            </Text>


            <Text
                ref={certificationTextRef}
                position={[0, -1.12, 0]}
                fontSize={journey.certFont}
                lineHeight={1.45}
                color="#c8c8c8"
                anchorX="center"
                anchorY="top"
                textAlign="center"
                maxWidth={journey.certMaxWidth}
                transparent
                depthWrite={false}
                fog={false}
            >
                Cisco Network Basics — Cisco Networking Academy{"\n\n"}
                AWS Academy — Cloud Foundations
            </Text>

        </group>
    );
}
