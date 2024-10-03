import React, { useEffect, useState } from 'react'
import { BoxCss } from './BoxStyles'
import { IoMdPersonAdd } from 'react-icons/io'
import { IoCreate, IoSettingsSharp } from 'react-icons/io5'
import { getRequest } from '../../js/httpRequest/axios';
import { MdContacts } from 'react-icons/md';
import { FaLockOpen, FaUserGroup } from 'react-icons/fa6';

export default function Box1({
    setUserSelection,
    setUserDiscussion,
    setGroupeSelection,
    setAddGroup,
}) {
    // export default function Box1() {

    // const handleUserClick1 = (user) => {
    //     setUserSelection(user); // Met à jour l'état partagé
    // };

    const handleUserClick1 = (user) => {
        localStorage.setItem('username', user.username); // Enregistre l'ID de l'utilisateur dans le localStorage(user);
        localStorage.setItem('image', user.image); // Enregistre l'ID de l'utilisateur dans le localStorage(user);
        localStorage.setItem('first_name', user.first_name); // Enregistre l'ID de l'utilisateur dans le localStorage(user);
        localStorage.setItem('last_name', user.last_name); // Enregistre l'ID de l'utilisateur dans le localStorage(user);
        localStorage.setItem('gropueVSuser', 'users'); // Enregistre l'ID de l'utilisateur dans le localStorage(user);
        setUserSelection(user); // Met à jour l'état partagé
    };
    const handleGroupeClick1 = (groupe) => {
        localStorage.setItem('groupeName', groupe.name);
        localStorage.setItem('groupeDescription', groupe.description);
        localStorage.setItem('groupeImage', groupe.image);
        localStorage.setItem('groupe_id', groupe.id)
        localStorage.setItem('gropueVSuser', 'groupes'); // Enregistre l'ID de l'utilisateur dans le localStorage(user);
        setGroupeId(() => groupe.id)
        setGroupeSelection(groupe);
    };

    // const handleUserClick2 = (message) => {
    //     setUserDiscussion(message); // Met à jour l'état partagé
    // };

    // const handleGroupeClick1 = (groupe) => {
    //     setUserSelection(groupe); // Met à jour l'état partagé
    // };

    // const handleGroupeClick2 = (message) => {
    //     setUserDiscussion(message); // Met à jour l'état partagé
    // };

    // const UserId1 = localStorage.getItem('userId');

    const [userId, setUserId] = useState(null);
    const [userId2, setUserId2] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [allUser, setAllUser] = useState([]);
    const [groupe, setGroupe] = useState([]);
    const [groupeId, setGroupeId] = useState(null);
    const [allMessage, setAllMessage] = useState([]);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [listScreen, setListScreen] = useState(null);


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
        const storedUserId = localStorage.getItem('userId');
        const userResponse = await getRequest('users_show/' + storedUserId);
        // let newUsername = userResponse.data.username
        // console.log(userResponse)
        // setUsername(() => userResponse.data[0].username)
        // setUserImage(() => userResponse.data[0].image)
        // setUsername(userResponse.data.username);
        setName(() => userResponse.data[0].first_name + ' ' + userResponse.data[0].last_name);
        setUserImage(() => userResponse.data[0].image);
    }

    const groupeRequestFunction = async (e) => {

        // const fetchUsers = async () => {
        //     const allUserResponse = await getRequest('users_index');
        //     // const userData = await allUserResponse.json();
        //     // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
        //     console.log(allUserResponse)
        //     setGroupe(() => allUserResponse.data[0])
        //     console.log(allUser)
        // };

        const fetchGroupes = async () => {
            const allGroupeResponse = await getRequest(`showAllForUser/${localStorage.getItem('userId')}`);
            // const userData = await allUserResponse.json();
            // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
            // setAllMessage(() => allGroupeResponse.data)
            setGroupe(() => allGroupeResponse.data[0])
            console.log(allGroupeResponse.data[0])
        };

        // const fetchMessages = async () => {
        //     const allMessagesResponse = await getRequest(`show_m/${userId}/${userId2}`);
        //     // const userData = await allUserResponse.json();
        //     // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
        //     setAllMessage(() => allMessagesResponse.data)
        //     handleUserClick2((JSON.stringify(allMessagesResponse.data)))
        //     console.log(allMessagesResponse.data)
        // };

        fetchGroupes();
        // fetchMessages();

        // Récupérer l'ID de l'utilisateur à partir du localStorage
        const storedGroupeId = localStorage.getItem('userId');
        const userResponse = await getRequest('users_show/' + storedGroupeId);
        // let newUsername = userResponse.data.username
        // console.log(userResponse)
        // setUsername(() => userResponse.data[0].username)
        // setUserImage(() => userResponse.data[0].image)
        // setUsername(userResponse.data.username);
        setName(() => userResponse.data[0].first_name + ' ' + userResponse.data[0].last_name);
    }

    useEffect(() => {

        // setUserId(storedUserId); // Mettre à jour le state avec l'ID de l'utilisateur
        userRequestFunction();
        // groupeRequestFunction();
        groupeRequestFunction();
        // localStorage.setItem('if_add_groups', '0');
        // console.log(storedUserId)
        // console.log(userId)
        // console.log(username)
        // console.log(name)
    }, []);

    const onIconeClique = (listScreen) => {
        setListScreen(() => listScreen)
    };

    const onGroupeIconeClique = () => {
        setAddGroup(() => true);
        localStorage.setItem('floatScreen', 1);
    };

    return (
        <div style={BoxCss.container1Css}>
            <style>
                {`
                    .hoverUser:hover {
                        background-color: #0077ff96;
                        transition-duration: 500ms;
                    }
                    .hoverUserActive {
                        background-color: #8774E1;
                    }
                    .hoverUser:active {
                        background-color: yellow;
                        transition-duration: 1000ms;
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
            <div style={BoxCss.sectionTopCss}>
                <div style={BoxCss.profilDivCss}>
                    <img src={`http://localhost:8000/storage/${userImage}`} alt={username} style={BoxCss.profilCss}>
                    </img>
                    <div>
                        <div style={{
                            // backgroundColor: 'red',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            // position: 'relative',
                            // top: '6px'
                        }}>{username}</div>
                        <div
                            style={{ fontSize: '14px' }}
                        >{name}</div>
                    </div>
                </div>
                <div style={BoxCss.topIconesCss}>
                    <IoMdPersonAdd
                        className='icones'
                        color='#6E5FB1'
                        size={30}
                    />
                    <IoCreate
                        className='icones'
                        color='#6E5FB1'
                        size={30}
                        onClick={() => (onGroupeIconeClique())}
                    />
                </div>
            </div>
            <div style={BoxCss.sectionCenterCss}>
                <div className={listScreen === '1' ? 'iconesActive' : ''} style={BoxCss.iconesMenuCss}>
                    <MdContacts
                        className='icones'
                        size={30}
                        color='#6E5FB1'
                        onClick={() => (onIconeClique('1'))}
                    />
                </div>
                <div className={listScreen === '2' ? 'iconesActive' : ''} style={BoxCss.iconesMenuCss}>
                    <FaUserGroup
                        className='icones'
                        color='#6E5FB1'
                        size={30}
                        onClick={() => (onIconeClique('2'))}
                    />
                </div>
                <div className={listScreen === '3' ? 'iconesActive' : ''} style={BoxCss.iconesMenuCss}>
                    <IoSettingsSharp
                        color='#6E5FB1'
                        className='icones'
                        size={30}
                        onClick={() => (onIconeClique('3'))}
                    />
                </div>
            </div>
            <div
                style={BoxCss.sectionBottomCss}
            >

                {
                    listScreen === '1' ? (
                        allUser && allUser.length > 0 ? (
                            allUser.map(user => (
                                user.id != userId ? (
                                    <div
                                        style={BoxCss.allUserCss}
                                        className={userId2 == user.id ? 'hoverUserActive' : 'hoverUser'}
                                        key={user.id}
                                        onClick={() => (
                                            handleUserClick1(user),
                                            setUserId2(() => user.id),
                                            localStorage.setItem('user_id2', user.id)
                                            // console.log(userId2),
                                            // console.log('id2   ' + localStorage.getItem('user_id2')),
                                            // console.log(user.id)
                                        )}
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
                                        <FaLockOpen />
                                        {/* <input type="checkbox" /> */}
                                    </div>
                                ) : (null)

                            ))
                        ) : (
                            <p>Aucun utilisateur trouvé</p>
                        )
                    ) : listScreen === '2' ? (
                        groupe && groupe.length > 0 ? (
                            groupe.map(group => (
                                group.id != userId ? (
                                    <div
                                        style={BoxCss.allUserCss}
                                        className={groupeId == group.id ? 'hoverUserActive' : 'hoverUser'}
                                        key={group.id}
                                        onClick={() => (
                                            handleGroupeClick1(group),
                                            localStorage.setItem('group_id', group.id)
                                            // setUserId2(() => group.id),
                                            // console.log(userId2),
                                            // console.log('id2   ' + localStorage.getItem('user_id2')),
                                            // console.log(user.id)
                                        )}
                                    // onMouseMove={}
                                    >
                                        <img src={`http://localhost:8000/storage/${group.image}`} alt={group.name} style={BoxCss.profilCss}>
                                        </img>
                                        <div style={{ minWidth: '220px' }}>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                            }}>{group.name}</div>
                                            <div
                                                className='texte-limite'
                                                style={{ fontSize: '12px' }}
                                            >{group.description}</div>
                                        </div>
                                    </div>
                                ) : (null)

                            ))
                        ) : (
                            <p>Aucun groupe trouvé</p>
                        )
                    ) : listScreen === '3' ? (null) : (null)

                }
            </div>
        </div>
    )
}
