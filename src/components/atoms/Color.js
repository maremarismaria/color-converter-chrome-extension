import styled from "styled-components";

export const Color = styled.div`
  border-radius: 100%;
  height: 40px;
  width: 40px;
  background-color: ${ props => props.backgroundColor || '#FFF'};
  ${ props => props.customStyle }
`;

export default Color;