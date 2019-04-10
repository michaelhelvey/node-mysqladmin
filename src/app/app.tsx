import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import configureStore from '../store'
import ConnectionsPage from '../pages/ConnectionsPage'
import ConnectionsRoute from './ConnectionsRoute'
import { ThemeProvider } from 'styled-components'
import { AppContainer } from '../components/containers'
import defaultTheme from '../themes/default'

const { store, persistor } = configureStore()

const NotFound: React.FunctionComponent = props => <div>Not Found</div>

const App: React.FunctionComponent = props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={defaultTheme}>
        <AppContainer>
          <Router>
            <Switch>
              <ConnectionsRoute
                exact
                path="/"
                OriginalComponent={ConnectionsPage}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </AppContainer>
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

export default App
