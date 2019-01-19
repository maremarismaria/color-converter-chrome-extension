import React from 'react';
import styled from 'styled-components';
import CopyIcon from './CopyIcon';

const ButtonElement = styled.button`
  min-width: min-content;
  width: 100%;
  background-color: #AE0000;
  color: #FFF;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;

    &:active {
      transform: translateY(2px);
    }
    
    & > label {
      align-items: center;
      display: flex;
      flex-wrap: nowrap;
      font-family: 'Segoe UI','Roboto', sans-serif;
      font-weight: 400;
      font-size: 18px;
      justify-content: center;
      cursor: pointer;
    }
    
  ${props => props.css}
`;

const onClickHandler = (handler) => e => handler(e);

const CopyButton = (props) => {
  const {css, text, handler} = props;
  return <ButtonElement
            css={css}
            onClick={onClickHandler(handler)}
         >
          <label>
            <CopyIcon/>
            {text}
          </label>
         </ButtonElement>
};

export default CopyButton;