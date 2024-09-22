import React from 'react'
import { DiscussionCss } from './DiscussionStyles'

export default function Discussion_left({
    time, text
}) {
    return (
        <div style={DiscussionCss.leftDiscCss}>
            <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                <div style={DiscussionCss.finalTextDivCss}>
                    <div style={DiscussionCss.triangleLeftCss}></div>
                    <div style={DiscussionCss.textDivLeftCss}>
                        {text}
                    </div>
                </div>
                <div style={{ fontSize: '9px', margin: '2px 18px' }}>{time}</div>
            </div>
            <div></div>
        </div>
    )
}
