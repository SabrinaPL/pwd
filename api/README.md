# DeepL Translation API

The DeepL Translation API is a RESTful API that allows you to translate text from one language to another using the DeepL translation service.

## Author

Sabrina Prichard-Lybeck  
Email: <sp223kz@student.lnu.se>

## Version

1.1.0

## Features

- Translates text from one language to another.
- Supports multiple source and target languages.
- Secure communication using HTTPS.
- Rate-limited requests to prevent abuse.
- Error handling for robustness.

## Usage

### Installation

To use the DeepL Translation API, you need to have Node.js installed on your system.

1. Clone or download the repository containing the API code.
2. Install dependencies by running `npm install`.
3. Start the server by running `npm start`.

### Endpoints

#### Translate Text

- **URL**: `/translate`
- **Method**: `POST`
- **Request Body**:
  - `text`: The text to be translated.
  - `source_lang`: The source language of the text (e.g., 'en' for English).
  - `target_lang`: The target language for translation (e.g., 'fr' for French).
- **Response**: JSON object containing the translated text.

### Example

```json
POST /translate
{
  "text": "Hello, world!",
  "source_lang": "en",
  "target_lang": "fr"
}
```

### Response

```json
{
  "translatedText": "Bonjour tout le monde !"
}
```

### Configuration

API_KEY: Replace the placeholder API key with your own DeepL API key in the code.

### Dependencies

Express: Fast, unopinionated, minimalist web framework for Node.js.
Helmet: Helps secure Express applications with various HTTP headers.
CORS: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
deepl-node: Node.js client for the DeepL API.

### License

This project is licensed under the MIT License.

### Acknowledgments

Built with Node.js and Express.
Utilizes the DeepL translation service for accurate translations.
Special thanks to the developers of Express, Helmet, CORS, and deepl-node for their contributions.
