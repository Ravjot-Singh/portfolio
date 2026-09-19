import { Html } from "@react-three/drei";

export function ContactCard({
    domRef,
    type,
    label,
    value,
    layout,
    onClick,
}) {

    const getLogo = () => {

        if (type === "gmail") {

            return (
                <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M3 5.5V18.5"
                        stroke="#d6b45a"
                        strokeWidth="1.8"
                    />

                    <path
                        d="M3 6L12 13L21 6"
                        stroke="#d6b45a"
                        strokeWidth="1.8"
                    />

                    <path
                        d="M21 5.5V18.5"
                        stroke="#d6b45a"
                        strokeWidth="1.8"
                    />
                </svg>
            );
        }


        if (type === "github") {

            return (
                <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="#d6b45a"
                >
                    <path
                        d="
                        M12 2
                        C6.48 2 2 6.58 2 12.24
                        C2 16.78 4.87 20.62 8.84 22
                        C9.34 22.1 9.52 21.78 9.52 21.5
                        C9.52 21.25 9.51 20.58 9.5 19.68
                        C6.73 20.3 6.14 18.3 6.14 18.3
                        C5.69 17.1 5.04 16.78 5.04 16.78
                        C4.14 16.15 5.11 16.16 5.11 16.16
                        C6.1 16.24 6.62 17.2 6.62 17.2
                        C7.5 18.74 8.94 18.3 9.54 18
                        C9.63 17.34 9.88 16.9 10.15 16.65
                        C7.94 16.4 5.62 15.5 5.62 11.42
                        C5.62 10.25 6.02 9.29 6.67 8.54
                        C6.56 8.27 6.2 7.18 6.76 5.72
                        C6.76 5.72 7.6 5.45 9.5 6.78
                        C10.3 6.55 11.15 6.44 12 6.44
                        C12.85 6.44 13.7 6.55 14.5 6.78
                        C16.4 5.45 17.24 5.72 17.24 5.72
                        C17.8 7.18 17.44 8.27 17.33 8.54
                        C17.98 9.29 18.38 10.25 18.38 11.42
                        C18.38 15.51 16.06 16.39 13.84 16.64
                        C14.18 16.95 14.48 17.55 14.48 18.48
                        C14.48 19.81 14.47 20.91 14.47 21.5
                        C14.47 21.78 14.65 22.1 15.16 22
                        C19.13 20.62 22 16.78 22 12.24
                        C22 6.58 17.52 2 12 2Z
                        "
                    />
                </svg>
            );
        }


        return (
            <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
            >
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="#d6b45a"
                    strokeWidth="1.8"
                />

                <path
                    d="M7 10V17"
                    stroke="#d6b45a"
                    strokeWidth="1.8"
                />

                <circle
                    cx="7"
                    cy="7"
                    r="1"
                    fill="#d6b45a"
                />

                <path
                    d="
                    M11 17V13.2
                    C11 11.4 12 10.4 13.5 10.4
                    C15 10.4 16 11.4 16 13.2
                    V17
                    "
                    stroke="#d6b45a"
                    strokeWidth="1.8"
                />
            </svg>
        );
    };


    return (

        <Html
            transform
            distanceFactor={5}
            position={[0, 0, 0.02]}
            center
        >

            <div
                ref={domRef}
                onClick={onClick}

                style={{
                    width: `${layout.cardWidth}px`,
                    height: `${layout.cardHeight}px`,

                    display: "flex",
                    alignItems: "center",

                    boxSizing: "border-box",

                    padding: "0 20px",

                    border:
                        "1px solid rgba(214,180,90,0.45)",

                    borderRadius: "9px",

                    background:
                        "rgba(8,8,8,0.90)",

                    cursor: "pointer",

                    opacity: 0,
                    visibility: "hidden",
                    pointerEvents: "none",

                    fontFamily:
                        "Arial, sans-serif",

                    userSelect: "none",

                    transition:
                        "border-color 0.2s ease, transform 0.2s ease",
                }}

                onMouseEnter={(e) => {

                    e.currentTarget.style.borderColor =
                        "rgba(214,180,90,0.95)";

                    e.currentTarget.style.boxShadow =
                        "0 0 14px rgba(214,180,90,0.15)";
                }}

                onMouseLeave={(e) => {

                    e.currentTarget.style.borderColor =
                        "rgba(214,180,90,0.45)";

                    e.currentTarget.style.boxShadow =
                        "none";
                }}
            >

                <div
                    style={{
                        width: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "17px",
                    }}
                >
                    {getLogo()}
                </div>


                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                    }}
                >

                    <div
                        style={{
                            color: "#d6b45a",
                            fontSize: `${layout.labelPx}px`,
                            fontWeight: "600",
                            letterSpacing: "2px",
                        }}
                    >
                        {label}
                    </div>


                    <div
                        style={{
                            color: "#c2c2c2",
                            fontSize: `${layout.valuePx}px`,
                            letterSpacing: "0.3px",
                        }}
                    >
                        {value}
                    </div>

                </div>


                <div
                    style={{
                        marginLeft: "auto",
                        color: "#d6b45a",
                        fontSize: "19px",
                    }}
                >
                    →
                </div>

            </div>

        </Html>
    );
}