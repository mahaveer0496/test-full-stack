const db = require('./db')
const express = require('express')
var cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

app.use(cors())

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

    const { rows: totalRows } = await db.query({
      text: 'SELECT COUNT("ArtistId") FROM "Artist"',
    })
    const totalPages = Math.ceil(totalRows[0].count / limit)

    return res.json({ data: artists, totalPages })
  } catch (error) {
    // log this error
    return res.status(500)
  }
})

app.post('/', async (req, res) => {
  const { name } = req.body
  console.log(req.body)
  if (!name) {
    return res.status(422).json({ error: 'Please provide name' })
  }

  try {
    const result = await db.query({
      text:
        'INSERT INTO "Artist" ("Name", "ArtistId") VALUES ($1, (select max("ArtistId") + 1 from "Artist")) RETURNING *',
      values: [name],
    })
    return res.json(result.rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'There was an error!' })
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
