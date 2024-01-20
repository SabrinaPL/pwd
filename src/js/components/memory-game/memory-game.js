import '../flipping-tile/flipping-tile'

const template = document.createElement('template')
template.innerHTML = ` 
<div class="memory-game">
    <h1>Kanji memory game</h1>
    <p>Try to find all matching pairs of kanji!</p>

    <p>Choose game difficulty to start the game:</p>
    <div class="difficulty-buttons">
      <input type="radio" id="easy" name="difficulty" value="easy" data-columns="2" data-rows="2">
      <label for="easy">Easy</label>

      <input type="radio" id="medium" name="difficulty" value="medium" data-columns="4" data-rows="2">
      <label for="medium">Medium</label>

      <input type="radio" id="hard" name="difficulty" value="hard" data-columns="4" data-rows="4">
      <label for="hard">Hard</label>
    </div> 
    <div id="memory-game-board">
      <flipping-tile></flipping-tile>
    </div>
<div>

<style>
  .memory-game {
    font-size: 20px; 
    font-weight: medium;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #bcbcbc;
  }

  .memory-game h1 {
    text-transform: uppercase;
  }

  .memory-game p {
    margin: 0.1; 
    font-size: 1.5rem; 
  }
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
