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
      background-color: #f5e9ee;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #desktop {
      width: 90vw;
      height: 80vh;
      background-color: #f5e9ee;
      border: 1px solid black;
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
    #appIcons
    #appIconsContainer
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
      this.#appIconsContainer = this.shadowRoot.querySelector('#desktop-icons')

      this.#appIcons = []
      this.#runningApps = []

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

    /**
     * Method to focus on the selected app.
     */
    #focusSelectedApp () {
      // invoked when the user clicks/tabs to an app icon
      // app in focus should be on top of all other apps
    }

    /**
     * Method to open the selected app.
     */
    #openSelectedApp () {
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
