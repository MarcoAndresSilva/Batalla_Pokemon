//impotar libreria + funcion (require) de node para utilizar la librerias que inatalamos con npm
const express = require('express');
const cors = require('cors');
// crear app con express pra recibir las peticiones de los clientes y responderlas
const app = express();


app.use(express.static('public'))
app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id
  }
  asignarPokemon(pokemon) {
    this.pokemon = pokemon
  }

  actualizarPosicion(x, y) {
    this.x = x
    this.y = y
  }

  asignarAtaques(ataques){
    this.ataques = ataques
  }

}

class Pokemon {
  constructor(nombre) {
    this.nombre = nombre
  }
}

/* cuando un cliente haga una peticion tenemos que indicarle la url, como vamos a recibir los datos de la peticion  y como vamos a responder la peticion*/
app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`

  const jugador = new Jugador(id)
  jugadores.push(jugador)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send(id)
})

app.post("/pokemon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "" // accedo al a variable que se envio en la url
  const nombre = req.body.pokemon || ""
  const pokemon = new Pokemon(nombre)

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarPokemon(pokemon)
  }
  console.log(jugadores)
  console.log(jugadorId)
  res.end()
})


app.post("/pokemon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y)
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
  res.send({
    enemigos
  })
})

app.post("/pokemon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || "" // accedo al a variable que se envio en la url
  const ataques = req.body.ataques || []

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques)
  }
  res.end()
})

app.get("/pokemon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
  res.send({
    ataques: jugador.ataques || []
  })
})


// listen para que escuche las peticiones de los clientes en el pueto 8080 y pueda responderles
app.listen(8080, () => {
  console.log('server running on port 8080');
})