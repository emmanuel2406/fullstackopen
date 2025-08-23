const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()

const Person = require('./models/person')

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


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(400).send({ error: 'malformatted id' })
            }
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
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
    Person.countDocuments()
        .then(count => {
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${time}</p>
        `)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            person.name = name
            person.number = number

            return person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

// Catch all routes not listed above
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
