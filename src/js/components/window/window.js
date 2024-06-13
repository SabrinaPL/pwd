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
  <div id="app-window">
    <div id="window-header">
      <h3><slot name="app-title"><!-- window title goes here --></slot></h3>
      <button id="close-window">X</button>
    </div>
    <div id="app-component">
      <slot name="app"><!-- app component goes here --></slot>
    </div>
  </div>

  <style>
    :host {
      position: absolute;
      min-width: 500px;
      min-height: 500px;
      padding: 0;
      background-color: white;
      border: 1px solid black;
      border-radius: 10px;
      overflow: hidden;
      resize: both;
  
      left: 35%; <!-- Default position -->
      right: 65%; <!-- Default position -->
    }

    #window-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #C5C5C5;
      padding: 0.5rem 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom: 1px solid black;
      cursor: move;
    }

    #app-component {
      flex: 1;
      flex-direction: column;
      padding: 0.5rem;
      overflow: auto;
    }

    #close-window {
      background-color: red;
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

    /**
     * Event listeners added when component is connected to DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('#close-window').addEventListener('click', () => this.#closeWindow())
      this.shadowRoot.querySelector('#window-header').addEventListener('mousedown', (event) => {
        this.addEventListener('mousemove', this.dragWindow)
      })
      this.addEventListener('mouseup', () => {
        this.removeEventListener('mousemove', this.dragWindow)
      })
    }

    /**
     * Method to close the window.
     *
     */
    #closeWindow () {
      this.dispatchEvent(new CustomEvent('close-app', {
        detail: this.id
      }))
      this.remove()
    }

    /**
     * Method to move the window.
     *
     * @param {Event} event - The event object.
     */
    dragWindow (event) {
      const movementX = event.movementX
      const movementY = event.movementY
      const computedStyle = window.getComputedStyle(this)
      const leftValue = parseInt(computedStyle.left)
      const topValue = parseInt(computedStyle.top)

      this.style.left = `${leftValue + movementX}px`
      this.style.top = `${topValue + movementY}px`
    }

    changeWindowSize () {
    }

    minimalizeWindow () {
    }

    /**
     * Method to focus the window.
     */
    focusWindow () {
      this.dispatchEvent(new CustomEvent('focus-app'))
    }
  })
