/**
 * The flipping tile component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = ` 
  <div class="flipping-tile">
  <div id="wrapper">
    <div part="front-of-tile">
      <img src="" id="front-of-card" alt="kanji image on the front of the card"/><!-- random kanji image will be rendered here -->
    </div>
    <div part="back-of-tile" id="back-of-card">
      <!-- set the back of the tile image dynamically -->
    </div>
  </div>
  </div>

  <style>
    .flipping-tile {
      width: 100%; 
      height: 100%;
      margin: 1rem; 
      border: 1px solid black;
      border-radius: 10px; 
      padding: 10px; 
      transition: opacity 1s;
      background-color: white; 
    }

    #wrapper { 
      height: 100%; 
      width: 100%; 
      position: relative; 

      /* Preserve-3d is used here to allow the card to be rotated in 3D space and to give the illusion of a card being flipped over. */
      transform-style: preserve-3d;
    }

    ::part(front-of-tile), 
    ::part(back-of-tile) {
      display: flex;
      height: 100%;
      width: 100%;
      position: absolute;
      backface-visibility: hidden;
      border-radius: 10px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    ::part(front-of-tile) { 
      background-color: #f5e9ee;
  
      /* The front of the tile is rotated 180 degrees by default to hide it from the user. */
      transform: rotateY(180deg);
    }

    ::part(back-of-tile) { 
      background-color: red;
      background-size: contain;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .flipping-tile.is-flipped #wrapper {
      transform: rotateY(180deg); 
      transition: transform 1s; 
    }

    .flipping-tile:hover {
      /* Opacity is used here to give the user a visual cue as to which card is currently selected (in focus with mouse hover). */
      opacity: 0.5; 
    }

    .flipping-tile.is-disabled {
      /* Will disable further user interaction (with the card) via both mouse and keyboard. */
      pointer-events: none;
    }

    div.flipping-tile.is-hidden {
      /* Will be used to hide the card from the user when there is a match. */
      opacity: 0; 
      transition: opacity 2s;
      pointer-events: none;
    }
  </style>
`

/**
 * Custom component representing a flipping tile.
 *
 *
 */
customElements.define('flipping-tile',
  /**
   * Flipping tile class.
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
      const tile = this.shadowRoot.querySelector('.flipping-tile')
      tile.tabIndex = 0
      tile.addEventListener('click', () => this.#flipTile(tile))
      tile.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          this.#flipTile(tile)
        }
      })
    }

    /**
     * Method to observe changes to the image-front and image-back attributes.
     *
     * @param {*} name - The name of the attribute being observed.
     * @param {*} oldValue - The previous value of the attribute.
     * @param {*} newValue - The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'image-front') {
        this.shadowRoot.querySelector('#front-of-card').src = newValue
      } else if (name === 'image-back') {
        this.shadowRoot.querySelector('#back-of-card').style.backgroundImage = `url(${newValue})`
      }
    }

    /**
     * Method to return the attributes to be observed.
     *
     * @returns {Array} - The attributes to be observed.
     */
    static get observedAttributes () {
      return ['image-front', 'image-back']
    }

    /**
     * Method to flip a tile.
     *
     * @param {HTMLElement} tile - The tile to be flipped and disabled.
     */
    #flipTile (tile) {
      if (tile.classList.contains('is-flipped')) return
      tile.classList.add('is-flipped')
      tile.classList.add('is-disabled')

      /* I want to communicate to the memory game component that a tile has been flipped and dispatch the flipped tile element so that it can be compared to the previously flipped tile. */
      const tileFlippedEvent = new CustomEvent('tile-is-flipped', {
        detail: this
      })
      this.dispatchEvent(tileFlippedEvent)
    }

    /**
     * Method to flip a tile back.
     */
    flipBack () {
      this.shadowRoot.querySelector('.flipping-tile').classList.remove('is-flipped')
    }

    /**
     * Method to disable a tile.
     */
    disable () {
      this.shadowRoot.querySelector('.flipping-tile').classList.add('is-disabled')
    }

    /**
     * Method to enable a tile.
     */
    enable () {
      this.shadowRoot.querySelector('.flipping-tile').classList.remove('is-disabled')
    }

    /**
     * Method to hide a tile.
     */
    hide () {
      this.shadowRoot.querySelector('.flipping-tile').classList.add('is-hidden')
      this.classList.add('is-hidden')
      this.shadowRoot.querySelector('.flipping-tile').classList.add('is-disabled')
    }

    /**
     * Event listeners removed when component is removed from DOM.
     *
     */
    disconnectedCallback () {
      const tile = this.shadowRoot.querySelector('.flipping-tile')
      tile.removeEventListener('click', () => this.#flipTile(tile))
      tile.removeEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          this.#flipTile(tile)
        }
      })
    }
  })
