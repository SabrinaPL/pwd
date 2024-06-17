/**
 * The high-score component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <h1><slot></slot></h1>
    <h2>High score of the top 5 players:</h2>
    <ul id="high-score">
    </ul>
    <div>
        <button type="submit" class="btn">Play again</button>
    </div>

    <style>
        #high-score {
          color: #5FDDDB; 
          font-size: 1.5rem;
          list-style: none; 
        }

        .btn {
        font-size: 1.1rem; 
        background-color: #FF66B3; 
        color: white; 
        padding: 5px; 
        margin-top: 0.5rem; 
        border-radius: 5px; 
        }

        .btn:active {
        background-color: #42BFDD;  
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

      // Sort the high scores (with the lowest value - i.e. fastest time - displayed at the top of the high score).
      this.#highScoreList.sort((a, b) => a.score - b.score)

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
        highScoreUl.innerHTML += `<li>${highScore.nickname}: ${highScore.score}</li>`
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
    }
  })
