import { Button, ScrollView, Text, View, TextInput, ActivityIndicator } from 'react-native';
import React from 'react';

const apiUrl = 'https://full-stack-web-dev.loca.lt';
// const apiUrl = 'http://localhost:3001';

import styles from '../styles/messages';

export default function Messages(props) {
  const [messages, setMessages] = React.useState([]);
  const [messagesError, setMessagesError] = React.useState(null);
  const [newComment, setNewComment] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(function() {
    fetch(`${apiUrl}/messages`).then(function(response) {
      // todo: handle errors if !response.ok

      return response.json();
    })
    .then(function(messageList) {
      setMessages(messageList);
    })
    .catch(function(error) {
      setMessagesError(error.message);
    });
  }, [])

  function onNewCommentChange(text) {
    setNewComment(text);
  }

  function onCommentPress() {
    setSubmitting(true);

    fetch(`${apiUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: newComment }),
    }).then(function(response) {
      // todo: error handling if !response.ok

      return response.json()
    })
    .then(function(createdMessage) {
      setMessages([
        createdMessage,
        ...messages,
      ]);
      setNewComment('');
      setSubmitting(false);
    })
    .catch(function(error) {
      // todo: handle error in promise chain
      setSubmitting(false);
    });
  }

  return (
    <ScrollView>
      <Text>Messages</Text>
      <TextInput style={styles.textInput} multiline value={newComment} onChangeText={onNewCommentChange} />
      <Button title="Comment" onPress={onCommentPress} />
      {submitting && <ActivityIndicator />}
      {messagesError && <Text style={styles.errorMessage}>Failed to retrieve messages: {messagesError}</Text>}
      {messages.map(function(message) {
        return (
          <View key={message.id} style={styles.messageContainer}>
            <Text>{message.body}</Text>
          </View>
        )
      })}
    </ScrollView>
  );
}
