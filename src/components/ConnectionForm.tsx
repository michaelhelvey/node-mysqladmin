import React from 'react'
import styled from 'styled-components'
import { Input, Label, InputContainer } from './forms'
import { H1 } from './typography'

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  padding: 2em;
`

const HorizontalAlignedLabel = styled(Label)`
  display: flex;
  justify-content: flex-end;
  width: 4em;
`

export default () => (
  <StyledFormContainer className="flex flex-col justify-center items-center">
    <H1 style={{ paddingBottom: '2em' }}>Create Connection</H1>
    <form>
      <InputContainer>
        <HorizontalAlignedLabel>Username:</HorizontalAlignedLabel>
        <Input className="font-monospace" placeholder="Username" />
      </InputContainer>
      <InputContainer>
        <HorizontalAlignedLabel>Password:</HorizontalAlignedLabel>
        <Input
          className="font-monospace"
          placeholder="•••••••••••"
          type="password"
        />
      </InputContainer>
    </form>
  </StyledFormContainer>
)
