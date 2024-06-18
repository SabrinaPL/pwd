/**
 * The memory game component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

import '../flipping-tile/flipping-tile'
import '../nickname-form/nickname-form'
import '../high-score/high-score'

const template = document.createElement('template')
template.innerHTML = ` 
<div class="memory-game">
    <h1>Kanji memory</h1>
    <p>Try to find all matching pairs of 漢字 (kanji)</p>

<div id="start-game-info">
    <p>Choose game difficulty:</p>
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
  .memory-game {
    background-color: #E6E8E6;
    height: 100%;
    border: 1px solid #000;
    border-radius: 10px;
    padding: 3rem;
  }

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
    width: 100%;
    height: 100%;
    display: grid;
    grid-gap: 2rem;
    flex: 1; 
    padding: 1rem;
    box-sizing: border-box;
  }

  .difficulty-buttons {
    margin-bottom: 1rem;
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
    #previouslySelectedTile
    #numOfTries
    #memorycards
    #nicknameForm
    #playerName
    #backOfCard
    #highScore
    #gameOverMessage

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

      // Present the nickname form to the user.
      this.#nicknameForm = document.createElement('nickname-form')
      this.#startGameInfo.append(this.#nicknameForm)

      this.#memoryGameBoard = this.shadowRoot.querySelector('#memory-game-board')

      this.#difficultyBtns = this.shadowRoot.querySelectorAll('input[name="difficulty"]')

      this.#numOfTries = 0
      this.#memorycards = []

      // Loop through the radio buttons and add event listeners that listen to when the user selects a radio button (so that the grid size can be rendered dynamically).
      this.#difficultyBtns.forEach(btn => {
        btn.addEventListener('change', () => {
          this.#columns = btn.dataset.columns
          this.#rows = btn.dataset.rows
        })
      })

      this.#nicknameForm.addEventListener('nickname-added', (event) => {
        this.#playerName = event.detail.username
        this.#startGameInfo.classList.remove('is-hidden')

        // Check if the user has selected a difficulty level and render the memory game board.
        if (this.#columns && this.#rows) {
          this.#renderMemoryGameBoard()
        }
      })
    }

    /**
     * Method to set up the memory cards array with the images that will be rendered to the front of the tiles.
     */
    #setupMemoryCards () {
      // We need to know how many cards we need to create.
      const amountOfCards = this.#rows * this.#columns / 2

      // Create an array with the amount of cards we need to create.
      for (let i = 1; i <= amountOfCards; i++) {
        // Push the image to the memory cards array twice so that each image has a matching pair.

        const imagePath = this.#generatePath(`kanji${i}.png`)

        this.#memorycards.push(imagePath)
        this.#memorycards.push(imagePath)
      }
    }

    /**
     * Method to generate the path to the module.
     *
     * @param {*} filename - The name of the file.
     * @returns {string} The path to the module.
     */
    #generatePath (filename) {
      // Get the path to the module (as shown in lectures).
      const pathToModule = import.meta.url

      // Set new path.
      return new URL(`./images/${filename}`, pathToModule)
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

      // Set up the memory cards array with the images that will be rendered to the front of the tiles.
      this.#setupMemoryCards()

      // Shuffle the images that will be rendered to the front of tiles.
      this.#shuffleImages()

      // Set the path to the back of the card image.
      this.#backOfCard = this.#generatePath('back-of-card.png')

      // Loop through columns and rows and create the amount of flipping tiles that the difficulty of the game requires.
      for (let i = 0; i < this.#columns * this.#rows; i++) {
        const flippingTile = document.createElement('flipping-tile')
        flippingTile.setAttribute('image-front', this.#memorycards[i])
        flippingTile.setAttribute('image-back', this.#backOfCard)

        /* I want to listen to when a tile has been flipped so that I can invoke the method that is responsible for the game logic. */
        flippingTile.addEventListener('tile-is-flipped', (event) => {
          this.#checkFlippedCards(event.detail)
        })

        this.#memoryGameBoard.append(flippingTile)
      }
    }

    /**
     * Method to handle which images will randomly be rendered to the front of the tiles.
     *
     */
    #shuffleImages () {
      // Shuffle the memory cards array so that the images are randomly placed on the board (shuffle algorithm reused from the 21 game).
      for (let i = this.#memorycards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[this.#memorycards[i], this.#memorycards[randomIndex]] = [this.#memorycards[randomIndex], this.#memorycards[i]]
      }
    }

    /**
     * Method to check flipped cards, keep count of number of tries and number of remaining tiles.
     *
     * @param {HTMLElement} tile - The tile that has been flipped.
     */
    #checkFlippedCards (tile) {
      if (!this.#previouslySelectedTile) {
        // If there is no previously selected tile, set the current tile as the previously selected tile.
        this.#previouslySelectedTile = tile
      } else {
        // Disable the other tiles while the user is comparing the two tiles.
        this.#memoryGameBoard.querySelectorAll('flipping-tile').forEach(tile => {
          tile.disable()
        })

        // If there is a previously selected tile, compare the two tiles.
        if (this.#previouslySelectedTile.getAttribute('image-front') === tile.getAttribute('image-front')) {
          tile.hide()
          this.#previouslySelectedTile.hide()
          this.#previouslySelectedTile = null

          this.#gameOver()
        } else {
          // If the tiles do not match, flip the tiles back.
          setTimeout(() => {
            tile.flipBack()
            if (this.#previouslySelectedTile === null) return
            this.#previouslySelectedTile.flipBack()
            // Reset the previously selected tile to null so that the next pair of tiles can be compared.
            this.#previouslySelectedTile = null
          }, 1200)
        }

        // Reset the disabled state of the tiles so that the user can continue playing.
        this.#memoryGameBoard.querySelectorAll('flipping-tile').forEach(tile => {
          tile.enable()
        })

        /* To keep track of number of tries, regardless of if there is a match or not */
        this.#numOfTries++
      }
    }

    /**
     * Method to check if the game is over.
     */
    #gameOver () {
      // Check if there are any tiles left on the board.
      if (this.#memoryGameBoard.querySelectorAll('flipping-tile.is-hidden').length === this.#columns * this.#rows) {
        setTimeout(() => {
          // Clear the memory game board.
          this.#memoryGameBoard.innerHTML = ''

          // If there are no tiles left, present the user with a message that the   game is over.
          this.#gameOverMessage = document.createElement('div')
          this.#gameOverMessage.textContent = `Congratulations ${this.#playerName}  ! You finished the game in ${this.#numOfTries} tries!`
          this.#memoryGameBoard.append(this.#gameOverMessage)

          // Create a high score component.
          this.#highScore = document.createElement('high-score')
          this.#highScore.addEventListener('playAgain', () => {
            this.#restartGame()
          })

          // Create a player object.
          const player = {
            nickname: this.#playerName,
            score: this.#numOfTries
          }
          // Send the player object to the high score component.
          this.#highScore.saveHighScore(player)
          // Show the high score.
          this.#highScore.showHighScore()
          // Append the high score component to the memory game board.
          this.#memoryGameBoard.append(this.#highScore)
          // Reset the number of tries.
          this.#numOfTries = 0
        }, 2000)
      }
    }

    /**
     * Method to restart the game.
     */
    #restartGame () {
      this.#gameOverMessage.remove()
      this.#highScore.remove()
      this.#startGameInfo.classList.remove('is-hidden')
    }

    /**
     * Event listeners removed when component is disconnected from DOM.
     */
    disconnectedCallback () {
      this.#difficultyBtns.forEach(btn => {
        btn.removeEventListener('change', () => {})
      })
      this.removeEventListener('nickname-added', () => {})
      this.removeEventListener('tile-is-flipped', () => {})
      this.removeEventListener('playAgain', () => {})
    }
  })
