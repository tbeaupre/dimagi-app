import styled from 'styled-components';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <AppHeader>
        <Form />
      </AppHeader>
    </div>
  );
}

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default App;
