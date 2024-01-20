const template = document.createElement('template')
template.innerHTML = ` 
  <div class="flipping-tile">
  <div id="wrapper">
    <div part="front-of-tile">
      <slot name="front"></slot>
    </div>
    <div part="back-of-tile">
      <slot name="back"></slot>
    </div>
</div>
  </div>

  <style>
    .flipping-tile {
      width: 300px; 
      height: 300px;
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
      background-color: red;
      background-image: url('./images/front-of-card.png');
    }

    ::part(back-of-tile) { 
      background-color: #f5e9ee;
    
      /* The background image is added here now to test that it works, will later be randomly generated and added to the back of the tile via slot. */
      background-image: url('./images/kanji1.png');

      /* The back of the tile is rotated 180 degrees by default to hide it from the user. */
      transform: rotateY(180deg);
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
      tile.addEventListener('click', () => {
        tile.classList.add('is-flipped')

        /* The card is disabled here to test that disabling works, will later be disabled when two cards have been flipped as to prevent the user from flipping more cards in the memory game. */
        tile.classList.add('is-disabled')
      })
    }

    /**
     * Event listeners removed when component is removed from DOM.
     *
     */
    disconnectedCallback () {
      const tile = this.shadowRoot.querySelector('.flipping-tile')
      tile.removeEventListener('click')
    }
  })
