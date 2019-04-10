import styled from 'styled-components'

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  background-color: ${props => props.theme.primaryBackground};
`

export const AppSidebar = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  width: 20%;
  height: 100%;
`

export const SidebarHeader = styled.div`
  background-color: ${props => props.theme.tertiaryBackground};
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1em;
  margin: 1em 0;
`
