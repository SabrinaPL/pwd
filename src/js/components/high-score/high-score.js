/**
 * The high-score component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

import DOMPurify from 'dompurify'

const template = document.createElement('template')
template.innerHTML = `
    <h1><slot></slot></h1>
    <h2>High score:</h2>
    <ul id="high-score">
    </ul>
    <div>
        <button type="submit" class="btn">Play again</button>
        <button type="submit" class="btn" id="clear-high-score">Clear high score</button>
    </div>

    <style>
        #high-score {
          color: black; 
          font-size: 1.5rem;
          list-style: none; 
        }

        .btn {
        font-size: 1.1rem; 
        background-color: #011627;
        color: white; 
        padding: 5px; 
        margin-top: 0.5rem; 
        border-radius: 5px; 
        }

        .btn:active {
        background-color: #628395;  
        }
    </style>
`

// Define the custom element.
customElements.define('high-score',
/** High score class that extends HTMLElement class
 * and creates a custom element.
 */
  class extends HTMLElement {
  /**
   * The high score form element.
   *
   * @type {HTMLDivElement}
   */
    #highScore

    /** The high score list.
     *
     * @type {Array}
     */
    #highScoreList

    /**
     * Constructor for high score class which invokes its super class constructor.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.append(template.content.cloneNode(true))

      // Get the high score form element in the shadow root.
      this.#highScore = this.shadowRoot.querySelector('#high-score')
    }

    /**
     * Function to save player score to the high score list.
     *
     * @param {object} player - The player object.
     */
    saveHighScore (player) {
      // Get the high score list.
      this.#getHighScores()

      // Add a player to the high score list array of objects.
      this.#highScoreList.push(player)

      // Sort the high scores.
      this.#highScoreList.sort((a, b) => {
        // Compare difficulty levels first.
        if (a.difficulty !== b.difficulty) {
          // Sort by difficulty level.
          return a.difficulty.localeCompare(b.difficulty)
        }
        // If difficulty levels are the same, then sort by score.
        return a.score - b.score
      })

      // Save the current high score in the local storage.
      localStorage.setItem('highScoreList', JSON.stringify(this.#highScoreList))
    }

    /**
     * Function to present the high score.
     *
     * @function
     */
    showHighScore () {
      // Get the high score from local storage.
      this.#getHighScores()

      // Select the ul-element.
      const highScoreUl = this.shadowRoot.querySelector('#high-score')

      // Set the high score list to empty.
      highScoreUl.innerHTML = ''

      // Iterate through the high score list and create li-elements to add the high scores to.
      for (const highScore of this.#highScoreList) {
        // Use DOMPurify to sanitize the nickname.
        DOMPurify.sanitize(highScore.nickname)

        highScoreUl.innerHTML += `<li>${highScore.nickname}:</li><li>score: ${highScore.score}</li><li>difficulty: ${highScore.difficulty}</li><br>`
      }
    }

    /**
     * Function to get high score list from the local storage.
     *
     * @function
     */
    #getHighScores () {
      // Check if there is a previous high score list in the local storage.
      if (localStorage.getItem('highScoreList') === null) {
        // Create a new high score list.
        this.#highScoreList = []
      } else {
        // Get the high score list from local storage.
        this.#highScoreList = JSON.parse(localStorage.getItem('highScoreList'))

        // Keep only the top 5 scores in the high score list, remove the rest.
        this.#highScoreList = this.#highScoreList.slice(0, 5)
      }
    }

    /**
     * Function to clear the high score list from the local storage.
     */
    #clearHighScore () {
      localStorage.clear()
    }

    /**
     * Connected callback that is invoked when the element is added to the DOM.
     *
     * @function
     */
    connectedCallback () {
      // Add event listener to play again button.
      this.shadowRoot.querySelector('.btn').addEventListener('click', () => {
        // Dispatch the event.
        this.dispatchEvent(new CustomEvent('playAgain', {}))
      })

      this.shadowRoot.querySelector('#clear-high-score').addEventListener('click', () => {
        this.#clearHighScore()
        this.showHighScore()
      })
    }

    /**
     * Disconnected callback that is invoked when the element is removed from the DOM.
     */
    disconnectedCallback () {
      // Remove event listener from play again button.
      this.shadowRoot.querySelector('.btn').removeEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('playAgain', {}))
      })

      this.shadowRoot.querySelector('#clear-high-score').removeEventListener('click', () => {
        this.#clearHighScore()
        this.showHighScore()
      })
    }
  })
