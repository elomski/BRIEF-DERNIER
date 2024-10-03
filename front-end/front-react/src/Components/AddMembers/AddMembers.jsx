import React, { useEffect, useState } from 'react'
import { getRequest, postRequest } from '../../js/httpRequest/axios';
import { BoxCss } from '../Box/BoxStyles';
import { FaLockOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AddMembers() {

  const [allUser, setAllUser] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [groupId, setGroupId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    // setUserId(storedUserId); // Mettre à jour le state avec l'ID de l'utilisateur
    userRequestFunction();
    // groupeRequestFunction();
    // groupeRequestFunction();
    // localStorage.setItem('if_add_groups', '0');
    // console.log(storedUserId)
    // console.log(userId)
    // console.log(username)
    // console.log(name)
    setInterval(() => {
      setGroupId(() => localStorage.getItem('group_id'));
    }, 1000);
    // return () => clearInterval(intervalId);
    // setGroupId(() => localStorage.getItem('group_id'));
  }, []);

  const userRequestFunction = async (e) => {

    const fetchUsers = async () => {
      const allUserResponse = await getRequest('users_index');
      // const userData = await allUserResponse.json();
      // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
      console.log(allUserResponse)
      setAllUser(() => allUserResponse.data[0])
      console.log(allUser)
    };

    // const fetchMessages = async () => {
    //     const allMessagesResponse = await getRequest(`show_m/${userId}/${userId2}2`);
    //     // const userData = await allUserResponse.json();
    //     // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
    //     setAllMessage(() => allMessagesResponse.data)
    //     handleUserClick2((JSON.stringify(allMessagesResponse.data)))
    //     console.log(allMessagesResponse.data)
    // };

    fetchUsers();
    // fetchMessages();

    // Récupérer l'ID de l'utilisateur à partir du localStorage
    // ---------------const storedUserId = localStorage.getItem('userId');
    // -----------------const userResponse = await getRequest('users_show/' + storedUserId);
    // let newUsername = userResponse.data.username
    // console.log(userResponse)
    // setUsername(() => userResponse.data[0].username)
    // setUserImage(() => userResponse.data[0].image)
    // setUsername(userResponse.data.username);
    // ---------------setName(() => userResponse.data[0].first_name + ' ' + userResponse.data[0].last_name);
  }

  const handleSubmit = async (userId) => {

    // const groupFormData = new FormData();
    // groupFormData.set('name', name);
    // groupFormData.set('description', description);

    // const UserId = localStorage.getItem('userId');
    // const groupId = localStorage.getItem('group_id')
    const addMember = `addMember/${userId}/${groupId}`;
    const addResponse = await postRequest(addMember);
    console.log(groupId)

    if (addResponse.success != false) {
      // const addGroupeMemberResponse = await postRequest(`addMember/${localStorage.getItem('userId')}/${addResponse.data[0].id}`);

      // console.log(addGroupeMemberResponse);
      console.log(addResponse.data[0].id);

      toast.success(addResponse.message);
      setIsLoading(false);
      // localStorage.setItem('if_add_groups', false);

      // try {
      //     const response = await axios.get('https://127.0.0.1:8000/api/v1.0.0/protected-route', {
      //         headers: {
      //             'Authorization': `Bearer ${loginResponse.success.token}`, // Ajoute le token au header
      //         },
      //     });

      //     console.log(response.data);
      // } catch (error) {
      //     console.log(error);
      // }
      // console.log(loginResponse.success.id);
    } else {
      console.log(addResponse);
      toast.error(addResponse.message);
      setIsLoading(false);
    }

  }


  return (
    <div
      style={BoxCss.sectionBottomCss2}
    >
      <style>
        {`
          .hoverUser:hover {
              background-color: #0077ff96;
              transition-duration: 500ms;
          }
          .texte-limite {
              width: 200px;  
              // background-color: yellow;
              overflow: hidden;  /* Cache le texte qui dépasse */
              text-overflow: ellipsis;  /* Ajoute des points de suspension */
              white-space: nowrap;  /* Empêche le texte de s'étendre sur plusieurs lignes */
          }
          .icones {
              cursor: pointer;
              color: #2b2b2b;
          }
          .icones:hover {
              color: #0077ff96;
              size: 40px;
              transition-duration: 1000ms;
              rotate: 320deg;
              // margin-bottom: 5px;
          }
          .iconesActive {
              border-style: solid;
              border-color: #6E5FB1;
              border-width: 0 0 5px 0;
              // background-color: red
          }
        `}
      </style>

      {
        allUser && allUser.length > 0 ? (
          allUser.map(user => (
            user.id != userId ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(user.id)
                }}
                style={BoxCss.allUserCss}
                className='hoverUser'
                key={user.id}
                onClick={e => e.stopPropagation()}
              // onClick={() => (
              //   // handleUserClick1(user),
              //   // setUserId2(() => user.id),
              //   // localStorage.setItem('user_id2', user.id)
              //   // console.log(userId2),
              //   // console.log('id2   ' + localStorage.getItem('user_id2')),
              //   // console.log(user.id)
              // )}
              // onMouseMove={}
              >
                <img src={`http://localhost:8000/storage/${user.image}`} alt={user.username} style={BoxCss.profilCss}>
                </img>
                <div style={{ minWidth: '220px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>{user.first_name + ' ' + user.last_name}</div>
                  <div
                    style={{ fontSize: '14px' }}
                  >{user.username}</div>
                </div>
                {/* <FaLockOpen /> */}
                <button>Ajouter</button>
                {/* <input type="checkbox" /> */}
              </form>
            ) : (null)

          ))
        ) : (
          <p>Aucun utilisateur trouvé</p>
        )
      }
    </div>
  )
}