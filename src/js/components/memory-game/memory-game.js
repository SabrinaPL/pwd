import '../flipping-tile/flipping-tile'

const template = document.createElement('template')
template.innerHTML = ` 
<div class="memory-game">
    <h1>Kanji memory game</h1>
    <p>Try to find all matching pairs of kanji!</p>

    <!-- I want to dynamically render this text and the radio buttons below, so that I can hide the radio buttons when the game is in progress. -->
    <p>Choose game difficulty to start the game:</p>
    <div class="difficulty-buttons">

      <!-- The data-columns and data-rows attributes are used to dynamically set the number of columns and rows in the memory game board. -->
      <input type="radio" id="easy" name="difficulty" value="easy" data-columns="2" data-rows="2">
      <label for="easy">Easy</label>

      <input type="radio" id="medium" name="difficulty" value="medium" data-columns="4" data-rows="2">
      <label for="medium">Medium</label>

      <input type="radio" id="hard" name="difficulty" value="hard" data-columns="4" data-rows="4">
      <label for="hard">Hard</label>
    </div> 
    <div id="memory-game-board">
    </div>
<div>

<style>
  .memory-game {
    display: flex; 
    flex-direction: column;
    align-items: center;
    font-size: 20px; 
    font-weight: medium;
  }

  .memory-game h1 {
    text-transform: uppercase;
  }

  .memory-game p {
    margin: 0.1; 
    font-size: 1.5rem; 
  }

  #memory-game-board {
    display: grid;
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
    #memoryGameBoard
    #difficultyBtns
    #columns
    #rows
    #selectedTile

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
      this.#memoryGameBoard = this.shadowRoot.querySelector('#memory-game-board')

      this.#difficultyBtns = this.shadowRoot.querySelectorAll('input[name="difficulty"]')

      // Loop through the radio buttons and add event listeners that listen to when the user selects a radio button (so that the grid size can be rendered dynamically).
      this.#difficultyBtns.forEach(btn => {
        btn.addEventListener('change', () => {
          this.#columns = btn.dataset.columns
          this.#rows = btn.dataset.rows
          this.#renderMemoryGameBoard()
        })
      })
    }

    /**
     * Method to render the memory game board.
     *
     */
    #renderMemoryGameBoard () {
      // Clear the memory game board each time the user changes the difficulty level of the game.
      this.#memoryGameBoard.innerHTML = ''

      // Set the grid template columns and rows styling dynamically.
      this.#memoryGameBoard.style.gridTemplateColumns = `repeat(${this.#columns}, 1fr)`
      this.#memoryGameBoard.style.gridTemplateRows = `repeat(${this.#rows}, 1fr)`

      // Loop through columns and rows and create the amount of flipping tiles that the difficulty of the game requires.
      for (let i = 0; i < this.#columns * this.#rows; i++) {
        const flippingTile = document.createElement('flipping-tile')
        this.#memoryGameBoard.append(flippingTile)
      }
    }

    /**
     * Method to check flipped cards, keep count of number of tries and number of remaining tiles.
     *
     */
    #checkFlippedCards () {

    }

    /**
     * Event listeners removed when component is disconnected from DOM.
     */
    disconnectedCallback () {
      this.#difficultyBtns.forEach(btn => {
        btn.removeEventListener('change', () => {})
      })
    }
  })
