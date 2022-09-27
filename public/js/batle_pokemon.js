// Variables qeu apuntna al dom  DRY(don't repeat yourself)

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const btnPoke = document.getElementById('btn-poke');
const btnReset = document.getElementById('btn-reiniciar');

const sectionSeleccionarPokemon = document.getElementById('seleccionar-pokemon');

const spanPokeJugador = document.getElementById('poke-jugador');

const spanPokeEnemigo = document.getElementById('poke-enemigo');

const pVidasJugador = document.getElementById('vidas-jugador');
const pVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataque-jugador');
const ataquesDelEnemigo = document.getElementById('ataque-enemigo');

const contenedorTarjetas = document.getElementById('cards-container');

const contenedorAtaques = document.getElementById('contenedor-ataques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let jugadorId = null;
let enemigoId = null;
let pokemones = [];
let pokemonesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDePokemones;

let squirtle;
let onix;
let charmander;
let dragonite;
let bulbasaur;
let magmar;

let pokemonJugador;
let pokemonJugadorObjeto;
let ataquesPokemonJugador;
let ataquesPokemonEnemigo;

let btnFuego;
let btnAgua;
let btnTierra;
let btnPlanta;

let botones = [];

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let victoriasJugador = 0;
let victoriasEnemigo = 0;

let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/pokemap.png';

let alturaQueBuscamos;
let anchodelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 650;
if (anchodelMapa > anchoMaximoDelMapa) {
  anchodelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchodelMapa * 600 / 800;
mapa.width = anchodelMapa;
mapa.height = alturaQueBuscamos;

// clase y variables para el constructor
class Pokemon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 70;
    this.alto = 70;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
  }

  pintarPokemon() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.ancho,
      this.alto,
    )
  }
};


let pokeSquirtle = new Pokemon('Squirtle', './assets/squirtle.png', 3, './assets/squirtle.png');
let pokeOnix = new Pokemon('Onix', './assets/onix.png', 3, './assets/onix.png');
let pokeCharmander = new Pokemon('Charmander', './assets/charmander.png', 3, './assets/charmander.png');
let pokeDragonite = new Pokemon('Dragonite', './assets/dragonite.png', 3, './assets/dragonite.png');
let pokeBulbasaur = new Pokemon('Bulbasaur', './assets/bulbasaur.png', 3, './assets/bulbasaur.png');
let pokeMagmar = new Pokemon('Magmar', './assets/magmar.png', 3, './assets/magmar.png');

const pokeSquirtle_Ataques = [{
  nombre: '💧',
  id: 'btn-agua'
}, {
  nombre: '💧',
  id: 'btn-agua'
}, {
  nombre: '💧',
  id: 'btn-agua'
}]
pokeSquirtle.ataques.push(...pokeSquirtle_Ataques)
// pokeSquirtleEnemigo.ataques.push(...pokeSquirtle_Ataques)

const pokeOnix_Ataques = [{
  nombre: '🗻',
  id: 'btn-tierra'
}, {
  nombre: '🗻',
  id: 'btn-tierra'
}, {
  nombre: '🗻',
  id: 'btn-tierra'
}]
pokeOnix.ataques.push(...pokeOnix_Ataques)
// pokeOnixEnemigo.ataques.push(...pokeOnix_Ataques)

const pokeCharmander_Ataques = [{
  nombre: '🔥',
  id: 'btn-fuego'
}, {
  nombre: '🔥',
  id: 'btn-fuego'
}, {
  nombre: '🗻',
  id: 'btn-tierra'
}]
pokeCharmander.ataques.push(...pokeCharmander_Ataques)
// pokeCharmanderEnemigo.ataques.push(...pokeCharmander_Ataques)

const pokeDragonite_Ataques = [{
  nombre: '💧',
  id: 'btn-agua'
}, {
  nombre: '🗻',
  id: 'btn-tierra'
}, {
  nombre: '🔥',
  id: 'btn-fuego'
}]
pokeDragonite.ataques.push(...pokeDragonite_Ataques)
// pokeDragoniteEnemigo.ataques.push(...pokeDragonite_Ataques)

const pokeBulbasaur_Ataques = [{
    nombre: '🌱',
    id: 'btn-planta'
  },
  {
    nombre: '🌱',
    id: 'btn-planta'
  },
  {
    nombre: '🌱',
    id: 'btn-planta'
  }
]
pokeBulbasaur.ataques.push(...pokeBulbasaur_Ataques)
// pokeBulbasaurEnemigo.ataques.push(...pokeBulbasaur_Ataques)

const pokeMagmar_Ataques = [{
  nombre: '🔥',
  id: 'btn-fuego'
}, {
  nombre: '🔥',
  id: 'btn-fuego'
}, {
  nombre: '🗻',
  id: 'btn-tierra'
}]
pokeMagmar.ataques.push(...pokeMagmar_Ataques)
// pokeMagmarEnemigo.ataques.push(...pokeMagmar_Ataques)

pokemones.push(pokeSquirtle, pokeOnix, pokeCharmander, pokeDragonite, pokeBulbasaur, pokeMagmar);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';

  pokemones.forEach((pokemon) => {
    opcionDePokemones = `
     <input type="radio" name="poke" id=${pokemon.nombre}>
      <label class="poke-card" for=${pokemon.nombre}>
        <p>${pokemon.nombre}</p>
        <img src=${pokemon.foto} alt=${pokemon.nombre}>
      </label>
    `
    contenedorTarjetas.innerHTML += opcionDePokemones;

    squirtle = document.getElementById('Squirtle');
    onix = document.getElementById('Onix');
    charmander = document.getElementById('Charmander');
    dragonite = document.getElementById('Dragonite');
    bulbasaur = document.getElementById('Bulbasaur');
    magmar = document.getElementById('Magmar');

  })

  btnPoke.addEventListener('click', seleccionarPoke);
  btnReset.addEventListener('click', reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://192.168.18.167:8080/unirse")
    .then(function (res) {
      console.log(res)
      if (res.ok) {
        res.text()
          .then(function (response) {
            console.log(response)
            jugadorId = response
          })
      }
    })
}

function seleccionarPoke() {
  if (squirtle.checked) {
    spanPokeJugador.innerHTML = squirtle.id;
    pokemonJugador = squirtle.id;
  } else if (onix.checked) {
    spanPokeJugador.innerHTML = onix.id;
    pokemonJugador = onix.id;
  } else if (charmander.checked) {
    spanPokeJugador.innerHTML = charmander.id;
    pokemonJugador = charmander.id;
  } else if (dragonite.checked) {
    spanPokeJugador.innerHTML = dragonite.id;
    pokemonJugador = dragonite.id;
  } else if (bulbasaur.checked) {
    spanPokeJugador.innerHTML = bulbasaur.id
    pokemonJugador = bulbasaur.id;
  } else if (magmar.checked) {
    spanPokeJugador.innerHTML = magmar.id
    pokemonJugador = magmar.id;
  } else {
    alert('no has seleccioado ningun pokemon')
    return
  }

  sectionSeleccionarPokemon.style.display = 'none';
  // btnReset.style.display = 'none';

  seleccionarPokemonParaBackEnd(pokemonJugador)

  extraerAtaques(pokemonJugador);
  sectionVerMapa.style.display = 'flex';
  iniciarMapa();
};

function seleccionarPokemonParaBackEnd(pokemonJugador) {
  fetch(`http://192.168.18.167:8080/pokemon/${jugadorId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pokemon: pokemonJugador
    })
  })
}


function extraerAtaques(pokemonJugador) {
  let ataques;
  for (let i = 0; i < pokemones.length; i++) {
    if (pokemonJugador === pokemones[i].nombre) {
      ataques = pokemones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesPokemonJugador = ` <button id=${ataque.id} class="btn-ataques  BAtaques">${ataque.nombre}</button> `
    contenedorAtaques.innerHTML += ataquesPokemonJugador;
  })

  btnFuego = document.getElementById('btn-fuego');
  btnAgua = document.getElementById('btn-agua');
  btnTierra = document.getElementById('btn-tierra');
  btnPlanta = document.getElementById('btn-planta');

  botones = document.querySelectorAll('.BAtaques');
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', e => {
      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO')
        // console.log(ataqueJugador)
        boton.style.background = '#3fc861'
        boton.disabled = true
      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA')
        boton.style.background = '#3fc861'
        boton.disabled = true
      } else if (e.target.textContent === '🗻') {
        ataqueJugador.push('TIERRA')
        boton.style.background = '#3fc861'
        boton.disabled = true
      } else {
        ataqueJugador.push('PLANTA')
        boton.style.background = '#3fc861'
        boton.disabled = true
      }
      if (ataqueJugador.length === 3) {
        enviarAtaques()
      }

    })
  })
}

function enviarAtaques() {
  fetch(`http://192.168.18.167:8080/pokemon/${jugadorId}/ataques`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })
  })
  intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
  fetch(`http://192.168.18.167:8080/pokemon/${enemigoId}/ataques`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({
            ataques
          }) {
            if (ataques.length === 3) {
              ataqueEnemigo = ataques
              combate()
            }
          })
      }
    })
}

function seleccionarPokeEnemigo(enemigo) {
  spanPokeEnemigo.innerHTML = enemigo.nombre;
  ataquesPokemonEnemigo = enemigo.ataques
  secuenciaAtaque();
}



function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesPokemonEnemigo.length - 1);
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO')
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo.push('AGUA')
  } else if (ataqueAleatorio == 3) {
    ataqueEnemigo.push('TIERRA')
  } else {
    ataqueEnemigo.push('PLANTA')
  }
  console.log(ataqueEnemigo)
  iniciarCombatePokemon();
}

function iniciarCombatePokemon() {
  if (ataqueJugador.length === 3) {
    combate()
  }
};

function indexAmbosJugadores(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
  // definicion del juego
  clearInterval(intervalo)

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosJugadores(index, index)
      crearMensaje('EMPATE')
    } else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'PLANTA' || ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA' || ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO' || ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'TIERRA' || ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'PLANTA' || ataqueJugador[index] == 'PLANTA' && ataqueEnemigo[index] == 'AGUA') {
      indexAmbosJugadores(index, index)
      crearMensaje('GANASTE')
      victoriasJugador++;
      pVidasJugador.innerHTML = victoriasJugador
    } else {
      indexAmbosJugadores(index, index)
      crearMensaje('PERDISTE')
      victoriasEnemigo++;
      pVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }
  contadorVictorias(); //revisar las victorias
}

function contadorVictorias() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate , Gran pelea 😄");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Felicidades Ganaste 😄");
  } else {
    crearMensajeFinal("Perdiste, Pokemon Eliminado 😞");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueJugador = document.createElement('p');
  let nuevoAtaqueEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);

}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  btnReset.style.display = 'flex';
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// canva
function pintarCanvas() {
  pokemonJugadorObjeto.x = pokemonJugadorObjeto.x + pokemonJugadorObjeto.velocidadX
  pokemonJugadorObjeto.y = pokemonJugadorObjeto.y + pokemonJugadorObjeto.velocidadY

  lienzo.clearRect(0, 0, mapa.width, mapa.height);

  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  pokemonJugadorObjeto.pintarPokemon();

  enviarPosicion(pokemonJugadorObjeto.x, pokemonJugadorObjeto.y)

  pokemonesEnemigos.forEach(function (pokemon) {
    pokemon.pintarPokemon()
    revisarColision(pokemon)
  })
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.18.167:8080/pokemon/${jugadorId}/posicion`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        x,
        y
      })
    })
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({enemigos}) {
            console.log(enemigos)
            pokemonesEnemigos = enemigos.map(function (enemigo) {
              let pokemonEnemigo = null
              const pokemonNombre = enemigo.pokemon.nombre || ""
              if (pokemonNombre === "Squirtle") {
                pokemonEnemigo = new Pokemon('Squirtle', './assets/squirtle.png', 3, './assets/squirtle.png', enemigo.id);
              } else if (pokemonNombre === "Onix") {
                pokemonEnemigo = new Pokemon('Onix', './assets/onix.png', 3, './assets/onix.png', enemigo.id);
              } else if (pokemonNombre === "Charmander") {
                pokemonEnemigo = new Pokemon('Charmander', './assets/charmander.png', 3, './assets/charmander.png', enemigo.id);
              } else if (pokemonNombre === "Dragonite") {
                pokemonEnemigo = new Pokemon('Dragonite', './assets/dragonite.png', 3, './assets/dragonite.png', enemigo.id);
              } else if (pokemonNombre === "Bulbasaur") {
                pokemonEnemigo = new Pokemon('Bulbasaur', './assets/bulbasaur.png', 3, './assets/bulbasaur.png', enemigo.id);
              } else if (pokemonNombre === "Magmar") {
                pokemonEnemigo = new Pokemon('Magmar', './assets/magmar.png', 3, './assets/magmar.png', enemigo.id);
              }

              pokemonEnemigo.x = enemigo.x
              pokemonEnemigo.y = enemigo.y

              return pokemonEnemigo

            })
          })
      }
    })
}

function moverDerecha() {
  pokemonJugadorObjeto.velocidadX = 5
}

function moverIzquerda() {
  pokemonJugadorObjeto.velocidadX = -5
}

function moverArriba() {
  pokemonJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
  pokemonJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
  pokemonJugadorObjeto.velocidadX = 0
  pokemonJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
  console.log(event.key)
  switch (event.key) {
    case 'ArrowUp':
      moverArriba()
      break
    case 'ArrowDown':
      moverAbajo()
      break
    case 'ArrowLeft':
      moverIzquerda()
      break
    case 'ArrowRight':
      moverDerecha()
      break
    default:
      break
  }
}

function iniciarMapa() {
  pokemonJugadorObjeto = obtenerObjetoPokemon(pokemonJugador)
  console.log(pokemonJugadorObjeto, pokemonJugador)
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener('keydown', sePresionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoPokemon() {
  for (let i = 0; i < pokemones.length; i++) {
    if (pokemonJugador === pokemones[i].nombre) {
      return pokemones[i]
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquerdaEnemigo = enemigo.x

  const arribaJugador = pokemonJugadorObjeto.y + 50
  const abajoJugador = pokemonJugadorObjeto.y + pokemonJugadorObjeto.alto - 50
  const derechaJugador = pokemonJugadorObjeto.x + pokemonJugadorObjeto.ancho - 50
  const izquerdaJugador = pokemonJugadorObjeto.x + 50

  if (abajoJugador < arribaEnemigo || arribaJugador > abajoEnemigo || derechaJugador < izquerdaEnemigo || izquerdaJugador > derechaEnemigo) {
    return
  }
  detenerMovimiento();
  clearInterval(intervalo)
  console.log("Se ha detectado una colisión")

  enemigoId = enemigo.id

  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
  seleccionarPokeEnemigo(enemigo);

}


window.addEventListener('load', iniciarJuego)