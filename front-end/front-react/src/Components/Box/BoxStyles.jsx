import React from 'react'

const container1Css = {
    width: '360px',
    height: '90vh',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
    gap: '10px'
}

const container2Css = {
    width: '500px',
    height: '90vh',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
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
    // backgroundColor: 'green',
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
    justifyContent: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // borderRadius: '20px 20px 0 0',
    padding: '250px 0 0 0',
    margin: '0 0 10px 0',
    backgroundImage: 'linear-gradient(to bottom, #E8E8FF, white)',
}

const profilDivCss = {
    width: '90%',
    maxWidth: '100%',
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
    padding: '5px 8px',
    margin: '5px 0 0 5px',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    // backgroundColor: '#ccc',
    borderRadius: '20px',
}

const profilCss = {
    width: '60px',
    height: '60px',
    borderRadius: '25px',
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
    width: '95%',
    height: '77%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // borderRadius: '20px 20px 0 0',
    padding: '300px 0 0 0',
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
    border: 'solid black',
    borderWidth: '0 0 5px 0',
    // borderStyle: 'solide',
}

const discussioninputCss = {
    width: '100%',
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '0 0 10px 0'
    
}

const discussionButton = {
    // width: '30px',
    // height: '30px',
    backgroundColor: 'green',
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
    backgroundColor: '#D9D9D9',
    color: 'black',
    cursor: 'pointer',
    borderRadius: '20px',
    padding: '8px 9px',
    border: 'none'
    // margin: '0 5px 0 0',
}

const inputCss = {
    width: '60%',
    // backgroundColor: '#D9D9D9',
    color: 'black',
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

export const BoxCss = {
    container1Css,
    sectionTopCss,
    sectionCenterCss,
    sectionBottomCss,
    profilDivCss,
    profilCss,
    topIconesCss,
    iconesMenuCss,
    allUserCss,
    container2Css,
    discussionCss,
    discussioninputCss,
    discussionButton,
    fileButton,
    inputCss

}