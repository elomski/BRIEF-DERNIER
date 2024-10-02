import React, { useState } from 'react'
import Box1 from '../../Components/Box/Box1'
import { DashboardCss } from './DashboardStyles'
import Box2 from '../../Components/Box/Box2'
import CreateGroupe from '../../Components/CreateGroupe/CreateGroupe';

export default function Dashboard() {

  const [userSelection, setUserSelection] = useState(null); // État partagé
  const [groupeSelection, setGroupeSelection] = useState(null); // État partagé
  const [userDiscussion, setUserDiscussion] = useState(null); // État partagé
  const [addGroup, setAddGroup] = useState(false); // État partagé

  return (
    <div style={DashboardCss.containerCss}>
      <Box1
        setUserSelection={setUserSelection}
        setUserDiscussion={setUserDiscussion}
        setGroupeSelection={setGroupeSelection}
        setAddGroup={setAddGroup}
      />
      <Box2
        userSelection={userSelection}
        userDiscussion={userDiscussion}
        groupeSelection={groupeSelection}
      />
      <CreateGroupe
        addGroup={addGroup}
        setAddGroup={setAddGroup}

      />
      {/* {
        localStorage.getItem('if_add_groups') ? (
          <CreateGroupe />
        ) : (null)
      } */}

    </div>
  )
}
