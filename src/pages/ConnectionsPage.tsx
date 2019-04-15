import React, { useEffect } from 'react'
import styled from 'styled-components'
import db from '../db'
import { AppSidebar, SidebarHeader } from '../components/containers'
import { H1 } from '../components/typography'
import CreateConnectionForm from '../components/ConnectionForm'

const ConnectionsPage: React.FunctionComponent = props => {
  useEffect(() => {
    const testConnection = async () => {
      await db.createConnection({
        user: 'root',
        password: 'tallis',
        host: '127.0.0.1',
        database: 'wordpress',
      })
      const data = await db.query(
        `select * from courses where title like "%Greek%"`
      )
      console.log(data)
    }
    testConnection()
  })

  return (
    <div className="flex h-full">
      <AppSidebar>
        <SidebarHeader>
          <H1>Saved Connections</H1>
        </SidebarHeader>
      </AppSidebar>
      <div className="flex justify-center items-center w-full">
        <CreateConnectionForm />
      </div>
    </div>
  )
}

export default ConnectionsPage
