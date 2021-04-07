import axios from 'axios';

function App() {
  const click = () => {
    axios.post('/user', {
      username: 'Test',
      password: 'word',
    });
  };
  return (
    <div className="App">
      This is app <button onClick={click}>click</button>
    </div>
  );
}

export default App;
