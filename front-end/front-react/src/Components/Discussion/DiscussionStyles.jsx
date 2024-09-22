import React from 'react'

const leftDiscCss = {
    // backgroundColor: "red",
    width: '100%',
    display: "grid",
    gridTemplateColumns: "auto 1fr",
}
const rightDiscCss = {
    // backgroundColor: "red",
    width: '100%',
    display: "grid",
    gridTemplateColumns: "1fr auto",
}

const textDivRightCss = {
    backgroundColor: "#FFCFCF",
    borderRadius: '10px 0px 10px 10px',
    padding: '10px',
    maxWidth: '340px',
    wordWrap: 'break-word',
    // minWidth: '50px'
}

const textDivLeftCss = {
    backgroundColor: "#CECECE",
    borderRadius: '0px 10px 10px 10px',
    padding: '10px',
    maxWidth: '340px',
    wordWrap: 'break-word'
}

const finalTextDivCss = {
    display: 'flex',
    // backgroundColor: 'yellow',
}

const triangleRightCss = {
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid #FFCFCF',
    rotate: '90deg',
    position: 'relative',
    top: '5px',
    right: '5px',
}

const triangleLeftCss = {
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid #CECECE',
    rotate: '-90deg',
    position: 'relative',
    top: '5px',
    left: '5px',
}

export const DiscussionCss = {
    leftDiscCss,
    rightDiscCss,
    textDivRightCss,
    finalTextDivCss,
    triangleRightCss,
    triangleLeftCss,
    textDivLeftCss
}