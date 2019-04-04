import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { AppState } from '../reducers'
import { DatabaseConnection } from '../reducers/databases'

const mapStateToProps = (state: AppState) => ({
  isCurrentlyConnected: !!state.databases.metadata.activeConnection,
  activeConnection: state.databases.metadata.activeConnection,
})

interface ConnectionsRouteProps extends RouteProps {
  OriginalComponent: (props: any) => JSX.Element
  activeConnection: DatabaseConnection | null
  isCurrentlyConnected: boolean
}

const ConnectionsRoute: React.FunctionComponent<ConnectionsRouteProps> = ({
  OriginalComponent,
  isCurrentlyConnected,
  activeConnection,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isCurrentlyConnected ? (
          <Redirect
            to={`/databases/${(activeConnection as DatabaseConnection).name}`}
          />
        ) : (
          <OriginalComponent {...props} />
        )
      }
    />
  )
}

export default connect(mapStateToProps)(ConnectionsRoute)
