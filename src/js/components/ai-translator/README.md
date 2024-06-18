# AI Translator Component

The AI Translator Component is a web component that allows users to translate text from one language to another using the DeepL API. It supports a wide range of source and target languages and can also auto-detect the source language.

## Author

Sabrina Prichard-Lybeck  
Email: sp223kz@student.lnu.se  

## Version

1.1.0

## Features

- Translate text from one language to another.
- Auto-detect source language.
- Powered by DeepL AI for accurate translations.
- User-friendly interface with a dropdown for selecting source and target languages.

## Usage

### Installation

Include the component in your project:

```html
<script type="module" src="path/to/ai-translator.js"></script>
```

### Add the component to your HTML

```html
<ai-translator></ai-translator>
```

### Define the custom component in JavaScript

```html
customElements.define('ai-translator',
  // The class implementation goes here.
) 
```

### Dependencies

DeepL API for translation services.
Api (with endpoint '/translate' running on localhost:3000) to make the api call to DeepL (since client-side data fetching isn't allowed for security reasons).

### Styles

Customize the appearance of the translator component by modifying the embedded styles within the template.
License

## This project is licensed under the MIT License

### Acknowledgments

DeepL for providing the translation API.
