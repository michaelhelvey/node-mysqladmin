import styled from 'styled-components'

export const Input = styled.input`
  outline: none;
  border: none;
  padding: 0.7em 1em;
  border-radius: 5px;
  font-size: 14px;
  color: ${props => props.theme.mainText};
  background-color: ${props => props.theme.primaryLighterBackground};

  ::placeholder {
    color: ${props => props.theme.invertedTextLighter};
  }

  :focus {
    background-color: ${props => props.theme.invertedBackground};
    color: ${props => props.theme.invertedText};

    ::placeholder {
      color: ${props => props.theme.secondaryText};
    }
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
  margin: 0.6em 0;
`
