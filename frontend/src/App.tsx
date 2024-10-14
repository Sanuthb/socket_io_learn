import { useEffect, useState } from "react";
import { io } from "socket.io-client";


interface clientmessage{
  message: string[];
}

const App = () => {
  const socket = io('http://localhost:3001');
  const [message, setMessage] = useState<string>('');
  const [buttonstatus, setbuttonstatus] = useState<string>('disconnect');
  const [clientMessage, setClientMessage] = useState<clientmessage | undefined>(undefined);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    socket.emit('click', { message: message });
    
  };

  const handleconnection = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(socket.connected){
      setbuttonstatus('disconnect');
      socket.disconnect();
    }else{
      setbuttonstatus('connect');
      socket.connect();
    }
    
  };

  useEffect(() => {
    socket.on('message', (data) => {
      setClientMessage(data)
    });
  }, [socket]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleClick}>click</button>
        <button onClick={handleconnection}>{buttonstatus}</button>

        {clientMessage && 
          <h1>{clientMessage.message}</h1>
        }
      </form>
    </div>
  );
};

export default App;
