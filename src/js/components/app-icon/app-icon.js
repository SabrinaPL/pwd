// attributes for the icon, image and name

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .app-icon {
      width: 100px;
      height: 100px;
      background-color: #f5e9ee;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  </style>
`
/**
 * Custom component representing an app icon.
 *
 *
 */
customElements.define('app-icon',
/** App icon class.
 *
 */
  class extends HTMLElement {
    #appIcon

    /**
     * Constructor to invoke super class and attach component to shadow DOM.
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Event listeners added when component is connected to DOM.
     */
    connectedCallback () {
      this.#appIcon = this.shadowRoot.querySelector('.app-icon')
      this.#appIcon.addEventListener('click', () => this.#openApp())
    }

    /**
     * Method to open an app.
     *
     */
    #openApp () {
      // dispatch open app event
    }
  })
