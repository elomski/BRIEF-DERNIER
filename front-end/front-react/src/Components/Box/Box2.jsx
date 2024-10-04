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
import { CgAdd, CgAddR, CgUserAdd } from 'react-icons/cg';
import { BiAddToQueue } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
// import { format } from 'date-fns';

export default function Box2({ userSelection, userDiscussion, groupeSelection }) {

  // const [userId2, setUserId2] = useState(null);
  const [userImage2, setUserImage2] = useState(null);
  // const [allUser, setAllUser] = useState([]);
  const [username2, setUsername2] = useState(null);
  const [name2, setName2] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allMessage, setAllMessage] = useState([]);

  const [groupeMessage, setGroupeMessage] = useState([]);
  // const [allGroupeMessage, setAllGroupeMessage] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [messageIsLoading, setMessageIsLoading] = useState(true);
  const UserId1 = localStorage.getItem('userId');
  const UserId2 = localStorage.getItem('user_id2');
  const groupeId = localStorage.getItem('group_id');

  useEffect(() => {
    if (userSelection) {
      setIsLoading(false); // Données prêtes

      setUsername2(() => userSelection.username);
      setUserImage2(() => userSelection.image);
      setName2(() => userSelection.first_name + ' ' + userSelection.last_name);

      //------------------------------------
      setMessageIsLoading(false);

    }
    userRequestFunction();
    // Mettre à jour les messages toutes les 5 secondes
    // const intervalId = setInterval(() => {
    //   userRequestFunction();
    // }, 2000); // 5000 ms = 5 secondes

    // // Nettoyer l'intervalle au démontage du composant
    // return () => clearInterval(intervalId);
    // // groupeMessageFunction();
  }, [userSelection]);

  useEffect(() => {
    if (groupeSelection) {
      setIsLoading(false); // Données prêtes

      setUsername2(() => groupeSelection.name);
      setUserImage2(() => groupeSelection.image);
      setName2(() => groupeSelection.description);

      //------------------------------------
      setMessageIsLoading(false);

    }
    groupeMessageFunction();
    // // Mettre à jour les messages toutes les 5 secondes
    // const intervalId = setInterval(() => {
    //   groupeMessageFunction();
    // }, 2000); // 5000 ms = 5 secondes

    // // Nettoyer l'intervalle au démontage du composant
    // return () => clearInterval(intervalId);
  }, [groupeSelection]);


  const userRequestFunction = async (e) => {
    // Récupérer l'ID de l'utilisateur à partir du localStorage
    const messageResponse = await getRequest(`show_m/${UserId1}/${UserId2}`);
    setAllMessage(() => messageResponse.data)
  }

  const groupeMessageFunction = async (e) => {
    // Récupérer l'ID de l'utilisateur à partir du localStorage
    const messageResponse = await getRequest(`show_g_m/${groupeId}`);
    setAllMessage(() => messageResponse.data)
    console.log(messageResponse.data);
  }

  const messagesArray = Array.isArray(allMessage) ? allMessage : [];

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]); // Récupère tous les fichiers sous forme de tableau
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageFormData = new FormData();
    if (selectedFiles.length > 12) {
      window.alert('Vous ne pouvez pas envoyer plus de 12 fichier')
      return;
    } else {
      messageFormData.append('user_id', localStorage.getItem('userId'))
      messageFormData.append('message', inputMessage)
      for (let index = 0; index < selectedFiles.length; index++) {
        messageFormData.append('file[]', selectedFiles[index])

      }
    }
    // messageFormData.append('file[]', selectedFiles)
    let messageUrl = '';

    if (localStorage.getItem('gropueVSuser') === 'users') {
      console.log('users');
      messageUrl = 'send_m/' + localStorage.getItem('userId') + '/' + UserId2;
    }
    else {
      console.log('groupe');
      messageUrl = 'send_g_m/' + UserId1 + '/' + localStorage.getItem('groupe_id');
    }

    const messageResponse = await formDataRequest(messageUrl, messageFormData);

    if (messageResponse.success) {
      setInputMessage('');
      console.log(messageResponse)
      setSelectedFiles(() => []);
    } else {
      console.error(messageResponse);
      toast.error('Impossible d\'envoyer le message');
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


  // useEffect(() => {
  //   // Récupérer les messages initialement
  //   // userRequestFunction();
  //   // groupeMessageFunction();

  //   Mettre à jour les messages toutes les 5 secondes
  //   const intervalId = setInterval(() => {
  //     userRequestFunction();
  //   }, 5000); // 5000 ms = 5 secondes

  //   // Nettoyer l'intervalle au démontage du composant
  //   return () => clearInterval(intervalId);
  // }, []); // Le tableau vide [] signifie que cet effet s'exécute uniquement au premier rendu


  /**
   * Gère le clic sur l'icône "Ajouter des membres".
   * Met à jour le state `floatScreen` pour afficher le formulaire d'ajout de membres.
   */
  const onAddMembersIconeClique = () => {
    // setAddGroup(() => true);
    localStorage.setItem('floatScreen', 2);
  };

  return (
    <div style={BoxCss.container2Css}>
      <ToastContainer autoClose={1500} />
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
        {!isLoading ? (userSelection || groupeSelection ? (
          <div style={BoxCss.profilDivCss}>
            <img src={`http://localhost:8000/storage/${userImage2}`} alt={username2} style={BoxCss.profilCss}>
            </img>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}>{username2}</div>
              <div
                style={{ fontSize: '14px' }}
                className='text-limit1'
              >{name2}</div>
            </div>
          </div>
        ) : (
          <p>Aucun utilisateur sélectionné.</p>
        )) : (
          <p>Chargement...</p>
        )
        }
        <div style={BoxCss.topIconesCss}>
          <CgUserAdd
            size={30}
            onClick={onAddMembersIconeClique} />
          <GoKebabHorizontal size={30} />
        </div>
      </div>
      <div style={BoxCss.discussionCss} className='' >
        <div style={BoxCss.discussionCss2}>
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
              <div style={BoxCss.noMessage}>Aucune discussion trouvé</div>
            )) : (
              <div style={BoxCss.noMessage}>Chargement de la discussion...</div>
            )
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} style={BoxCss.discussioninputCss}>
        <div style={BoxCss.anyInuptsCss}>
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
