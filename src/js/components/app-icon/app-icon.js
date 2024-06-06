const template = document.createElement('template')
template.innerHTML = `
  <div class="app-icon">
    <img src="" alt="App icon">
    <span class="app-name"></span>
  </div>

  <style>
    .app-icon {
      width: 100px;
      height: 100px;
      background-color: rgba(255,255,255,0.5);
      border-radius: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    img {
      width: 90px;
      height: 90px;
      border-radius: 25%;
    }

    img:hover {
      transform: scale(1.1);
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
