// this will be the "desktop" where the user can interact with the icons of the other components to open them in a new window
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
    <div id="desktop">
      <div id="desktop-icons">
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

    #desktop {
      width: 95vw;
      height: 85vh;
      background-color: transparent;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #desktop-icons {
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      grid-gap: 1rem;
      justify-content: left;
      align-items: center;
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
      this.#appsContainer = this.shadowRoot.querySelector('#desktop-icons')

      this.addEventListener('open-app', (event) => this.#openSelectedApp(event.detail))

      this.#apps = []
      this.#runningApps = [{ /* id, name, customhtml (window) <- generates the html for the right window containing the right app dynamically */ }]

      this.#renderAppIcons()

      // add loop to render app-icons dynamically and add event listeners to open the applications in a new window
      // listeners to listen to when the user clicks on the desktop icons to trigger open application events, close application events, and move application events
    }

    /**
     * Method to render the app icons.
     */
    #renderAppIcons () {
      // render app icons dynamically
      // add event listeners to open the applications in a new window, close the applications, and move the applications (+ minimize?)
    }

    #renderRunningApps () {
      // windows will be displayed in an absolute position inside the desktop element
      // desktop in a relative position
      // the windows will be displayed in the order they were opened

    }

    /**
     * Method to focus on the selected app.
     */
    #focusSelectedApp () {
      // invoked when the user clicks/tabs to an app icon
      // app in focus should be on top of all other apps
    }

    /**
     * Method to open the selected app.
     *
     * @param {string} appName - The name of the app to open.
     */
    #openSelectedApp (appName) {
      if (appName === 'Memory Game') {
        // Date.valueOf is used to generate a unique id for the app
        this.#runningApps.push({ id: new Date().valueOf(), name: 'Memory Game', customHtml: '<app-window><memory-game slot="app"></memory-game><span slot="app-title">Memory Game</span></app-window>' })
      }

      // window object needs to be created dynamically
      // invoked when the user clicks on an app icon
      // add the selected app to the running apps array
    }

    /**
     * Method to close the selected app.
     */
    #closeSelectedApp () {
      // invoked when the user closes an app window
      // remove the selected app from the running apps array
    }
  })
