const template = document.createElement('template')
template.innerHTML = ` 
  <div class="ai-translator">
    <div class="input">
      <label for="translate-from-language">Translate from:</label>
      <select id="translate-from-language" class="translate-from-language">
        <option value="">Select language</option>
      </select>
      <label for="translate-to-language">Translate to:</label>
      <select id="translate-to-language" class="translate-to-language">
          <option value="">Select language</option>
      <label for="text-to-translate">Enter text to translate:</label>
      <textarea id="text-to-translate" class="translate-text" placeholder="Enter text to translate"></textarea>
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
          background-color: white;
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
    #languages
    #KEY = '9705cc92-fdfb-4b0d-a986-5fad3f26b07d:fx'
    #URL = 'https://api-free.deepl.com/v2/translate'

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
      this.#languages = [
        { code: 'EN', name: 'English' },
        { code: 'DE', name: 'German' },
        { code: 'FR', name: 'French' },
        { code: 'ES', name: 'Spanish' },
        { code: 'IT', name: 'Italian' },
        { code: 'NL', name: 'Dutch' },
        { code: 'PL', name: 'Polish' },
        { code: 'PT', name: 'Portuguese' },
        { code: 'RU', name: 'Russian' },
        { code: 'JA', name: 'Japanese' },
        { code: 'ZH', name: 'Chinese' }
      ]

      this.#populateLanguageOptions()
    }

    connectedCallback () {
    }

    /**
     * Method to populate the language options in the select elements.
     */
    #populateLanguageOptions () {
      // Populate the select elements with language options.
      this.#languages.forEach(lang => {
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

    async #translateText () {
      // Get the text to translate and the languages to translate from and to.
      // Send a POST request to the DeepL API to translate the text.
      // Display the translated text in the output textarea.
    }
  })
