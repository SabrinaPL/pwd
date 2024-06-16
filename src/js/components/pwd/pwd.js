// should it be possible to change desktop background? (maybe a settings icon that opens a settings window where the user can change the background image?)

// which responsibilities should the desktop have?
// display icons
// display window on click
// close window on click (desktop listens to close event sent from window)
// (minimize window on click)
// move window on click and drag
// change background image (right click on desktop to open settings window)
// mac os styling?

// array of applications (app name and icon)
// another array of currently run applications
// pros of rendering the icons dynamically: easy to add new applications
// in the connectedCallback the icons should be rendered dynamically when the desktop is connected to the DOM

const template = document.createElement('template')
template.innerHTML = `
  <main id="pwd">
  <div id="desktop-wrapper">
      <!-- app windows should be rendered here -->
    <div id="topbar">
      <!-- running apps should be rendered here -->
    </div>
    <div id="apps-container">
      <!-- app icons should be rendered here -->
    </div>
  </div>
  </main>

  <style>
    #pwd {
      width: 100vw;
      height: 100vh;
      background-color: #C49BBB;
      background-image: url('../../images/desktop-background.jpg');
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 5px;
    }

    #desktop-wrapper {
      position: relative;
      height: 100%;
      width: 100%;
    }

    #apps-container {
      position: absolute;
      display: flex;
      gap: 1rem;
      bottom: 1rem;
      left: 50%; 
      transform: translateX(-50%);
      background-color: rgba(255,255,255,0.5);
      border-radius: 10px;
      padding: 1rem;
      min-width: 50%;
      justify-content: center;
    }

    app-window:focus {
      border: 2px solid black;
      z-index: 1;
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;  
    }

  </style>
`
/**
 * Custom component representing a pwd (personal web desktop).
 *
 */
customElements.define('personal-web-desktop',
  /**
   * PWD class.
   */
  class extends HTMLElement {
    #apps
    #appsContainer
    #desktopWrapper
    #runningApps
    #currentApp

    /**
     * Constructor to invoke super class and attach component to shadow DOM.
     */
    constructor () {
      super()

      this.attachShadow({
        mode: 'open'
      })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Executed when component has been connected to the DOM.
     */
    connectedCallback () {
      this.#desktopWrapper = this.shadowRoot.querySelector('#desktop-wrapper')
      this.#appsContainer = this.shadowRoot.querySelector('#apps-container')
      this.#apps = [
        { name: 'Kanji Memory', image: '../../images/kanji9.png' },
        { name: 'AI Translator', image: '../../images/ai-tutor.jpg' },
        { name: 'Language Chat', image: '../../images/language-exchange.webp' }
      ]

      this.#runningApps = []

      // Render the app icons when the component is connected to the DOM
      this.#renderAppIcons()
    }

    /**
     * Method to render the app icons.
     */
    async #renderAppIcons () {
      await import('../app-icon/app-icon')

      this.#apps.forEach(app => {
        const appIcon = document.createElement('app-icon')
        appIcon.setAttribute('name', app.name)
        appIcon.setAttribute('image', app.image)
        appIcon.addEventListener('click', () => this.#openSelectedApp(app.name))
        this.#appsContainer.appendChild(appIcon)
      })
    }

    /**
     * Method to render the selected app.
     *
     * @param {*} app - The app to render.
     */
    #renderApp (app) {
      const appWindow = document.createElement('app-window')
      appWindow.setAttribute('id', app.id)
      appWindow.setAttribute('name', app.name)
      appWindow.setAttribute('tabIndex', '0')

      // Create the app content based on the app name
      let appContent

      if (app.name === 'Kanji Memory Game') {
        appContent = document.createElement('memory-game')
      } else if (app.name === 'AI Translator') {
        appContent = document.createElement('ai-translator')
      } else if (app.name === 'Language Chat') {
        appContent = document.createElement('chat-app')
      }

      // If the app content exists, append it to the app window
      if (appContent) {
        appContent.slot = 'app'
        appWindow.appendChild(appContent)
      }

      // Add app title and append the app window to the desktop
      const title = document.createElement('span')
      title.slot = 'app-title'
      title.textContent = app.name
      appWindow.appendChild(title)

      this.#desktopWrapper.appendChild(appWindow)

      appWindow.addEventListener('close-app', () => this.#closeSelectedApp(app.id))
      appWindow.addEventListener('click', () => {
        this.#currentApp = appWindow
      })

      appWindow.focus()
    }

    /**
     * Method to render the running apps in a window component.
     *
     */
    #renderRunningApps () {
      this.#runningApps.forEach(app => {
        this.shadowRoot.querySelector('#topbar').innerHTML = ''
        this.#renderApp(app)
      })
    }

    /**
     * Method to open the selected app.
     *
     * @param {string} appName - The name of the app to open.
     */
    async #openSelectedApp (appName) {
      // Lazy load the components
      await import('../window/window')
      if (appName === 'Kanji Memory') {
        await import('../memory-game/memory-game')
        // Date.valueOf is used to generate a unique id for the app
        const memoryApp = { id: new Date().valueOf(), name: 'Kanji Memory Game' }
        this.#renderApp(memoryApp)
        this.#runningApps.push(memoryApp)
      }
      if (appName === 'AI Translator') {
        await import('../ai-translator/ai-translator')

        const aiTranslator = { id: new Date().valueOf(), name: 'AI Translator' }
        this.#renderApp(aiTranslator)
        this.#runningApps.push(aiTranslator)
      }
      if (appName === 'Language Chat') {
        await import('../messages/messages')

        const chatApp = { id: new Date().valueOf(), name: 'Language Chat' }
        this.#renderApp(chatApp)
        this.#runningApps.push(chatApp)
      }
    }

    /**
     * Method to remove the selected app from running apps.
     *
     * @param {string} windowId - The id of the window to remove.
     */
    #closeSelectedApp (windowId) {
      // Find the app in the running apps array and remove it.
      const appIndex = this.#runningApps.findIndex(app => app.id === windowId)
      this.#runningApps.splice(appIndex, 1)
    }

    /**
     * Disconnect event listeners when component is disconnected from DOM.
     */
    disconnectedCallback () {
      this.removeEventListener('open-app', (event) => this.#openSelectedApp(event.detail))
      this.removeEventListener('close-app', () => this.#closeSelectedApp())
    }
  })
