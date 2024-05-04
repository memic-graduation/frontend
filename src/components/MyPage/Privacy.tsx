import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: auto;
    height: 100%;
    flex-direction: column;
    background: #FFFFFF;
    color: #000000;
    border-radius: 20px;
    padding: 30px;
`

function App() {
  return (
    <Container>
      개인정보 수정
    </Container>
  );
}

export default App;