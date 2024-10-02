import React from 'react'
import { InputCss } from './FormInputStyles'

export default function FormInput(
    {
        value,
        onChange,
        placeholder,
        className,
        type,
        reference
      }
) {
    return (
        <input
            type={type}
            style={ InputCss.container }
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={reference}
        />
    )
}
