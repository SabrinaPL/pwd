// Implement previous nickname component?
// Escape input for security.
// Display messages in chat window.
// Dynamically add messages to chat window.
// Array to store the messages received and sent so that they can be displayed in the chat window in the correct order, 20 messages have to be visible at a time (scrollable is OK).

import 'emoji-picker-element'
import '../nickname-form/nickname-form.js'

const template = document.createElement('template')
template.innerHTML = `
<main id="chat-app">
  <h2>Chat with your buddies in realtime</h2>
  <div id="nickname">
    <!-- Nickname form goes here -->
  </div>
  <div id="chat-container">
    <div id="chat-window">
      <!-- Chat messages go here -->
    </div>
    <form id="chat-form">
      <input type="text" id="message-input" placeholder="Type a message...">
      <emoji-picker class="light"></emoji-picker>
      <button type="submit" id="send-button">Send</button>
    </form>
</main>

<style>
  #chat-app {
    width: 100%;
    height: 100%;
  }

  .btn {
  font-size: 1.1rem; 
  background-color: #FF66B3; 
  color: white; 
  padding: 5px; 
  margin-top: 0.5rem; 
  border-radius: 5px; 
  }

  .btn:active {
  background-color: #42BFDD;  
  }

  .hidden {
    display: none;
  }
</style>
`
customElements.define('chat-app',
  /** Messages class.
   *
   */
  class extends HTMLElement {
    #socket
    #chatForm
    #inputField
    #emojiPicker
    #userName
    #KEY = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'

    /**
     * Constructor to invoke super class and attach component to shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#chatForm = this.shadowRoot.querySelector('#chat-form')
      this.#inputField = this.shadowRoot.querySelector('#message-input')
      this.#emojiPicker = this.shadowRoot.querySelector('emoji-picker')

      // Hide emoji picker when component is loaded.
      this.#emojiPicker.classList.add('hidden')

      // Hide chat window form component is loaded.
      this.#chatForm.classList.add('hidden')
    }

    /**
     * Submit message to server.
     *
     * @param {Event} event - The event object.
     */
    #submitMessage (event) {
      event.preventDefault()

      const message = this.#inputField.value

      // Send message to server.
      const data = {
        type: 'message',
        data: message,
        username: this.#userName,
        channel: 'Buddy Chat',
        key: this.#KEY
      }

      // Send the message to the server.
      this.#socket.send(JSON.stringify(data))

      // Empty the input field.
      this.#inputField.value = ''
    }

    /**
     * Executed when component has been connected to the DOM.
     */
    connectedCallback () {
      this.#chatForm.addEventListener('submit', this.#submitMessage.bind(this))

      // Create nickname form component and append it to the shadow root.
      const nicknameForm = document.createElement('nickname-form')
      this.shadowRoot.getElementById('nickname').appendChild(nicknameForm)

      nicknameForm.addEventListener('nickname-added', event => {
        this.#userName = event.detail.username
        this.#chatForm.classList.remove('hidden')
        this.shadowRoot.querySelector('#nickname').classList.add('hidden')
      })

      // Toggle emoji picker when input field is clicked.
      this.#inputField.addEventListener('click', () => {
        this.#emojiPicker.classList.toggle('hidden')
      })

      // Add emoji to input field when clicked.
      this.#emojiPicker.addEventListener('emoji-click', event => {
        this.#inputField.value += event.detail.unicode
      })

      this.#socket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')

      this.#socket.addEventListener('open', () => {
        console.log('Connected to server')
      })
      this.#socket.addEventListener('message', event => {
        console.log('Message from server: ', event.data)
      }
      )
    }

    /**
     * Executed when component has been disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
      console.log('Socket connection closed')
      this.#chatForm.removeEventListener('submit', this.#submitMessage)
      this.#inputField.removeEventListener('click')
      this.#emojiPicker.removeEventListener('emoji-click')
    }
  })
