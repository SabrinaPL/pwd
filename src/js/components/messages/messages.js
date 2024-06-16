// Implement previous nickname component?
// Escape input for security.
// Emoji support.

import 'emoji-picker-element'

const template = document.createElement('template')
template.innerHTML = `
<main id="chat-app">
  <h2>Language Exchange Chat</h2>
  <div id="chat-container">
    <div id="chat-window">
      <div class="message received">
        <div class="message-content"></div>
      </div>
      <div class="message sent">
        <div class="message-content"></div>
      </div>
    </div>
    <form id="chat-form">
      <input type="text" id="message-input" placeholder="Type a message...">
      <emoji-picker class="light"></emoji-picker>
      <button type="submit" id="send-button">Send</button>
    </form>
</main>

<style>
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
    }

    /**
     * Executed when component has been connected to the DOM.
     */
    connectedCallback () {
      this.#chatForm.addEventListener('submit', event => {
        const message = this.shadowRoot.querySelector('#message-input').value
        console.log('Message: ', message)
        // Empty the input field.
        this.#inputField.value = ''
        event.preventDefault()
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

      const data = {
        type: 'message',
        data: 'message',
        username: 'user',
        channel: 'Language Exchange Chat',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      this.#socket.addEventListener('open', () => {
        this.#socket.send(JSON.stringify(data))
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
    }
  })
