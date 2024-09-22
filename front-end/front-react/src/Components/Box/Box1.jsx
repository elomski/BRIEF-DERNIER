import React, { useEffect, useState } from 'react'
import { BoxCss } from './BoxStyles'
import { IoMdPersonAdd } from 'react-icons/io'
import { IoCreate, IoSettingsSharp } from 'react-icons/io5'
import { getRequest } from '../../js/httpRequest/axios';
import { MdContacts } from 'react-icons/md';
import { FaLockOpen, FaUserGroup } from 'react-icons/fa6';

export default function Box1({ setUserSelection }) {

    const handleUserClick = (user) => {
        setUserSelection(user); // Met à jour l'état partagé
    };

    const [userId, setUserId] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [allUser, setAllUser] = useState([]);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);



    const userRequestFunction = async (e) => {

        const fetchUsers = async () => {
            const allUserResponse = await getRequest('users_index');
            // const userData = await allUserResponse.json();
            // setAllUser(userData); // Supposons que data est un tableau d'utilisateurs
            console.log(allUserResponse)
            setAllUser(() => allUserResponse.data[0])
            console.log(allUser)
        };

        fetchUsers();

        // Récupérer l'ID de l'utilisateur à partir du localStorage
        const storedUserId = localStorage.getItem('userId');
        const userResponse = await getRequest('users_show/' + storedUserId);
        // let newUsername = userResponse.data.username
        console.log(userResponse)
        setUsername(() => userResponse.data[0].username)
        setUserImage(() => userResponse.data[0].image)
        // setUsername(userResponse.data.username);
        setName(() => userResponse.data[0].first_name + ' ' + userResponse.data[0].last_name);
    }

    useEffect(() => {

        // setUserId(storedUserId); // Mettre à jour le state avec l'ID de l'utilisateur
        userRequestFunction();
        // console.log(storedUserId)
        console.log(userId)
        console.log(username)
        console.log(name)
    }, []);

    return (
        <div style={BoxCss.container1Css}>
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
                    <IoMdPersonAdd size={30} />
                    <IoCreate size={30} />
                </div>
            </div>
            <div style={BoxCss.sectionCenterCss}>
                <div style={BoxCss.iconesMenuCss}>
                    <MdContacts size={30} />
                </div>
                <div style={BoxCss.iconesMenuCss}>
                    <FaUserGroup size={30} />
                </div>
                <div style={BoxCss.iconesMenuCss}>
                    <IoSettingsSharp size={30} />
                </div>
            </div>
            <div
                style={BoxCss.sectionBottomCss}
            >

                {allUser && allUser.length > 0 ? (
                    allUser.map(user => (
                        <div
                            style={BoxCss.allUserCss}
                            key={user.id}
                            onClick={() => handleUserClick(user)}
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
                        </div>
                    ))
                ) : (
                    <p>Aucun utilisateur trouvé</p>
                )}
            </div>
        </div>
    )
}
