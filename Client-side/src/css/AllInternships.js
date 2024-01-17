import styled from 'styled-components';

const Wrapper = styled.section`
#map {
  width: 100%;
  height: 80vh;
}
 
.sidebar {
  display:flex;
  justify-content: center;
  align-items:center ;
  text-align: center;
  width:100%;
  height: 5vh;
  background-color: rgb(35 55 75 / 90%);
  color: #fff;
  font-family: monospace;
  font-size: 2rem;
  z-index: 1;
  position: static;
  top: 0;
  left: 0;
  border-radius: 4px;
  }
`;

export default Wrapper;
