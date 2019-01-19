import styled from 'styled-components';

export const Sticker = styled.div`
  border-radius: 2px;
  height: 40px;
  width: 40px;
  height: 40px;
  width: 90px;
  margin: 6px auto;
  background-color: ${ props => props.backgroundColor || '#FFF'};
  ${ props => props.customStyle }
`;

export default Sticker: