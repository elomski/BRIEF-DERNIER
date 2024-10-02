import React, { useState } from 'react'
import { GroupStyle } from '../CreateGroupe/CreateGroupeStyles'
import { toast } from 'react-toastify';
import { postRequest } from '../../js/httpRequest/axios';

export default function AddGroupForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupFormData = new FormData();
        groupFormData.set('name', name);
        groupFormData.set('description', description);

        const UserId = localStorage.getItem('userId');
        const newGroup = `new_groupe/${UserId}`;
        const groupResponse = await postRequest(newGroup, groupFormData);

        if (groupResponse.success != false) {
            const addGroupeMemberResponse = await postRequest(`addMember/${localStorage.getItem('userId')}/${groupResponse.data[0].id}`);

            console.log(addGroupeMemberResponse);
            console.log(groupResponse.data[0].id);

            toast.success(groupResponse.message);
            setIsLoading(false);
            setName('');
            setDescription('');
            localStorage.setItem('if_add_groups', false);

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
            console.log(groupResponse);
            toast.error(groupResponse.message);
            setIsLoading(false);
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            style={GroupStyle.groupDiv}
            onClick={e => e.stopPropagation()}
        >
            Créer un groupe
            <input
                type="text"
                style={GroupStyle.groupInputDiv}
                placeholder={"Nom du groupe"}
                id="name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                />
            <input
                type="text"
                style={GroupStyle.groupInputDiv}
                placeholder={"Description du groupe"}
                id="description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />
            <button
                disabled={isLoading}
                type='submit'
                style={GroupStyle.groupButtonDiv}
            >{isLoading ? "chargement ..." : "Valider"}</button>
        </form>
    )
}
