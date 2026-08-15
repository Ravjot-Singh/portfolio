import { ContactCard } from "./ContactCard";
import { Html, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function ContactSection({ progress }) {

    const groupRef = useRef();
    const titleRef = useRef();
    const messageRef = useRef();
    const gmailDomRef = useRef();
    const githubDomRef = useRef();
    const linkedinDomRef = useRef();

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


    const contactActive =
        progress >= 1.15 &&
        progress <= 1.23;


    groupRef.current.visible = contactActive;

    const titleProgress =
        THREE.MathUtils.clamp(
            (progress - 1.15) / 0.03,
            0,
            1
        );


    const titleEase =
        THREE.MathUtils.smoothstep(
            titleProgress,
            0,
            1
        );


    const messageProgress =
        THREE.MathUtils.clamp(
            (progress - 1.17) / 0.03,
            0,
            1
        );


    const messageEase =
        THREE.MathUtils.smoothstep(
            messageProgress,
            0,
            1
        );


    const cardsInProgress =
        THREE.MathUtils.clamp(
            (progress - 1.19) / 0.04,
            0,
            1
        );


    const cardsInEase =
        THREE.MathUtils.smoothstep(
            cardsInProgress,
            0,
            1
        );

    const cardsOutProgress =
        THREE.MathUtils.clamp(
            (progress - 1.27) / 0.03,
            0,
            1
        );


    const cardsOutEase =
        THREE.MathUtils.smoothstep(
            cardsOutProgress,
            0,
            1
        );


    const titleOpacity =
        contactActive
            ? titleEase
            : 0;


    const messageOpacity =
        contactActive
            ? messageEase
            : 0;


    const cardOpacity =
        contactActive
            ? cardsInEase * (1 - cardsOutEase)
            : 0;

    if (titleRef.current) {

        titleRef.current.material.opacity =
            titleOpacity;

        titleRef.current.fillOpacity =
            titleOpacity;

        titleRef.current.outlineOpacity =
            titleOpacity;

        titleRef.current.position.y =
            THREE.MathUtils.lerp(
                1.20,
                1.65,
                titleEase
            );
    }


    if (messageRef.current) {

        messageRef.current.material.opacity =
            messageOpacity;

        messageRef.current.fillOpacity =
            messageOpacity;

        messageRef.current.outlineOpacity =
            messageOpacity;

        messageRef.current.position.y =
            THREE.MathUtils.lerp(
                0.72,
                1.20,
                messageEase
            );
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


        const visible =
            cardOpacity > 0.02;


        ref.current.style.opacity =
            String(cardOpacity);


        ref.current.style.visibility =
            visible
                ? "visible"
                : "hidden";


        ref.current.style.pointerEvents =
            visible
                ? "auto"
                : "none";


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
                fontSize={0.38}
                letterSpacing={0.12}
                color="#d6b45a"
                anchorX="center"
                anchorY="middle"
                transparent
                depthWrite={false}
                depthTest={false}
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
            >
                Let's build something.
            </Text>


            <group position={[0, 0.40, 0]}>

                <ContactCard
                    domRef={gmailDomRef}
                    type="gmail"
                    label={links.gmail.label}
                    value={links.gmail.value}
                    onClick={() =>
                        openLink(links.gmail.url)
                    }
                />

            </group>


            <group position={[0, -0.50, 0]}>

                <ContactCard
                    domRef={githubDomRef}
                    type="github"
                    label={links.github.label}
                    value={links.github.value}
                    onClick={() =>
                        openLink(links.github.url)
                    }
                />

            </group>

            <group position={[0, -1.40, 0]}>

                <ContactCard
                    domRef={linkedinDomRef}
                    type="linkedin"
                    label={links.linkedin.label}
                    value={links.linkedin.value}
                    onClick={() =>
                        openLink(links.linkedin.url)
                    }
                />

            </group>

        </group>
    );
}