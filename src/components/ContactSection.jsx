import { ContactCard } from "./ContactCard";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sectionProgress } from "../helper/sectionProgress";
import { smootherstep } from "../helper/easing";
import { useResponsiveLayout } from "../helper/useResponsiveLayout";
import { T } from "../timeline";

export function ContactSection({ progress }) {

    const groupRef = useRef();
    const titleRef = useRef();
    const messageRef = useRef();
    const gmailDomRef = useRef();
    const githubDomRef = useRef();
    const linkedinDomRef = useRef();

    const { contact } = useResponsiveLayout();

    const [start, end] = T.contact;
    const span = end - start;

    const links = {
        gmail: {
            label: "GMAIL",
            value: "ravjot851@gmail.com",
            url: "mailto:ravjot851@gmail.com",
        },

        github: {
            label: "GITHUB",
            value: "github.com/Ravjot-Singh",
            url: "https://github.com/Ravjot-Singh",
        },

        linkedin: {
            label: "LINKEDIN",
            value: "linkedin.com/in/ravjot-singh",
            url: "https://www.linkedin.com/in/ravjot-singh-64a109287/",
        },
    };


    const openLink = (url) => {

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    };


    useFrame(() => {

        if (!groupRef.current) {
            return;
        }

        const contactActive = progress >= start && progress <= end;

        groupRef.current.visible = contactActive;

        const titleEase = smootherstep(
            sectionProgress(progress, start, start + span * 0.16)
        );

        const messageEase = smootherstep(
            sectionProgress(
                progress,
                start + span * 0.08,
                start + span * 0.24
            )
        );

        const cardsInEase = smootherstep(
            sectionProgress(
                progress,
                start + span * 0.16,
                start + span * 0.42
            )
        );

        const exitEase = smootherstep(
            sectionProgress(progress, end - span * 0.30, end - span * 0.09)
        );

        const hold = 1 - exitEase;

        const titleOpacity = contactActive ? titleEase * hold : 0;
        const messageOpacity =
            contactActive && contact.showMessage ? messageEase * hold : 0;
        const cardOpacity = contactActive ? cardsInEase * hold : 0;

        if (titleRef.current) {
            titleRef.current.material.opacity = titleOpacity;
            titleRef.current.fillOpacity = titleOpacity;
            titleRef.current.outlineOpacity = titleOpacity;

            titleRef.current.position.y =
                THREE.MathUtils.lerp(1.20, 1.65, titleEase);
        }

        if (messageRef.current) {
            messageRef.current.visible = contact.showMessage;

            messageRef.current.material.opacity = messageOpacity;
            messageRef.current.fillOpacity = messageOpacity;
            messageRef.current.outlineOpacity = messageOpacity;

            messageRef.current.position.y =
                THREE.MathUtils.lerp(0.72, 1.20, messageEase);
        }

        const cardRefs = [
            gmailDomRef,
            githubDomRef,
            linkedinDomRef,
        ];

        cardRefs.forEach((ref) => {

            if (!ref.current) {
                return;
            }

            const visible = cardOpacity > 0.02;

            ref.current.style.opacity = String(cardOpacity);

            ref.current.style.visibility = visible ? "visible" : "hidden";

            ref.current.style.pointerEvents = visible ? "auto" : "none";

            ref.current.style.transform =
                `scale(${0.92 + cardsInEase * 0.08})`;
        });

    });


    return (

        <group
            ref={groupRef}
            position={[0, -0.15, 0.30]}
        >


            <Text
                ref={titleRef}
                position={[0, 1.20, 0]}
                fontSize={contact.titleFont}
                letterSpacing={0.12}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                depthTest={false}
                fog={false}
            >
                CONTACT
            </Text>

            <Text
                ref={messageRef}
                position={[0, 0.72, 0]}
                fontSize={0.25}
                color="#c8c8c8"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                depthTest={false}
                fog={false}
            >
                Let's build something.
            </Text>


            <group position={[0, contact.slots[0], 0]}>

                <ContactCard
                    domRef={gmailDomRef}
                    type="gmail"
                    label={links.gmail.label}
                    value={links.gmail.value}
                    layout={contact}
                    onClick={() =>
                        openLink(links.gmail.url)
                    }
                />

            </group>


            <group position={[0, contact.slots[1], 0]}>

                <ContactCard
                    domRef={githubDomRef}
                    type="github"
                    label={links.github.label}
                    value={links.github.value}
                    layout={contact}
                    onClick={() =>
                        openLink(links.github.url)
                    }
                />

            </group>

            <group position={[0, contact.slots[2], 0]}>

                <ContactCard
                    domRef={linkedinDomRef}
                    type="linkedin"
                    label={links.linkedin.label}
                    value={links.linkedin.value}
                    layout={contact}
                    onClick={() =>
                        openLink(links.linkedin.url)
                    }
                />

            </group>

        </group>
    );
}
