/**
 * The ai translator component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = ` 
  <div class="ai-translator">
    <h2>Language Translator</h2>
    <h3>Powered by DeepL AI</h3>
    <div class="input-output-container">
    <div class="input">
      <div class="translate-languages">
        <label for="translate-from-language">
          Translate from:
        </label>
        <select id="translate-from-language" class="translate-from-language">
          <option value="">Select language/auto-detect</option>
        </select>
        <label for="translate-to-language">
          to:
        </label>
        <select id="translate-to-language" class="translate-to-language">
            <option value="">Select language</option>
        </select>
      </div>
      <label for="text-to-translate">
        Enter text to translate:
      </label>
      <textarea id="text-to-translate" class="translate-text" placeholder="Enter text to translate" required></textarea>
    </div>
    <div class="output">
      <label for="translated-text">
        Translated text:
      </label>
      <textarea id="translated-text" class="translated-text" placeholder="Translated text" readonly></textarea>
       
      <button id="translate-button" class="translate-button">Translate</button>
      
    </div>
  
      <style>
        .ai-translator {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem;
          padding: 3rem;
          border: 1px solid black;
          border-radius: 10px;
          background-color: #B68CB8;
          color: black;
        }

        textarea {
          width: 100%;
          height: 50px;
          padding: 10px;
          margin: 10px 0;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
          background-color: #f8f8f8;
          resize: none;
          font-size: 1rem;
        }

        .translate-languages {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 500px;
          margin-bottom: 1rem;
        }

        .input, .output {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem;
        }

        #translate-to-language,
        #translate-from-language {
          margin: 0.5rem;
        }

        .translate-button {
        font-size: 1.1rem; 
        background-color: #011627; 
        color: white; 
        padding: 5px; 
        margin-top: 0.5rem; 
        border-radius: 5px; 
        }

        .translate-button:active {
        background-color: #628395;  
        }

      </style>`

customElements.define('ai-translator',
/**
 * Class representing a AI language translator (using DeepL API).
 */
  class extends HTMLElement {
    #textToTranslate
    #translatedText
    #translateButton
    #translateFromLanguage
    #translateToLanguage
    #sourceLanguages
    #targetLanguages
    #fromLanguage
    #URL = 'http://localhost:3000/translate'

    /**
     * Constructor.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#textToTranslate = this.shadowRoot.querySelector('#text-to-translate')
      this.#translatedText = this.shadowRoot.querySelector('#translated-text')
      this.#translateButton = this.shadowRoot.querySelector('#translate-button')
      this.#translateFromLanguage = this.shadowRoot.querySelector('#translate-from-language')
      this.#translateToLanguage = this.shadowRoot.querySelector('#translate-to-language')

      this.#sourceLanguages = [
        { code: 'AR', name: 'Arabic' },
        { code: 'BG', name: 'Bulgarian' },
        { code: 'CS', name: 'Czech' },
        { code: 'DA', name: 'Danish' },
        { code: 'DE', name: 'German' },
        { code: 'EL', name: 'Greek' },
        { code: 'EN', name: 'English' },
        { code: 'ES', name: 'Spanish' },
        { code: 'ET', name: 'Estonian' },
        { code: 'FI', name: 'Finnish' },
        { code: 'FR', name: 'French' },
        { code: 'HU', name: 'Hungarian' },
        { code: 'ID', name: 'Indonesian' },
        { code: 'IT', name: 'Italian' },
        { code: 'JA', name: 'Japanese' },
        { code: 'KO', name: 'Korean' },
        { code: 'LT', name: 'Lithuanian' },
        { code: 'LV', name: 'Latvian' },
        { code: 'NB', name: 'Norwegian Bokmål' },
        { code: 'NL', name: 'Dutch' },
        { code: 'PL', name: 'Polish' },
        { code: 'RO', name: 'Romanian' },
        { code: 'RU', name: 'Russian' },
        { code: 'SK', name: 'Slovak' },
        { code: 'SL', name: 'Slovenian' },
        { code: 'SV', name: 'Swedish' },
        { code: 'TR', name: 'Turkish' },
        { code: 'UK', name: 'Ukrainian' },
        { code: 'ZH', name: 'Chinese' }
      ]

      this.#targetLanguages = [
        { code: 'AR', name: 'Arabic' },
        { code: 'BG', name: 'Bulgarian' },
        { code: 'CS', name: 'Czech' },
        { code: 'DA', name: 'Danish' },
        { code: 'DE', name: 'German' },
        { code: 'EL', name: 'Greek' },
        { code: 'EN-GB', name: 'English (British)' },
        { code: 'EN-US', name: 'English (American)' },
        { code: 'ES', name: 'Spanish' },
        { code: 'ET', name: 'Estonian' },
        { code: 'FI', name: 'Finnish' },
        { code: 'FR', name: 'French' },
        { code: 'HU', name: 'Hungarian' },
        { code: 'ID', name: 'Indonesian' },
        { code: 'IT', name: 'Italian' },
        { code: 'JA', name: 'Japanese' },
        { code: 'KO', name: 'Korean' },
        { code: 'LT', name: 'Lithuanian' },
        { code: 'LV', name: 'Latvian' },
        { code: 'NB', name: 'Norwegian Bokmål' },
        { code: 'NL', name: 'Dutch' },
        { code: 'PL', name: 'Polish' },
        { code: 'PT-BR', name: 'Portuguese (Brazilian)' },
        { code: 'RO', name: 'Romanian' },
        { code: 'RU', name: 'Russian' },
        { code: 'SK', name: 'Slovak' },
        { code: 'SL', name: 'Slovenian' },
        { code: 'SV', name: 'Swedish' },
        { code: 'TR', name: 'Turkish' },
        { code: 'UK', name: 'Ukrainian' },
        { code: 'ZH', name: 'Chinese (simplified)' }
      ]

      this.#populateLanguageOptions()
    }

    /**
     * Called when the component is connected to the DOM.
     */
    connectedCallback () {
      this.#translateButton.addEventListener('click', this.#translateText.bind(this))
    }

    /**
     * Method to populate the language options in the select elements.
     */
    #populateLanguageOptions () {
      // Populate the select elements with language options dynamically.
      this.#sourceLanguages.forEach(lang => {
        const optionFrom = document.createElement('option')
        optionFrom.value = lang.code
        optionFrom.textContent = lang.name
        this.#translateFromLanguage.appendChild(optionFrom)
      })

      this.#targetLanguages.forEach(lang => {
        const optionTo = document.createElement('option')
        optionTo.value = lang.code
        optionTo.textContent = lang.name
        this.#translateToLanguage.appendChild(optionTo)
      })
    }

    /**
     * Send a POST request to the DeepL API to translate the text and display the translated text.
     */
    async #translateText () {
      try {
        const textToTranslate = this.#textToTranslate.value
        this.#fromLanguage = this.#translateFromLanguage.value
        const toLang = this.#translateToLanguage.value

        // Check if the from language is empty and set it to null for auto detect.
        if (this.#fromLanguage === '') {
          this.#fromLanguage = null
        }

        // Check if any of the input fields are empty and present a message to the user.
        if (textToTranslate === '' || toLang === '') {
          this.#translatedText.value = 'Please fill in the text you wish you translate and select a target language.'
          return
        }

        // Set the data to send to the DeepL API.
        const data = {
          text: [textToTranslate],
          source_lang: this.#fromLanguage,
          target_lang: toLang
        }

        // Set the options for the fetch request.
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }

        // Render translating... message in the output textarea.
        this.#translatedText.value = 'Translating...'

        // Send the request to the DeepL API.
        const response = await fetch(this.#URL, options)
        const translatedText = await response.json()

        // Display the translated text in the output textarea.
        for (let i = 0; i < translatedText.length; i++) {
          this.#translatedText.value = translatedText[i].text
        }
      } catch (error) {
        console.error('There was an error fetching the data:' + error)
      }
    }

    /**
     * Called when the component is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#translateButton.removeEventListener('click', this.#translateText.bind(this))
    }
  })
