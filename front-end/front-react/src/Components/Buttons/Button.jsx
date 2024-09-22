import React from 'react'

export default function Button({
    // onClick,
    style,
    type,
    text,
    disabled = false,
}) {
    return (
        <button
            // onClick={onClick}
            type={type}
            disabled={disabled}
            style={style}
        >
            {text || "Connecter"}
        </button>
    )
}
