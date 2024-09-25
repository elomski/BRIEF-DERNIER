import React, { useState } from 'react'
import Box1 from '../../Components/Box/Box1'
import { DashboardCss } from './DashboardStyles'
import Box2 from '../../Components/Box/Box2'

export default function Dashboard() {

  const [userSelection, setUserSelection] = useState(null); // État partagé
  const [userDiscussion, setUserDiscussion] = useState(null); // État partagé

  return (
    <div style={DashboardCss.containerCss}>
      <Box1
        setUserSelection={setUserSelection}
        setUserDiscussion={setUserDiscussion}
      />
      <Box2
        userSelection={userSelection}
        userDiscussion={userDiscussion}
      />
    </div>
  )
}
