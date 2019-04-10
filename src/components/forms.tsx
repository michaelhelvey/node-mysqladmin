import styled from 'styled-components'

export const Input = styled.input`
  outline: none;
  border: none;
  padding: 0.7em 1em;
  border-radius: 5px;
  font-size: 14px;
  color: ${props => props.theme.secondaryText};
  background-color: ${props => props.theme.primaryLighterBackground};

  ::placeholder {
    color: ${props => props.theme.secondaryText};
  }

  :focus {
    background-color: ${props => props.theme.invertedBackground};
    color: ${props => props.theme.invertedText};
  }
`

export const Label = styled.label`
  color: ${props => props.theme.secondaryText};
  margin-right: 1em;
  font-size: 14px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`
