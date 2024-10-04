import React from 'react'
import { DiscussionCss } from './DiscussionStyles'
import { Images } from '../../js/httpRequest/img';

export default function Discussion_right({
    time, text, file
}) {



    const checkType = (text) => {
        const subStrings = ["jpeg", "png", "jpg"];
        const ifPresent = subStrings.some(sub => text.includes(sub));
        return ifPresent;
    }

    const files = JSON.parse(file)

    const handleDownload = (image) => {
        // Ouvre une nouvelle fenêtre pour télécharger l'image
        const link = document.createElement('a');
        link.href = `http://localhost:8000/storage//${image}`; // Chemin vers l'image
        link.download = image; // Nom par défaut du fichier téléchargé
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Nettoie après le téléchargement
    };

    return (
        <div style={DiscussionCss.rightDiscCss}>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                <div style={DiscussionCss.finalTextDivCss}>
                    <div style={DiscussionCss.textDivRightCss}>
                        {text}
                        <div style={DiscussionCss.fileDivCss}>
                            {
                                files ? (
                                    files.length > 1 ? (
                                        files.map((file, index) => (
                                            <div key={index} style={DiscussionCss.fileDiv2Css}>
                                                {checkType(file) ? (
                                                    <img src={`http://localhost:8000/storage//${file}`} alt="" style={DiscussionCss.fileCss} />
                                                ) : (
                                                    <img src={Images.File_img} alt="" style={DiscussionCss.fileCss} />
                                                )}
                                                {/* <button onClick={() => handleDownload(file)}></button> */}
                                                <a style={{
                                                    fontSize: '15px'
                                                }} href={`http://localhost:8000/storage//${file}`} download>Download File {index + 1}</a>
                                                {/* <button onClick={() => handleDownload(file)}>Télécharger</button> */}
                                            </div>
                                        ))
                                    ) : files.length === 1 ? (
                                        <div style={DiscussionCss.fileDiv2Css}>
                                            {checkType(file) ? (
                                                <img src={`http://localhost:8000/storage//${JSON.parse(file)}`} alt="" style={DiscussionCss.fileCss} />
                                            ) : (
                                                <img src={Images.File_img} alt="" style={DiscussionCss.fileCss} />
                                            )}

                                            <a style={{
                                                fontSize: '15px'
                                            }} href={`http://localhost:8000/storage//${JSON.parse(file)}`} download>Download File</a>
                                            {/* <button onClick={() => handleDownload(file)}>Télécharger</button> */}
                                        </div>
                                    ) : (null)
                                ) : (null)
                            }
                        </div>
                    </div>
                    <div style={DiscussionCss.triangleRightCss}></div>
                </div>
                <div style={{ fontSize: '9px', margin: '2px 18px' }}>{time}</div>
            </div>
        </div>
    )
}
