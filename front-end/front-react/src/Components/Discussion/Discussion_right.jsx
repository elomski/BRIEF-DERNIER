import React from 'react'
import { DiscussionCss } from './DiscussionStyles'

export default function Discussion_right({
    time, text
}) {
    return (
        <div style={DiscussionCss.rightDiscCss}>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                <div style={DiscussionCss.finalTextDivCss}>
                    <div style={DiscussionCss.textDivRightCss}>
                        {text}
                    </div>
                    <div style={DiscussionCss.triangleRightCss}></div>
                </div>
                <div style={{ fontSize: '9px', margin: '2px 18px' }}>{time}</div>
            </div>
        </div>
    )
}
