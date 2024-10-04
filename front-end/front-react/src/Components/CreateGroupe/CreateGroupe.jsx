import React, { useEffect, useState } from 'react'
import { GroupStyle } from './CreateGroupeStyles'
import { getRequest, postRequest } from '../../js/httpRequest/axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaClosedCaptioning } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import AddGroupForm from '../AddGroupForm/AddGroupForm';
import AddMembers from '../AddMembers/AddMembers';

export default function CreateGroupe({ addGroup, setAddGroup, addGroupSelected, setAddGroupSelected }) {

    const onOtherClique = () => {
        setAddGroup(() => false);
        setAddGroupSelected(() => false);
    }


    // const screen = localStorage.getItem('if_add_groups');

    return (
        <>
            <style>
                {`
                    .group_add_style {
                        height: 100vh;
                        width: 100%;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        position: fixed;
                        backdrop-filter: blur(2px);
                        // background-color: green;
                    }
                    .group_add_show {
                        display: flex;
                    }
                    .group_add_none {
                        display: none;
                    }
                `}
            </style>
            <div
                className={addGroup ? 'group_add_style group_add_show' : 'group_add_none'}
                style={GroupStyle.groupContainer}
                onClick={() => (onOtherClique())}
            >
                <ToastContainer autoClose={2500} />
                {
                    addGroupSelected ? (<AddGroupForm />) : (
                        localStorage.getItem('groupeName') ? (<AddMembers />) : (
                            <p className='test'>Veuillez choisir un groupe</p>
                        )
                        // <AddMembers />
                    )
                }
                {/* <CgClose size={20} style={{ cursor: 'pointer' }} onClick={() => (onOtherClique())} /> */}
            </div>
            {/* {
                !localStorage.getItem('if_add_groups') ? (
                ) : (null)
            } */}
        </>
    )
}