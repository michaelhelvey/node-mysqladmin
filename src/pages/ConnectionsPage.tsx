import React, { useEffect } from 'react'
import testDbConnection from '../db'

const ConnectionsPage: React.FunctionComponent = props => {
  useEffect(() => {
    testDbConnection()
  })

  return (
    <div>
      Connections Page Number 4!
      <button>Yay</button>
    </div>
  )
}

export default ConnectionsPage
