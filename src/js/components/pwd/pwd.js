/**
 * The pwd component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <main id="pwd">
  <div id="desktop-wrapper">
      <!-- app windows should be rendered here -->
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
    #pwd
    #apps
    #appsContainer
    #desktopWrapper
    #runningApps
    #currentApp
    #desktopBackgrounds

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
      this.#pwd = this.shadowRoot.querySelector('#pwd')
      this.#desktopBackgrounds = []

      // Generate desktop background images.
      for (let i = 0; i <= 6; i++) {
        this.#desktopBackgrounds.push(`desktop-background${i}.jpg`)
      }

      // Set the desktop background image and change it on right click.
      this.#pwd.style.backgroundImage = `url(${this.#generatePath(this.#desktopBackgrounds[0])})`
      this.#pwd.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        this.#changeBackground()
      })

      this.#apps = [
        { name: 'Kanji Memory', image: this.#generatePath('kanji9.png') },
        { name: 'AI Translator', image: this.#generatePath('ai-tutor.jpg') },
        { name: 'Buddy Chat', image: this.#generatePath('language-exchange.webp') }
      ]

      this.#runningApps = []

      // Render the app icons when the component is connected to the DOM
      this.#renderAppIcons()
    }

    /**
     * Method to render the app icons.
     */
    async #renderAppIcons () {
      await import('../app-icon/app-icon.js')

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
      const appId = `app-${app.id}`
      appWindow.setAttribute('id', appId)
      appWindow.setAttribute('name', app.name)
      appWindow.setAttribute('tabIndex', '0')

      // Create the app content based on the app name
      let appContent

      if (app.name === 'Kanji Memory Game') {
        appContent = document.createElement('memory-game')
      } else if (app.name === 'AI Translator') {
        appContent = document.createElement('ai-translator')
      } else if (app.name === 'Buddy Chat') {
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
      appWindow.addEventListener('move-window', (event) => this.#appOutOfBounds(event))

      appWindow.focus()
    }

    /**
     * Method to randomly change the desktop background image.
     */
    #changeBackground () {
      // Set a new random background image.
      const nextBackground = this.#desktopBackgrounds[Math.floor(Math.random() * this.#desktopBackgrounds.length + 1)]

      // Set the new background image
      this.#pwd.style.backgroundImage = `url(${this.#generatePath(nextBackground)})`
    }

    /**
     * Method to open the selected app.
     *
     * @param {string} appName - The name of the app to open.
     */
    async #openSelectedApp (appName) {
      // Lazy load the components
      await import('../window/window.js')
      if (appName === 'Kanji Memory') {
        await import('../memory-game/memory-game.js')
        // Date.valueOf is used to generate a unique id for the app
        const memoryApp = { id: new Date().valueOf(), name: 'Kanji Memory Game' }
        this.#renderApp(memoryApp)
        this.#runningApps.push(memoryApp)
      }
      if (appName === 'AI Translator') {
        await import('../ai-translator/ai-translator.js')

        const aiTranslator = { id: new Date().valueOf(), name: 'AI Translator' }
        this.#renderApp(aiTranslator)
        this.#runningApps.push(aiTranslator)
      }
      if (appName === 'Buddy Chat') {
        await import('../messages/messages.js')

        const chatApp = { id: new Date().valueOf(), name: 'Buddy Chat' }
        this.#renderApp(chatApp)
        this.#runningApps.push(chatApp)
      }
    }

    /**
     * Method to generate the path to the module.
     *
     * @param {*} filename - The name of the file.
     * @returns {string} The path to the module.
     */
    #generatePath (filename) {
      // Get the path to the module (as shown in lectures).
      const pathToModule = import.meta.url

      // Set new path.
      return new URL(`./images/${filename}`, pathToModule)
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
     * Method to prevent window from moving outside the desktop boundaries.
     *
     * @param {*} event - The event object.
     */
    #appOutOfBounds (event) {
      const newLeft = event.detail.newLeft
      const newTop = event.detail.newTop

      // Get the desktop's bounding rectangle (as suggested by chatGPT).
      const desktopRect = this.#desktopWrapper.getBoundingClientRect()

      // Select the window that is being moved with the window id.
      const app = this.shadowRoot.querySelector(`#${event.detail.id}`)

      // Get the window's bounding rectangle.
      const appRect = app.getBoundingClientRect()

      const windowWidth = appRect.width
      const windowHeight = appRect.height

      let constrainedLeft = newLeft
      let constrainedTop = newTop

      // Check if the window is within the desktop's boundaries.
      // Constrain the new left position.
      if (constrainedLeft < desktopRect.left) {
        constrainedLeft = desktopRect.left
      } else if (constrainedLeft + windowWidth > desktopRect.right) {
        constrainedLeft = desktopRect.right - windowWidth
      }

      // Constrain the new top position.
      if (constrainedTop < desktopRect.top) {
        constrainedTop = desktopRect.top
      } else if (constrainedTop + windowHeight > desktopRect.bottom) {
        constrainedTop = desktopRect.bottom - windowHeight
      }

      // Update the window's position.
      app.style.left = `${constrainedLeft}px`
      app.style.top = `${constrainedTop}px`
    }

    /**
     * Disconnect event listeners when component is disconnected from DOM.
     */
    disconnectedCallback () {
      this.removeEventListener('open-app', (event) => this.#openSelectedApp(event.detail))
      this.removeEventListener('close-app', () => this.#closeSelectedApp())
      this.removeEventListener('move-window', (event) => this.#appOutOfBounds(event))
    }
  })
