const template = document.createElement('template')
template.innerHTML = ` 
  <div class="flipping-tile">
  <div id="wrapper">
    <div part="front-of-tile">
      <img src="" id="front-of-card" alt="kanji image on the front of the card" /><!-- random kanji image will be rendered here -->
    </div>
    <div part="back-of-tile">
      <img src="" id="back-of-card" alt="kanji image on the back of the card" /><!-- set the back of the tile image dynamically -->
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
    }

    .flipping-tile.is-flipped #wrapper {
      transform: rotateY(180deg); 
      transition: transform 1s; 
    }

    .flipping-tile:hover {
      /* Opacity is used here to give the user a visual cue as to which card is currently selected (in focus with mouse hover). */
      opacity: 0.6; 
    }

    .flipping-tile.is-disabled {
      /* Will disable further user interaction (with the card) via both mouse and keyboard. */
      pointer-events: none;
    }

    .flipping-tile.is-hidden {
      /* Will be used to hide the card from the user when there is a match. */
      opacity: 0; 
      transition: opacity 4s;
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
      tile.addEventListener('click', () => this.#flipTile(tile))
      tile.addEventListener('render-front-of-tile', (e) => {
        this.#renderFrontOfTile(e.detail.image)
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
        this.querySelector('#front-of-card').src = newValue
      } else if (name === 'image-back') {
        this.querySelector('#back-of-card').src = newValue
      }
    }

    /**
     * Method to flip and disable a tile.
     *
     * @param {HTMLElement} tile - The tile to be flipped and disabled.
     */
    #flipTile (tile) {
      tile.classList.add('is-flipped')

      /* The card is disabled here to test that disabling works, will later be disabled when two cards have been flipped as to prevent the user from flipping more cards in the memory game. */
      tile.classList.add('is-disabled')

      /* I want to communicate to the memory game component that a tile has been flipped and dispatch the flipped tile element so that it can be compared to the previously flipped tile. */
      const tileFlippedEvent = new CustomEvent('tile-is-flipped', {
        detail: {
          tile
        }
      })
      this.dispatchEvent(tileFlippedEvent)
    }

    /**
     * Method to dynamically render the image on the front of the tile.
     *
     * @param {string} image - The image to be rendered on the front of the tile.
     */
    #renderFrontOfTile (image) {
      const frontOfTile = this.shadowRoot.querySelector('slot[name="front"]')
      frontOfTile.innerHTML = `<img src=${image} alt="kanji image" />`
    }

    #renderBackOfTile (image) {
      const backOfTile = this.shadowRoot.querySelector('slot[name="back"]')
      backOfTile.innerHTML = `<img src=${image} alt="back of card" />`
    }

    /**
     * Event listeners removed when component is removed from DOM.
     *
     */
    disconnectedCallback () {
      const tile = this.shadowRoot.querySelector('.flipping-tile')
      tile.removeEventListener('click', () => this.#flipTile(tile))
      tile.removeEventListener('render-front-of-tile', (e) => {
        this.#renderFrontOfTile(e.detail.image)
      })
    }
  })
