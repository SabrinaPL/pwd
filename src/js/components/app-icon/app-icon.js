/**
 * The app icon component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <button class="app-icon">
    <img src="" alt="App icon"><!-- app icon goes here -->
    <span class="app-name"><!-- app name goes here --></span>
  </button>

  <style>
    .app-icon {
      width: 130px;
      height: 130px;
      background-color: rgba(255,255,255,0.5);
      border-radius: 25%;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 12px;
    }

    .app-name {
      margin-top: 0.5rem;
      font-size: 1rem;
    }

    img {
      width: 90px;
      height: 90px;
      border-radius: 25%;
      transition: transform 0.5s;
    }

    img:hover {
      transform: scale(1.1);
      transition: transform 0.5s;
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
     * Method to observe attributes.
     *
     * @returns {string[]} - The name and image of the app.
     */
    static get observedAttributes () {
      return ['name', 'image']
    }

    /**
     * Method to update the component when attributes change.
     *
     * @param {string} name - The name of the app.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'name') {
        this.shadowRoot.querySelector('.app-name').textContent = newValue
      } else if (name === 'image') {
        this.shadowRoot.querySelector('img').src = newValue
      }
    }

    /**
     * Method to open an app.
     *
     */
    #openApp () {
      this.dispatchEvent(new CustomEvent('openApp', {
        detail: {
          app: this.getAttribute('name')
        }
      }))
    }
  })
