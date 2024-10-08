import React, { useEffect, useState } from 'react';

import './messages.css';

function Messages() {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('hello');
  const [postsError, setPostsError] = useState(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [submissionError, setSubmissionError] = useState(null);

  useEffect(function() {
    fetch('http://localhost:3001/messages').then(function(response) {
      // todo: check if response is actually OK
      // if (!response.ok) {
      //   throw new Error(...)
      // }

      return response.json();
    }).then(function(posts) {
      setMessages(posts);
      setPostsLoading(false);
    }).catch(function(error) {
      // todo: error handling
      setPostsError(error.message);
      setPostsLoading(false);
    });
  }, [])

  function onMessageChange(event) {
    setNewMessage(event.target.value);
  }
  function addMessage(event) {
    event.preventDefault();

    fetch('http://localhost:3001/messages', {
      method: 'POST',
      body: JSON.stringify({
        body: newMessage,
        // body: 'something...',
        // ...
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
      // todo: error handling...
      if (!response.ok) {
        throw new Error('Failed to submit post:')
      }

      return response.json();
    }).then(function(createdPost) {
      setMessages([
        createdPost,
        ...messages,
      ]);
      setNewMessage('');
    }).catch(function(error) {
      // todo: handle the error. Maybe set a state message...
      console.error(error);
      setSubmissionError(error.message);
    })

  }
  return (
    <>
      <h1>Message Board</h1>
      <form onSubmit={addMessage}>
        <textarea name="message" id="message-form-message" value={newMessage} onChange={onMessageChange}></textarea>
        <button type="submit">Write Message</button>
        {submissionError && <div>Failed to submit post: {submissionError}</div>}
      </form>
      {postsError && <div>Error: {postsError}</div>}
      {postsLoading && <div>Loading...</div>}
      <div id="message-list" className="message-list">
        {messages.map(function(message) {
          return (
            <div className="message-list-item" key={message.id}>
              {message.body}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Messages;
