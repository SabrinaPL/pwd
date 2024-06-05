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
    <h1>Window title</h1>
    <div id="window-title">
      <!-- title goes here -->
      <h3><slot name="app-title"></slot></h3>
      <button id="close-window">X</button>
    <div id="window-component">
      App component goes here
      <!-- window component goes here --> 
      <slot name="app"></slot>
    </div>
  </div>

  <style>
    #window {
      position: absolute;
      width: 500px;
      height: 500px;
      padding: 1rem;
      background-color: white;
      border: 1px solid black;
      border-radius: 10px;
    }

    #window-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5e9ee;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    #window-component {
      padding: 1rem;
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
  })
