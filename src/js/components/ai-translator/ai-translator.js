const template = document.createElement('template')
template.innerHTML = ` 
  <div class="ai-translator">
    <h2>Language Translator</h2>
    <h3>Powered by DeepL AI</h3>
    <div class="input">
      <label for="translate-from-language">Translate from:</label>
      <select id="translate-from-language" class="translate-from-language">
        <option value="">Select language</option>
      </select>
      <label for="translate-to-language">Translate to:</label>
      <select id="translate-to-language" class="translate-to-language">
          <option value="">Select language</option>
      <label for="text-to-translate">Enter text to translate:</label>
      <textarea id="text-to-translate" class="translate-text" placeholder="Enter text to translate" required></textarea>
    </div>
    <div class="ai-translator__output">
      <label for="translated-text">Translated text:</label>
      <textarea id="translated-text" class="translated-text" placeholder="Translated text" readonly></textarea>
      
      <button id="translate-button" class="ai-translator__button">Translate</button>
      
      <style>
        .ai-translator {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem;
          padding: 1rem;
          border: 1px solid black;
          border-radius: 10px;
          background-color: lightblue;
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
        { code: 'PT', name: 'Portuguese' },
        { code: 'PT-BR', name: 'Portuguese (Brazilian)' },
        { code: 'PT-PT', name: 'Portuguese (European)' },
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
        const fromLang = this.#translateFromLanguage.value
        const toLang = this.#translateToLanguage.value

        // Set the data to send to the DeepL API.
        const data = {
          text: [textToTranslate],
          source_lang: fromLang,
          target_lang: toLang
        }

        // Set the options for the fetch request.
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }

        // Send the request to the DeepL API.
        const response = await fetch(this.#URL, options)
        const translatedText = await response.json()

        // Display the translated text in the output textarea.
        this.#translatedText.value = translatedText[0].text
      } catch (error) {
        throw new Error('There was an error fetching the data:' + error)
      }
    }
  })
