const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))

const tinyFormat = morgan.compile(morgan['tiny'])

// Define a custom format function
morgan.format('conditional', function (tokens, req, res) {
    if (req.method === 'POST') {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.body ? JSON.stringify(req.body) : ''
      ].join(' ');
    } else {
      // fallback to tiny format
      return tinyFormat(tokens, req, res)
    }
  });

app.use(morgan('conditional'))
app.use(express.json())


persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person_found = persons.find(person => person.id === id)
    if (person_found) {
        response.json(person_found)
    } else {
        response.status(404).send('Person not found')
    }
})

app.get('/info', (request, response) => {
    const time = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'long'
    })
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
    `)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return String(Math.round(Math.random() * 10000))
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    const person_found = persons.find(person => person.name === body.name)
    if (person_found) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

// Catch all routes not listed above
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
