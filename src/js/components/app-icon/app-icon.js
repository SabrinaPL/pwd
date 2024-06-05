// attributes for the icon, image and name

const template = document.createElement('template')
template.innerHTML = `
  <div class="app-icon">
    <img src="../images/ai-tutor.jpg" alt="App icon">
    <span class="app-name"></span>
  </div>

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

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
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
