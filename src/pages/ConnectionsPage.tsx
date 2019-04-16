import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../reducers'
import { DatabaseConnection } from '../reducers/databases'
import { saveConnection } from '../actions/connections'
import db from '../db'
import { AppSidebar, SidebarHeader } from '../components/containers'
import { H1 } from '../components/typography'
import CreateConnectionForm, {
  IConnectionForm,
} from '../components/ConnectionForm'

const DefaultConnectionFormState: IConnectionForm = {
  connectionName: 'New Connection',
  host: '127.0.0.1',
  username: '',
  password: '',
  database: '',
  port: 3306,
}

const mapStateToProps = (state: AppState) => ({
  formByConnectionName: (connectionName: string) =>
    state.databases.connections.filter(
      db => db.connectionName === connectionName
    )[0],
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveConnection: (form: DatabaseConnection) => dispatch(saveConnection(form)),
})

interface IConnectionsPageProps {
  formByConnectionName: (
    connectionName: string
  ) => DatabaseConnection | undefined
}

interface IConnectionsPageState {
  loadingConnection: boolean
  form: IConnectionForm
  errorMessage: string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ConnectionsPage extends React.Component<
    IConnectionsPageProps,
    IConnectionsPageState
  > {
    constructor(props: IConnectionsPageProps) {
      super(props)
      this.onSubmitConnection = this.onSubmitConnection.bind(this)
      this.updateForm = this.updateForm.bind(this)

      this.state = {
        loadingConnection: false,
        form: DefaultConnectionFormState,
        errorMessage: '',
      }
    }

    updateForm(newForm: IConnectionForm) {
      this.setState(state => ({
        ...state,
        form: newForm,
      }))
    }

    recordConnectionAndNavigate() {
      // at this point we know that the form is valid, so just save it
    }

    async onSubmitConnection(form: IConnectionForm) {
      this.setState(state => ({
        ...state,
        errorMessage: '',
        loadingConnection: true,
      }))
      // first of all, just do some basic error checking
      // check that all fields have a value
      for (let key of Object.keys(form)) {
        if (
          (typeof (form as any)[key] === 'string' &&
            !(form as any)[key].length) ||
          !(form as any)[key]
        ) {
          this.setState(state => ({
            ...state,
            loadingConnection: false,
            errorMessage: 'All fields are required.',
          }))
          return
        }
      }

      // finally, go ahead and create the connection
      try {
        await db.createConnection({
          user: form.username as string,
          password: form.password as string,
          host: form.host as string,
          database: form.database as string,
          port: form.port as number,
        })
        this.recordConnectionAndNavigate()
      } catch (e) {
        this.setState(state => ({
          ...state,
          loadingConnection: false,
          errorMessage: `Received response from Node.js MySQL Driver: ${JSON.stringify(
            e
          )}`,
        }))
      }
    }

    render() {
      return (
        <div className="flex h-full">
          <AppSidebar>
            <SidebarHeader>
              <H1>Saved Connections</H1>
            </SidebarHeader>
          </AppSidebar>
          <div className="flex flex-col justify-center items-center w-full">
            <CreateConnectionForm
              onSubmitConnection={this.onSubmitConnection}
              isLoading={this.state.loadingConnection}
              form={this.state.form}
              setForm={this.updateForm}
              errorMessage={this.state.errorMessage}
            />
          </div>
        </div>
      )
    }
  }
)
