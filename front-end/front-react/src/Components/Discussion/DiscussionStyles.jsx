import React from 'react'

const leftDiscCss = {
    // backgroundColor: "red",
    width: 'auto',
    display: "grid",
    gridTemplateColumns: "auto 1fr",
}
const rightDiscCss = {
    // backgroundColor: "red",
    width: 'auto',
    display: "grid",
    gridTemplateColumns: "1fr auto",
}

const textDivRightCss = {
    backgroundColor: "#212121",
    borderRadius: '10px 0px 10px 10px',
    padding: '10px',
    width: 'auto',
    maxWidth: '340px',
    wordWrap: 'break-word',
    // minWidth: '50px'
}

const textDivLeftCss = {
    backgroundColor: "#212121",
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
    borderBottom: '10px solid #212121',
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
    borderBottom: '10px solid #212121',
    rotate: '-90deg',
    position: 'relative',
    top: '5px',
    left: '5px',
}

const fileDivCss = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px',
    width: 'auto',
    maxWidth: '320px',
    height: 'auto',
    // backgroundColor: 'red'
}

const fileDiv2Css = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    // flex
    width: 'auto',
    maxWidth: '320px',
    height: 'auto',
    // backgroundColor: 'red'
}

const fileCss = {
    width: '100px',
    height: '100px',
    maxWidth: '150px',
    maxHeight: '100px',
    // backgroundColor: 'blue',
    borderRadius: '10px'
}

export const DiscussionCss = {
    leftDiscCss,
    rightDiscCss,
    textDivRightCss,
    finalTextDivCss,
    triangleRightCss,
    triangleLeftCss,
    textDivLeftCss,
    fileDivCss,
    fileDiv2Css,
    fileCss
}