import React from 'react'
import styled from 'styled-components'
import { Input, Label, InputContainer } from './forms'
import { H1 } from './typography'

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  padding: 2em;
  border-radius: 8px;
`

const HorizontalAlignedLabel = styled(Label)`
  display: flex;
  justify-content: flex-end;
  width: 8em;
  white-space: nowrap;
`

const SubmitButton = styled.button`
  background-color: ${props => props.theme.highlightColor};
  border: none;
  outline: none;
  color: ${props => props.theme.mainText};
  font-size: 13px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.6em 3em;
  width: 100%;
  margin-top: 1em;
`

export default () => (
  <StyledFormContainer className="flex flex-col justify-center items-center">
    <H1 style={{ paddingBottom: '1em' }}>Create Connection</H1>
    <form>
      <InputContainer>
        <HorizontalAlignedLabel>Connection Name:</HorizontalAlignedLabel>
        <Input className="font-monospace" placeholder="New Connection" />
      </InputContainer>
      <div
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
          margin: '1.4em 0',
        }}
      />
      <InputContainer>
        <HorizontalAlignedLabel>MySQL Host:</HorizontalAlignedLabel>
        <Input className="font-monospace" placeholder="127.0.0.1" />
      </InputContainer>
      <InputContainer>
        <HorizontalAlignedLabel>Username:</HorizontalAlignedLabel>
        <Input className="font-monospace" placeholder="username" />
      </InputContainer>
      <InputContainer>
        <HorizontalAlignedLabel>Password:</HorizontalAlignedLabel>
        <Input
          className="font-monospace"
          placeholder="•••••••••••"
          type="password"
        />
      </InputContainer>
      <InputContainer>
        <HorizontalAlignedLabel>Database:</HorizontalAlignedLabel>
        <Input className="font-monospace" placeholder="database" />
      </InputContainer>
      <InputContainer>
        <HorizontalAlignedLabel>Port:</HorizontalAlignedLabel>
        <Input className="font-monospace" placeholder="3006" />
      </InputContainer>
    </form>
    <SubmitButton type="submit">Connect</SubmitButton>
  </StyledFormContainer>
)
