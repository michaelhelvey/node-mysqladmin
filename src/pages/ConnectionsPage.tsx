import React, { useEffect } from 'react'
import db from '../db'
import styled from 'styled-components'

const MyButton = styled.button`
  background-color: red;
`

const ConnectionsPage: React.FunctionComponent = props => {
  useEffect(() => {
    const testConnection = async () => {
      await db.createConnection({
        user: 'root',
        password: 'tallis',
        host: '127.0.0.1',
        database: 'rrm_test_2',
      })
      const data = await db.query(
        `select * from courses where title like "%Greek%"`
      )
      console.log(data)
    }
    testConnection()
  })

  return (
    <div>
      Connections Page Number 4!
      <MyButton>Yay</MyButton>
    </div>
  )
}

export default ConnectionsPage
