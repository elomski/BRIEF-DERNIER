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
import moment from 'moment/moment';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
// import { format } from 'date-fns';

export default function Box2({ userSelection, userDiscussion }) {

  // const [userId2, setUserId2] = useState(null);
  const [userImage2, setUserImage2] = useState(null);
  // const [allUser, setAllUser] = useState([]);
  const [username2, setUsername2] = useState(null);
  const [name2, setName2] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [groupeMessage, setGroupeMessage] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allMessage, setAllMessage] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [messageIsLoading, setMessageIsLoading] = useState(true);
  const UserId1 = localStorage.getItem('userId');
  const UserId2 = localStorage.getItem('user_id2');

  useEffect(() => {
    if (userSelection) {
      setIsLoading(false); // Données prêtes

      setUsername2(() => userSelection.username);
      setUserImage2(() => userSelection.image);
      // setUserId2(() => localStorage.getItem('user_id2'));
      // console.log(UserId2 + 'dfsv')
      // setUsername(userResponse.data.username);
      setName2(() => userSelection.first_name + ' ' + userSelection.last_name);

      //------------------------------------
      setMessageIsLoading(false);
      // fetchMessages();

      // console.log(userId2)

    }
    userRequestFunction();
  }, [userSelection]);

  //   const fetchMessages = async () => {
  //     const allMessagesResponse = await getRequest(`show_m/${UserId1}/${UserId2}`);
  //     // const userData = await allUserResponse.json();
  //     // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
  //     setAllMessage(() => allMessagesResponse)
  //     console.log(UserId2)
  // };


  // if (userSelection) {
  //   setUsername2(() => userSelection.username)
  //   setUserImage2(() => userSelection.image)
  //   setUserId2(() => userSelection.id)
  //   // setUsername(userResponse.data.username);
  //   setName2(() => userSelection.first_name + ' ' + userSelection.last_name);
  // }


  const userRequestFunction = async (e) => {
    // Récupérer l'ID de l'utilisateur à partir du localStorage
    const messageResponse = await getRequest(`show_m/${UserId1}/${UserId2}`);
    setAllMessage(() => messageResponse.data)
    // let newUsername = userResponse.data.username
    // console.log(UserId1)
    // console.log(UserId2)
    // console.log(allMessage)
  }

  const groupeMessageFunction = async (e) => {
    // Récupérer l'ID de l'utilisateur à partir du localStorage
    // const messageResponse = await getRequest(`show_m/${UserId1}/${UserId2}`);
    setGroupeMessage(() => messageResponse.data)
    // let newUsername = userResponse.data.username
    // console.log(UserId1)
    // console.log(UserId2)
    // console.log(allMessage)
  }

  const messagesArray = Array.isArray(allMessage) ? allMessage : [];
  // console.log(messagesArray)
  useEffect(() => {

    // setUserId(storedUserId); // Mettre à jour le state avec l'ID de l'utilisateur
    userRequestFunction();
    // console.log(storedUserId)
    // console.log(userId)
    // console.log(username2)
    // console.log(name2)
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]); // Récupère tous les fichiers sous forme de tableau
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageFormData = new FormData();
    if (selectedFiles.length > 12) {
      // for (let index = 0; index < 12; index++) {
      //   messageFormData.append('file[]', selectedFiles[index])

      //   console.log(selectedFiles)
      // }
      window.alert('Vous ne pouvez pas envoyer plus de 12 fichier')
      return;
    } else {
      messageFormData.append('user_id', localStorage.getItem('userId'))
      messageFormData.append('message', inputMessage)
      for (let index = 0; index < selectedFiles.length; index++) {
        messageFormData.append('file[]', selectedFiles[index])

        // console.log(selectedFiles)
      }
      // setUsername2(() => '')
    }
    // messageFormData.append('file[]', selectedFiles)

    const messageUrl = 'send_m/' + localStorage.getItem('userId') + '/' + UserId2;
    // const messageUrl = 'send_m/' + localStorage.getItem('userId') + '/' + UserId2;


    console.log(userSelection)
    console.log(userDiscussion)
    const messageResponse = await formDataRequest(messageUrl, messageFormData);

    if (messageResponse.success) {
      setInputMessage('');
      // console.log(messageResponse)
    } else {
      // console.error(messageResponse);
    }
  }

  const textarea = useRef(null);

  // Fonction pour ajuster la hauteur en fonction du contenu
  const autoResize = () => {
    const textareaStyle = textarea.current;
    textareaStyle.style.height = 'auto';  // Réinitialise la hauteur
    textareaStyle.style.height = `${textareaStyle.scrollHeight}px`;  // Ajuste la hauteur
  };

  // npm install date-fns
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return format(date, 'HH:mm'); // Change le format selon tes besoins
  //   // return format(date, 'dd/MM/yyyy HH:mm'); // Change le format selon tes besoins
  // };

  const formatDate2 = (dateString) => {
    return moment(dateString).format('HH:mm'); // Change le format selon tes besoins
    // return moment(dateString).format('DD/MM/YYYY HH:mm'); // Change le format selon tes besoins
  };

  // useEffect(() => {
  //   // Initialiser Pusher
  //   window.Pusher = Pusher;

  //   // Initialiser Laravel Echo
  //   window.Echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: '1315e99f35ed06448b24', // Remplace par ta clé Pusher
  //     cluster: 'ap3',             // Remplace par ton cluster Pusher
  //     forceTLS: true,
  //   });

  //   // Écouter le canal de discussion 'chat' et l'événement 'MessageSent'
  //   window.Echo.channel('MyChat')
  //     .listen('MessageSent', (e) => {
  //       console.log(e.message); // Affiche le message reçu dans la console

  //       // Mettre à jour l'état des messages pour afficher le nouveau message
  //       setAllMessage(prevMessages => [...prevMessages, e.message]);
  //     });

  //   // Optionnel : nettoyer l'écouteur lors du démontage du composant
  //   return () => {
  //     window.Echo.leaveChannel('MyChat');
  //   };
  // }, []);

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage]); // Défilement à chaque mise à jour de allMessages


  useEffect(() => {
    // Récupérer les messages initialement
    userRequestFunction();

    // Mettre à jour les messages toutes les 5 secondes
    // const intervalId = setInterval(() => {
    //   userRequestFunction();
    // }, 5000); // 5000 ms = 5 secondes

    // Nettoyer l'intervalle au démontage du composant
    // return () => clearInterval(intervalId);
  }, []); // Le tableau vide [] signifie que cet effet s'exécute uniquement au premier rendu

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
              >{name2}  {UserId2}</div>
            </div>
          </div>
        ) : (
          <p>Aucun utilisateur sélectionné.</p>
        )) : (<p>Chargement...</p>)}
        <div style={BoxCss.topIconesCss}>
          <GoKebabHorizontal size={30} />
        </div>
      </div>
      <div style={BoxCss.discussionCss} className='' >
        {
          !messageIsLoading ? (allMessage && allMessage.length > 0 ? (
            allMessage.map(messages => (
              messages.user_id == UserId1 ? (
                <Discussion_right
                  text={messages.message}
                  time={formatDate2(messages.created_at)}
                  key={messages.id}
                  file={messages.file}
                />
              ) : (
                <Discussion_left
                  text={messages.message}
                  time={formatDate2(messages.created_at)}
                  key={messages.id}
                  file={messages.file}
                />
              ))
            )) : (
            <p>Aucune discussion trouvé</p>
          )) : (<p>Chargement de la discussion...</p>)
        }
        {/* <Discussion_right text={'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n a pas fait que survivre cinq siècles, mais s est aussi adapté à la bureautique informatique, sans que son contenu n en soit modifié.'} time={'00:00'} /> */}
        {/* <Discussion_right text={'.'} time={'00:00'} /> */}
        {/* <Discussion_left text={'.'} time={'00:00'} /> */}
        {/* <Discussion_right text={'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n a pas fait que survivre cinq siècles, mais s est aussi adapté à la bureautique informatique, sans que son contenu n en soit modifié.'} time={'00:00'} /> */}
        {/* <Discussion_left text={'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n a pas fait que survivre cinq siècles, mais s est aussi adapté à la bureautique informatique, sans que son contenu n en soit modifié.'} time={'00:00'} /> */}
      </div>
      <form onSubmit={handleSubmit} style={BoxCss.discussioninputCss}>
        <div style={BoxCss.anyInuptsCss}>
          {/* <ul style={BoxCss.filesZonesCss}>
            <div>sdfgvsdgbfbgfdbhdfgvsdgbfbgfdbhdfgvsdgbfbgfdbhg</div><br />
            <div>sdfgvsdgbfbgfdbhg</div><br />
            <div>sdfgvsdgbfbgfdbhg</div><br />
            <div>sdfgvsdgbfbgfdbhg</div><br />
            <div>sdfgvsdgbfbgfdbhg</div><br />
            <div>sdfgvsdgbfbgfdbhg</div><br />
            <div>sdfgvsdgbfbgfdbhg</div><br />
          </ul> */}
          {selectedFiles.length > 0 && (
            <ul style={BoxCss.filesZonesCss}>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )} {/* Affiche les noms des fichiers */}
          <input type='file' multiple onChange={handleFileChange} />
          <textarea
            type='text'
            style={BoxCss.inputCss}
            placeholder='Dites quelques chose'
            id="inputMessage"
            ref={textarea}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value)
            }}
            onInput={autoResize}
          ></textarea>
        </div>
        <div style={BoxCss.fileButton}>
          <FaPaperclip size={20} />
        </div>
        <button
          style={BoxCss.discussionButton}
          type={'submit'}
        ><FaPaperPlane size={20} /></button>
      </form>
    </div>
  )
}
