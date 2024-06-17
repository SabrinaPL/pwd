import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import * as deepl from 'deepl-node'

try {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(express.json())

  app.post(
    '/translate',
    async (req, res) => {
      const text = req.body.text
      const sourceLang = req.body.source_lang
      const targetLang = req.body.target_lang

      const translator = new deepl.Translator('9705cc92-fdfb-4b0d-a986-5fad3f26b07d:fx')

      try {
        const result = await translator.translateText(text, sourceLang, targetLang)
        res.json(result)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    }
  )

  app.listen(3000, () => {
    console.log('Server is listening on port 3000')
  })
} catch (error) {
  console.error(`Error occurred: ${error.message}`)
}
