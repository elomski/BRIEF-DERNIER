import React, { useEffect, useRef, useState } from 'react'
import { BoxCss } from './BoxStyles'
import { IoMdPersonAdd } from 'react-icons/io'
import { IoCreate, IoSettingsSharp } from 'react-icons/io5'
import { formDataRequest, getRequest, postRequest } from '../../js/httpRequest/axios';
import { MdContacts } from 'react-icons/md';
import { FaPaperclip, FaPaperPlane, FaUserGroup } from 'react-icons/fa6';
import { GoKebabHorizontal } from 'react-icons/go';
import Discussion_right from '../Discussion/Discussion_right';
import Discussion_left from '../Discussion/Discussion_left';
import FormInput from '../Inputs/FormInput';

export default function Box2({ userSelection }) {

  const [userId2, setUserId2] = useState(null);
  const [userImage2, setUserImage2] = useState(null);
  // const [allUser, setAllUser] = useState([]);
  const [username2, setUsername2] = useState(null);
  const [name2, setName2] = useState(null);
  const [inputMessage, setInputMessage] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [messageIsLoading, setMessageIsLoading] = useState(true);
  const UserId1 = localStorage.getItem('userId');

  useEffect(() => {
    if (userSelection) {
      setIsLoading(false); // Données prêtes

      setUsername2(() => userSelection.username);
      setUserImage2(() => userSelection.image);
      setUserId2(() => userSelection.id);
      // setUsername(userResponse.data.username);
      setName2(() => userSelection.first_name + ' ' + userSelection.last_name);

      //------------------------------------
      userRequestFunction

      setMessageIsLoading(false);
    }
  }, [userSelection]);


  // if (userSelection) {
  //   setUsername2(() => userSelection.username)
  //   setUserImage2(() => userSelection.image)
  //   setUserId2(() => userSelection.id)
  //   // setUsername(userResponse.data.username);
  //   setName2(() => userSelection.first_name + ' ' + userSelection.last_name);
  // }


  const userRequestFunction = async (e) => {
    // Récupérer l'ID de l'utilisateur à partir du localStorage
    const messageResponse = await getRequest(`show_m/${UserId1}/20`);
    setMessage(() => messageResponse.data)
    // let newUsername = userResponse.data.username
    console.log(messageResponse.data)
  }

  const messagesArray = Array.isArray(message) ? message : [];

  useEffect(() => {

    // setUserId(storedUserId); // Mettre à jour le state avec l'ID de l'utilisateur
    userRequestFunction();
    // console.log(storedUserId)
    // console.log(userId)
    console.log(username2)
    console.log(name2)
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]); // Récupère tous les fichiers sous forme de tableau
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageFormData = new FormData();
    messageFormData.append('user_id', localStorage.getItem('userId'))
    messageFormData.append('message', inputMessage)
    for (let index = 0; index < selectedFiles.length; index++) {
      messageFormData.append('file[]', selectedFiles[index])
      
      console.log(selectedFiles)
    }
    // messageFormData.append('file[]', selectedFiles)

    const messageUrl = 'send_m/' + localStorage.getItem('userId') + '/' + userSelection.id;

    const messageResponse = await formDataRequest(messageUrl, messageFormData);

    if (messageResponse.success) {
      setMessage('');
      console.log(messageResponse)
    } else {
      console.error(messageResponse);
    }
  }

  const textarea = useRef(null);

  // Fonction pour ajuster la hauteur en fonction du contenu
  const autoResize = () => {
    const textareaStyle = textarea.current;
    textareaStyle.style.height = 'auto';  // Réinitialise la hauteur
    textareaStyle.style.height = `${textareaStyle.scrollHeight}px`;  // Ajuste la hauteur
  };

  return (
    <div style={BoxCss.container2Css}>
      <style>
        {`
          /* Scrollbar pour Chrome, Safari et autres navigateurs WebKit */
          ::-webkit-scrollbar {
              width: 5px;
          }

          ::-webkit-scrollbar-track {
              background: transparent;
          }

          ::-webkit-scrollbar-thumb {
              background: #8F8F8F;
              border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
              background: blue;
          }

          #Styles:focus {
              // background-color: #EDF5FF;
              border: none;
              outline: none;
              // color: white;
          }

          #message:focus {
            outline: none;
          }
      `}
      </style>
      <div style={BoxCss.sectionTopCss}>
        {!isLoading ? (userSelection ? (
          <div style={BoxCss.profilDivCss}>
            <img src={`http://localhost:8000/storage/${userImage2}`} alt={username2} style={BoxCss.profilCss}>
            </img>
            <div>
              <div style={{
                // backgroundColor: 'red',
                fontSize: '14px',
                fontWeight: 'bold',
                // position: 'relative',
                // top: '6px'
              }}>{username2}</div>
              <div
                style={{ fontSize: '14px' }}
              >{name2}</div>
            </div>
          </div>
        ) : (
          <p>Aucun utilisateur sélectionné.</p>
        )) : (<p>Chargement...</p>)}
        <div style={BoxCss.topIconesCss}>
          <GoKebabHorizontal size={30} />
        </div>
      </div>
      <div style={BoxCss.discussionCss}>
        {!messageIsLoading ? (messagesArray && messagesArray.length > 1 ? (
          messagesArray.map(messages => (
            messages.user_id == UserId1 ? (
              <Discussion_right text={messages.message} time={messages.created_at} key={messages.id} />
            ) : (
              <Discussion_left text={messages.message} time={messages.created_at} key={messages.id} />
            ))
          )) : (
          <p>Aucun utilisateur trouvé</p>
        )) : (<p>Chargement de la discussion...</p>)}
        <Discussion_right text={'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n a pas fait que survivre cinq siècles, mais s est aussi adapté à la bureautique informatique, sans que son contenu n en soit modifié.'} time={'00:00'} />
        <Discussion_right text={'.'} time={'00:00'} />
        <Discussion_left text={'.'} time={'00:00'} />
        <Discussion_right text={'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n a pas fait que survivre cinq siècles, mais s est aussi adapté à la bureautique informatique, sans que son contenu n en soit modifié.'} time={'00:00'} />
        <Discussion_left text={'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n a pas fait que survivre cinq siècles, mais s est aussi adapté à la bureautique informatique, sans que son contenu n en soit modifié.'} time={'00:00'} />
      </div>
      <form onSubmit={handleSubmit} style={BoxCss.discussioninputCss}>
        <textarea
          type='text'
          style={BoxCss.inputCss}
          placeholder='Dites quelques chose'
          id="inputMessage"
          ref={textarea}
          // value={message}
          onChange={(e) => {
            setInputMessage(e.target.value)
          }}
          onInput={autoResize}
        ></textarea>
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )} {/* Affiche les noms des fichiers */}
        <input type='file' multiple onChange={handleFileChange} />
        <div style={BoxCss.fileButton}></div>
        {/* <FaPaperclip size={20} /> */}
        <button
          style={BoxCss.discussionButton}
          type={'submit'}
        ><FaPaperPlane size={20} /></button>
      </form>
    </div>
  )
}
