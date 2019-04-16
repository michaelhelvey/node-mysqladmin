import React, { useState } from 'react'
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
  opacity: ${props => (props.disabled ? 0.75 : 1)};
  border: none;
  outline: none;
  color: ${props => props.theme.mainText};
  font-size: 13px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.6em 3em;
  display: inline-block;
  margin-top: 1em;
`

const ErrorBox = styled.div`
  background-color: ${props => props.theme.defaultErrorColor};
  border-radius: 5px;
  padding: 0.6em 3em;
  font-size: 13px;
  white-space: normal;
  word-break: break-word;
  max-width: 20em;
  color: ${props => props.theme.mainText};
`

export interface IConnectionForm {
  connectionName?: string
  host?: string
  username?: string
  password?: string
  database?: string
  port?: number
}

export interface IConnectionFormProps {
  onSubmitConnection: (form: any) => void
  form: IConnectionForm
  setForm: (form: IConnectionForm) => void
  isLoading: boolean
  errorMessage: string
}

export default ({
  onSubmitConnection,
  form,
  setForm,
  isLoading,
  errorMessage,
}: IConnectionFormProps) => {
  return (
    <StyledFormContainer className="flex flex-col justify-center items-center">
      <H1 style={{ paddingBottom: '1em' }}>Create Connection</H1>
      <form
        className="flex flex-col"
        onSubmit={e => {
          e.preventDefault()
          onSubmitConnection(form)
        }}
      >
        <InputContainer>
          <HorizontalAlignedLabel>Connection Name:</HorizontalAlignedLabel>
          <Input
            className="font-monospace"
            placeholder="New Connection"
            value={form.connectionName}
            onChange={e => setForm({ ...form, connectionName: e.target.value })}
          />
        </InputContainer>
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
            margin: '1.4em 0',
          }}
        />
        <InputContainer>
          <HorizontalAlignedLabel>MySQL Host:</HorizontalAlignedLabel>
          <Input
            className="font-monospace"
            placeholder="127.0.0.1"
            value={form.host}
            onChange={e => setForm({ ...form, host: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <HorizontalAlignedLabel>Username:</HorizontalAlignedLabel>
          <Input
            className="font-monospace"
            placeholder="username"
            name="username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <HorizontalAlignedLabel>Password:</HorizontalAlignedLabel>
          <Input
            className="font-monospace"
            name="password"
            placeholder="•••••••••••"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <HorizontalAlignedLabel>Database:</HorizontalAlignedLabel>
          <Input
            className="font-monospace"
            placeholder="database"
            value={form.database}
            onChange={e => setForm({ ...form, database: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <HorizontalAlignedLabel>Port:</HorizontalAlignedLabel>
          <Input
            className="font-monospace"
            placeholder="3006"
            type="number"
            value={form.port}
            onChange={e => setForm({ ...form, port: Number(e.target.value) })}
          />
        </InputContainer>
        <ErrorBox
          style={{
            display: !!errorMessage.length ? 'inline-block' : 'none',
          }}
          className={'justify-center items-center'}
        >
          {errorMessage}
        </ErrorBox>
        <SubmitButton disabled={isLoading} type="submit">
          {isLoading ? 'Connecting...' : 'Connect'}
        </SubmitButton>
      </form>
    </StyledFormContainer>
  )
}
