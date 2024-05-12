import '../flipping-tile/flipping-tile'

const template = document.createElement('template')
template.innerHTML = ` 
<div class="memory-game">
    <h1>Kanji memory game</h1>
    <p>Try to find all matching pairs of 漢字 (kanji)</p>

<div id="start-game-info">
    <p>Choose game difficulty to start the game:</p>
    <div class="difficulty-buttons">

      <!-- The data-columns and data-rows attributes are used to dynamically set the number of columns and rows in the memory game board. -->
      <input type="radio" id="easy" name="difficulty" value="easy" data-columns="2" data-rows="2">
      <label for="easy"><strong>子供</strong> (Easy)</label>

      <input type="radio" id="medium" name="difficulty" value="medium" data-columns="4" data-rows="2">
      <label for="medium"><strong>普通</strong> (Medium)</label>

      <input type="radio" id="hard" name="difficulty" value="hard" data-columns="4" data-rows="4">
      <label for="hard"><strong>死ぬ</strong> (Hard)</label>
    </div> 
</div>
    <div id="memory-game-board">
    </div>
<div>

<style>
  .memory-game,
  #start-game-info {
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
    margin: 0.5rem; 
    font-size: 1.5rem; 
  }

  #memory-game-board {
    height: 50vh;
    width: 90vw;
    display: grid;
    grid-gap: 2rem; 
  }

  #start-game-info.is-hidden {
    display: none;
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
    #startGameInfo
    #memoryGameBoard
    #difficultyBtns
    #columns
    #rows
    #selectedTile
    #tile
    #numOfTries

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
      this.#startGameInfo = this.shadowRoot.querySelector('#start-game-info')

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
      this.#startGameInfo.classList.add('is-hidden')

      // Clear the memory game board each time the user changes the difficulty level of the game.
      this.#memoryGameBoard.innerHTML = ''

      // Set the grid template columns and rows styling dynamically.
      this.#memoryGameBoard.style.gridTemplateColumns = `repeat(${this.#columns}, 1fr)`
      this.#memoryGameBoard.style.gridTemplateRows = `repeat(${this.#rows}, 1fr)`

      // Loop through columns and rows and create the amount of flipping tiles that the difficulty of the game requires.
      for (let i = 0; i < this.#columns * this.#rows; i++) {
        const flippingTile = document.createElement('flipping-tile')

        /* I want to listen to when a tile has been flipped so that I can invoke the method that is responsible for the game logic. */
        flippingTile.addEventListener('tile-is-flipped', (e) => {
          this.#checkFlippedCards(e.detail.tile)
        })
        this.#memoryGameBoard.append(flippingTile)
      }
    }

    /**
     * Method to handle which images will randomly be rendered to the front of the tiles.
     *
     */
    #handleImages () {

    }

    /* Shuffle code from 21 card game
  shuffle () {
    for (let i = this.#playingCards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[this.#playingCards[i], this.#playingCards[randomIndex]] = [this.#playingCards[randomIndex], this.#playingCards[i]]
    }
  }
  */

    /**
     * Method to check flipped cards, keep count of number of tries and number of remaining tiles.
     *
     * @param {HTMLElement} tile - The tile that has been flipped.
     */
    #checkFlippedCards (tile) {
      if (!this.#tile) {
        this.#tile = tile
      } else {
        if (this.#tile.isEqualNode(tile)) {
          tile.classList.add('is-hidden')
          this.#tile.classList.add('is-hidden')
          this.#tile = null
        } else {
          tile.classList.remove('is-flipped')
          this.#tile.classList.remove('is-flipped')
          this.#tile = null
        }

        /* To keep track of number of tries, regardless of if there is a match or not */
        this.#numOfTries++
        console.log(this.#numOfTries)
      }
    }

    /**
     * Event listeners removed when component is disconnected from DOM.
     */
    /* disconnectedCallback () {
      this.#difficultyBtns.forEach(btn => {
        btn.removeEventListener('change', () => {})
      })
    } */
  })
