import logo from './logo.svg';
import './App.css';
import React from 'react';
import './messages.css';

function Messages() {
  const [messages, setMessages] = React.useState([
    {
      id: '1',
      message:'Hello World'
    },
    {
      id: '2',
      message: 'Another Message'
    },
    {
      id: '3',
      message: 'Hey!!!'
    }
  ]);
  const [newMessage, setNewMessage] = React.useState('hello');

  function onMessageChange(event) {
    setNewMessage(event.target.value);
  }
  function addMessage(event) {
    event.preventDefault();
    setMessages([
      {
        message: newMessage
      },
      ...messages,
    ]);
    setNewMessage('');
  }
  return (
    <>
      <h1>Message Board</h1>
      <form onSubmit={addMessage}>
        <textarea name="message" id="message-form-message" value={newMessage} onChange={onMessageChange}></textarea>
        <button type="submit">Write Message</button>
      </form>
      <div id="message-list" class="message-list">
        {messages.map(function(message) {
          return (
            <div className="message-list-item" key={message.id}>
              {message.message}
            </div>
          );
        })}
      </div>
    </>
  );
}

function App() {
  return (
    <div>
      <Messages />
    </div>
  );
}

export default App;
