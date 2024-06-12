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

import '../app-icon/app-icon'
import '../window/window'

const template = document.createElement('template')
template.innerHTML = `
  <main id="pwd">
  <div id="desktop-wrapper">
    <div id="apps-container">
      <!-- app icons should be rendered here -->
    </div>
      <!-- app window should be rendered here -->
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
      padding: 1.5rem;
      min-width: 50%;
      justify-content: center;
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
    #selectedAppWindow
    #runningApps

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
     * Event listeners added when component is connected to DOM.
     */
    connectedCallback () {
      this.#desktopWrapper = this.shadowRoot.querySelector('#desktop-wrapper')
      this.#appsContainer = this.shadowRoot.querySelector('#apps-container')

      this.#apps = [{ name: 'Kanji Memory', image: '../../images/kanji9.png' }, { name: 'AI Tutor', image: '../../images/ai-tutor.jpg' }, { name: 'Language Chat', image: '../../images/language-exchange.webp' }]

      this.#runningApps = [{}]

      this.#renderAppIcons()
    }

    /**
     * Method to render the app icons.
     */
    #renderAppIcons () {
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
      appWindow.innerHTML = app.customHtml
      appWindow.addEventListener('close-app', () => this.#closeSelectedApp(app.id))
      appWindow.addEventListener('drag', (e) => this.dragWindow(e))
      this.#desktopWrapper.appendChild(appWindow)
    }

    /**
     * Method to render the running apps in a window component.
     *
     */
    #renderRunningApps () {
      this.#runningApps.forEach(app => {
        this.#renderApp(app)
      })
    }

    /**
     * Method to focus on the selected app.
     * 
     * @param {string} app - The app to focus.
     */
    #focusSelectedApp (app) {
      app.focus()
      // invoked when the user clicks/tabs to an app icon
      // app in focus should be on top of all other apps
    }

    /**
     * Method to open the selected app.
     *
     * @param {string} appName - The name of the app to open.
     */
    #openSelectedApp (appName) {
      if (appName === 'Kanji Memory') {
        // Date.valueOf is used to generate a unique id for the app
        const memoryApp = { id: new Date().valueOf(), name: 'Kanji Memory Game', customHtml: '<memory-game slot="app"></memory-game><span slot="app-title">Kanji Memory Game</span>' }
        this.#renderApp(memoryApp)
        this.#runningApps.push(memoryApp)
      }
      if (appName === 'AI Tutor') {
        const aiTutor = { id: new Date().valueOf(), name: 'AI Tutor', customHtml: '<ai-tutor slot="app"></ai-tutor><span slot="app-title">AI Tutor</span>' }
        this.#renderApp(aiTutor)
        this.#runningApps.push(aiTutor)
      }
      if (appName === 'Language Chat') {
        const chatApp = { id: new Date().valueOf(), name: 'Language Chat', customHtml: '<language-chat slot="app"></language-chat><span slot="app-title">Language Chat</span>' }
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
