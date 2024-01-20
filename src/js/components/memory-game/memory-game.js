import '../flipping-tile/flipping-tile'

const template = document.createElement('template')
template.innerHTML = ` 
<div class="memory-game">
    <div id="memory-game-board">
      <flipping-tile></flipping-tile>
    </div>
<div>

<style>

</style>
`

/**
 * Custom component representing a memory game.
 *
 *
 */
customElements.define('memory-game',
/**
 * Memory game class.
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
      /* Plocka ut memory game ur shadow root, loopa igenom, createElement + addChild för flipping tiles, då kan dynamiskt rendera upp antalet tiles */
      /* const flippingTile = this.shadowRoot.querySelector('flipping-tile') */
    }
  })
