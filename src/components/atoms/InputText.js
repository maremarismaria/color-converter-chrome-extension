import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  text-align: center;
  outline:none;
  border: none;
  font-family: 'Segoe UI','Roboto', sans-serif;
  font-weight: 400;
  font-size: 18px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: #ebf0f6;
  ${ props => props.css }
`;

const handler = (valueHandler) => (e) => {
  valueHandler(e.target.value);
};

const InputText = ({text, placeholder, css, valueHandler}) => {
  return <Input
            type={'text'}
            placeholder={placeholder}
            defaultValue={text}
            onChange={handler(valueHandler)}
            style={css}
         />
};

export default InputText;