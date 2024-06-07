// implement window api here?

// which responsibilities should the window have?
// Window size
// Window close functionality
// (Window minimize functionality)
// Window move/draggable functionality (send event to desktop when window is moved)
// Window styling
// Window should be able to display any component that is passed to it
// Window should be able to be created with a title, a component, and a position

const template = document.createElement('template')
template.innerHTML = `
  <div id="window">
    <div id="window-header">
      <h3><slot name="app-title"><!-- window title goes here --></slot></h3>
      <button id="close-window">X</button>
    </div>
    <div id="app-component">
      <slot name="app"><!-- app component goes here --></slot>
    </div>
  </div>

  <style>
    #window {
      position: absolute;
      width: 500px;
      height: 500px;
      padding: 0;
      background-color: #E4DFDA;
      border: 1px solid black;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    #window-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(255,255,255,0.5);
      padding: 0.5rem 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom: 1px solid black;
    }

    #app-component {
      flex: 1;
      flex-direction: column;
      padding: 0.5rem;
      overflow: auto;
    }

    #close-window {
      background-color: red;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  </style>
`

/**
 * Custom component representing a window.
 *
 *
 */
customElements.define('app-window',
  /**
   * Window class.
   *
   */
  class extends HTMLElement {
    /**
     * Constructor to invoke super class and attach component to shadow DOM.
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback () {
      this.addEventListener('mousedown', this.#moveWindow)
      this.shadowRoot.querySelector('#close-window').addEventListener('click', () => this.#closeWindow())
    }

    /**
     * Method to close the window.
     *
     */
    #closeWindow () {
      this.remove()
    }

    /**
     * Method to move the window.
     *
     */
    #moveWindow () {
      this.setAttribute('draggable', 'true')
      // dragstart, dragstop and dragover events are needed to make the element draggable (handle positioning)
    }

    #changeWindowSize () {
    }

    #minimalizeWindow () {
    }
  })
