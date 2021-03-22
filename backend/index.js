const db = require('./db')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

app.get('/', async (req, res) => {
  const { page = 1, limit = DEFAULT_LIMIT } = req.query

  if (isNaN(Number(page)) || isNaN(Number(limit))) {
    return res.status(422).json({ error: 'Invalid `page` or `limit`' })
  }

  const clampedLimit = Math.min(MAX_LIMIT, limit)
  const offset = (page - 1) * clampedLimit

  try {
    const { rows: artists } = await db.query({
      text: 'SELECT * FROM "Artist" ORDER BY "ArtistId" OFFSET $1 LIMIT $2',

      values: [offset, clampedLimit],
    })
    return res.json(artists)
  } catch (error) {
    // log this error
    return res.status(500)
  }
})

app.patch('/', async (req, res) => {
  const { name, artistId } = req.body

  if (!artistId) {
    return res.status(422).json({ error: 'Please provide artistId' })
  }

  if (!name) {
    return res.status(422).json({ error: 'Please provide name' })
  }

  try {
    const result = await db.query({
      text: 'UPDATE "Artist" SET "Name" = $1 WHERE "ArtistId" = $2',
      values: [name, artistId],
    })
    return res.json(result)
  } catch (error) {
    // log this error
    return res.status(500)
  }
})

app.post('*', (req, res) => {
  res.status(404).send('page not found')
})

app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:${PORT}`)
})
