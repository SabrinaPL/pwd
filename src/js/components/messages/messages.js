// Message windows.
// Websocket.io for real-time communication.
// Implement previous nickname component?
// Escape input for security.
// Emoji support.

// Import socket.io client

const template = document.createElement('template')
template.innerHTML = `
<main id="chat-app">
  <h2>Language Chat</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.</p>
</main>

<style></style>
`
customElements.define('chat-app',
  /** Messages class.
   *
   */
  class extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  })
