const messages = [
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
];

function addMessageToList(message) {
  const divElement = document.createElement('div');
  divElement.textContent = message.message;
  divElement.classList.add('message-list-item')
  document.getElementById('message-list').appendChild(divElement)
}

for (const message of messages) {
  const divElement = document.createElement('div');
  divElement.textContent = message.message;
  divElement.classList.add('message-list-item')
  document.getElementById('message-list').appendChild(divElement)
}

function addMessage(event) {
  event.preventDefault();
  const textareaElement = document.getElementById('message-form-message');
  if (!textareaElement) {
    return;
  }

  // todo: actually call a backend server and submit the message.

  addMessageToList({ message: textareaElement.value })
  textareaElement.value = ''
}
