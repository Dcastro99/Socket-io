import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';


const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    console.log('button pressed');
    socket.emit("send-message", { message: { message } });
  };

  useEffect(() => {
    socket.on('receive-message', (data) => {
      setMessageReceived(data.message.message3);
    })
  }, []);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <input placeholder='Message...' onChange={(e) => {
        setMessage(e.target.value);
      }} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>

      {messageReceived}
    </div>
  );
}

export default App;
