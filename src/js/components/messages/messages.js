/**
 * The memory game component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

import 'emoji-picker-element'
import '../nickname-form/nickname-form.js'
import DOMPurify from 'dompurify'

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
    <div id="form-and-emoji-container">
      <form id="chat-form">
        <input type="text" id="message-input" placeholder="Type a message...">
        <button type="submit" id="send-button">Send</button>
        <button type="emoji" id="emoji-button">😀</button>
        <emoji-picker class="dark"></emoji-picker>
      </form>
    </div>
  </div>
</main>

<style>
  #chat-app {
    height: 100%;
    background-color: #000009;
    color: white;
    border: 1px solid black;
    border-radius: 10px;
    padding: 3rem;
  }

  h2 {
    color: #32CD32;
  }

  .form-and-emoji-container {
    display: flex;
    justify-content: center;
    align-items: left;
  }

  #chat-window {
    height: 30vh;
    overflow-y: scroll;
    padding: 1rem;
    border: 1px solid white;
    border-radius: 10px;
  }

  input {
    font-size: 1.1rem;
    padding: 0.5rem;
    border-radius: 5px;
    margin-right: 0.5rem;
  }

  button {
  font-size: 1.1rem; 
  background-color: white; 
  color: black; 
  padding: 5px; 
  margin-top: 0.5rem; 
  border-radius: 5px; 
  }

  button:active {
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
    #messages
    #emojiBtn
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
      this.#emojiBtn = this.shadowRoot.querySelector('#emoji-button')

      this.#messages = []

      // Hide emoji picker when component is loaded.
      this.#emojiPicker.classList.add('hidden')

      // Check if there is already a username stored in local storage.
      if (localStorage.getItem('username') === null || localStorage.getItem('username') === undefined) {
        // Hide chat window form component.
        this.#chatForm.classList.add('hidden')
      } else {
        // Set the username.
        this.#userName = JSON.parse(localStorage.getItem('username'))

        // Welcome the user.
        const welcomeMessage = document.createElement('p')
        welcomeMessage.textContent = `Welcome back ${this.#userName}!`
        this.shadowRoot.querySelector('#chat-window').appendChild(welcomeMessage)

        // Show chat window form component.
        this.#chatForm.classList.remove('hidden')
      }
    }

    /**
     * Submit message to server.
     *
     * @param {Event} event - The event object.
     */
    #submitMessage (event) {
      event.preventDefault()
      try {
        const message = this.#inputField.value

        // Purify the input from potentially harmful html before sending it   to the server (to prevent XSS-attacks).
        const cleanedMessage = DOMPurify.sanitize(message)

        // Prepare data to send to the server.
        const data = {
          type: 'message',
          data: cleanedMessage,
          username: this.#userName,
          channel: 'my, not so secret, channel',
          key: this.#KEY
        }

        // Send the message to the server.
        this.#socket.send(JSON.stringify(data))

        // Add username and message to messages array as objects.
        this.#messages.push({ username: this.#userName, message: cleanedMessage })

        // Update the messages in the chat window.
        this.#updateMessages()

        // Empty the input field.
        this.#inputField.value = ''
      } catch (error) {
        throw new Error('There was an error sending the message: ' + error)
      }
    }

    /**
     * Method to receive message from server.
     *
     * @param {*} event - The event object.
     */
    #receiveMessage (event) {
      const data = JSON.parse(event.data)

      if (data.username === 'Server' || data.username === 'The Server') {
        // Ignore the messages from the server.
        return
      } else if (data.username === this.#userName) {
        // Ignore the messages from the user.
        return
      }

      // Purify the input from potentially harmful html before appending it to the chat window (to prevent XSS-attacks).
      const cleanedMessage = DOMPurify.sanitize(data.data)
      const cleanedUsername = DOMPurify.sanitize(data.username)

      // Add username and message to messages array as objects.
      this.#messages.push({ username: cleanedUsername, message: cleanedMessage })

      this.#updateMessages()
    }

    /**
     * Method to update the messages in the chat window.
     */
    #updateMessages () {
      // Clear the chat window.
      this.shadowRoot.querySelector('#chat-window').innerHTML = ''

      // Display the last 20 messages in the chat window (code snippet as suggested by copilot to render the messages in the order of newest first).
      for (let i = this.#messages.length - 1; i >= Math.max(0, this.#messages.length - 20); i--) {
        if (this.#messages[i] !== undefined) {
          const messageElement = document.createElement('p')
          messageElement.setAttribute('id', 'reply-message')
          // Code snippet as suggested by copilot to color the messages of the user in red and the messages of other users in blue.
          this.#messages[i].username === this.#userName ? messageElement.style.color = '#ff80c5' : messageElement.style.color = '#8aff9c'
          messageElement.textContent = `${this.#messages[i].username}: ${this.#messages[i].message}`
          this.shadowRoot.querySelector('#chat-window').appendChild(messageElement)
        }
      }
    }

    /**
     * Executed when component has been connected to the DOM.
     */
    connectedCallback () {
      this.#chatForm.addEventListener('submit', this.#submitMessage.bind(this))

      if (localStorage.getItem('username') === null || localStorage.getItem('username') === undefined) {
        // Create nickname form component and append it to the shadow root.
        const nicknameForm = document.createElement('nickname-form')
        this.shadowRoot.getElementById('nickname').appendChild(nicknameForm)

        nicknameForm.addEventListener('nickname-added', event => {
          // Store the username in local storage.
          localStorage.setItem('username', JSON.stringify(event.detail.username))

          // Set the username.
          this.#userName = event.detail.username

          // Show chat window form component.
          this.#chatForm.classList.remove('hidden')

          // Hide nickname form component.
          this.shadowRoot.querySelector('#nickname').classList.add('hidden')
        })
      }

      // Toggle emoji picker when emoji button is clicked.
      this.#emojiBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.#emojiPicker.classList.toggle('hidden')
      })

      // Add emoji to field when clicked.
      this.#emojiPicker.addEventListener('emoji-click', event => {
        this.#inputField.value += event.detail.unicode
      })

      this.#socket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')

      this.#socket.addEventListener('open', () => {
        console.log('Connected to server')
      })
      this.#socket.addEventListener('message', event => {
        this.#receiveMessage(event)
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
      this.#emojiBtn.removeEventListener('click')
    }
  })
