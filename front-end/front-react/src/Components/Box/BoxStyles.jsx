import React from 'react'

const container1Css = {
    width: '420px',
    height: '100vh',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#212121',
    // borderRadius: '20px',
    gap: '10px'
}

const container2Css = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red',
    // borderRadius: '20px',
    // gap: '10px'
}

const sectionTopCss = {
    width: '100%',
    height: 'auto',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    // borderRadius: '20px',
    // justifyContent: 'center',
    // alignItems: 'center',
    // gap: '80px',
    backgroundColor: '#212121',
    // borderRadius: '20px',
}

const sectionCenterCss = {
    width: '100%',
    height: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // borderRadius: '20px',
    gap: '1px',
}

const sectionBottomCss = {
    width: '95%',
    height: '77%',
    display: 'flex',
    // justifyContent: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // borderRadius: '20px 20px 0 0',
    padding: '15px 0 0 0',
    margin: '0 0 10px 0',
    color: 'white'
}

const sectionBottomCss2 = {
    width: '28%',
    height: '77%',
    display: 'flex',
    // justifyContent: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#212121',
    borderRadius: '20px',
    padding: '15px 0 0 0',
    margin: '0 0 10px 0',
    color: 'white'
}

const profilDivCss = {
    width: '90%',
    // maxWidth: '100%',
    height: '60px',
    display: 'flex',
    padding: '0 8px 0 8px',
    margin: '5px 0 0 5px',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    // backgroundColor: '#ccc',
    borderRadius: '20px',
}

const allUserCss = {
    width: '100%',
    maxWidth: '100%',
    height: '60px',
    display: 'flex',
    padding: '5px 0',
    // margin: '5px 0 5px 0',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    // backgroundColor: '#ccc',
    borderRadius: '10px',
}

const profilCss = {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
}

const topIconesCss = {
    width: 'auto',
    // height: 'auto',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: 'transparent',
    borderRadius: '20px',
    padding: '0 20px 0 0'
}

const discussionCss = {
    width: '100%',
    height: '77%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // borderRadius: '20px 20px 0 0',
    padding: '120px 0 0 0',
    gap: '8px',
    margin: '0 0 10px 0',
    // backgroundImage: 'linear-gradient(to bottom, #E8E8FF, white)',
}

const discussionCss2 = {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    flexDirection: 'column',
    // backgroundColor: 'red',
    // borderRadius: '20px 20px 0 0',
    gap: '8px',
    margin: '0 0 10px 0',
    // backgroundImage: 'linear-gradient(to bottom, #E8E8FF, white)',
}

const iconesMenuCss = {
    width: 'auto',
    // height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '25px',
    // backgroundColor: 'red',
    padding: '0 0 6px 0',
    // borderStyle: 'solide',
}

const discussioninputCss = {
    width: '50%',
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    gap: '10px',
    padding: '0 0 10px 0'
    
}

const discussionButton = {
    // width: '30px',
    // height: '30px',
    backgroundColor: '#8774E1',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '20px',
    padding: '8px 9px',
    border: 'none'
    // margin: '0 5px 0 0',
}

const fileButton = {
    // width: '30px',
    // height: '30px',
    backgroundColor: '#212121',
    cursor: 'pointer',
    borderRadius: '20px',
    padding: '8px 9px',
    border: 'none',
    color: 'white'
    // margin: '0 5px 0 0',
}

const inputCss = {
    width: '88%',
    backgroundColor: '#212121',
    color: 'white',
    height: '20px',
    cursor: 'pointer',
    borderRadius: '20px',
    padding: '5px 10px', 
    resize: 'none',
    overflow: 'hidden',
    maxHeight: '250px',
    border: '1px solid black'
    // margin: '0 5px 0 0',
}

const anyInuptsCss = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 0 10px 0',
    // backgroundColor: 'red'
}

const filesZonesCss = {
    width: '350px',
    maxHeight: '150px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    textAlign: 'left',
    padding: '0 0 0 10px',
    margin: '0',
    borderRadius: '10px',
    border: '1px solid white'
}

const noMessage = {
    width: '350px',
    Height: '550px',
    backgroundColor: 'red',
    textAlign: 'left',
    padding: '0 0 0 10px',
    margin: '0',
    borderRadius: '10px',
}

export const BoxCss = {
    container1Css,
    sectionTopCss,
    sectionCenterCss,
    sectionBottomCss,
    sectionBottomCss2,
    profilDivCss,
    profilCss,
    topIconesCss,
    iconesMenuCss,
    allUserCss,
    container2Css,
    discussionCss,
    discussionCss2,
    discussioninputCss,
    discussionButton,
    fileButton,
    inputCss,
    anyInuptsCss,
    filesZonesCss,
    noMessage

}