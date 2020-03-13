const URL_MOVIES_API   = `https://yts.mx/api/v2/list_movies.json?`
const $comedyContainer = document.getElementById('comedy')
const $sciFicContainer = document.getElementById('sciFic')
const $horrorContainer = document.getElementById('horror')
const $inputMovie	   = document.getElementById('inputMovie')
const $findMovie 	   = document.getElementById('findMovie')
const $form			   = document.getElementById('form')


;(async function getMovies() {
	//Realiza las consultas a la API y devuelve el listado de peliculas de la data
	async function getMoviesList(genre) {
		const URL = `${URL_MOVIES_API}genre=${genre}&order_by=asc`

		const response	 = await fetch(URL)
		const res 		 = await response.json()
		const r 		 = res.data.movies
		return r
	}
	//Almacenan un array con las listas de pelicula, pasando por parametro el genero
	const comedyList = await getMoviesList('comedy')
	const sciFicList = await getMoviesList('Sci-Fi')
	const horrorList = await getMoviesList('horror')
	//Uso de template literals para posteriormente crear un elemento por pelicula
	function movieItemTempleate(movie) {
		return(
			`<div class="carousel-item">
	            <img class="carousel-item__img" src="${movie.medium_cover_image}" alt="Img1">
	            <div class="carousel-item__details">
	              <div>
	                <img class="carousel-item__icon" src="./src/img/play.png" alt="play">
	                <img class="carousel-item__icon" src="./src/img/add.png" alt="plus">
	              </div>
	              <p class="carousel-item__details--title">${movie.title}</p>
	              <p class="carousel-item__details--subtitle">${movie.title_long}</p>
	            </div>
	          </div>
			`
		)
	}
	//Itera sobre cada pelicula de la lista y genera un item dentro del contenedor
	function createMoviesTemplates(list, container) {
		list.forEach(movie => {
			const HTMLString 	 = movieItemTempleate(movie)
			container.innerHTML += HTMLString
		})
	}
	//Envía la lista a iterar y el contenedor para generar los items de las peliculas
	createMoviesTemplates(comedyList, $comedyContainer)
	createMoviesTemplates(sciFicList, $sciFicContainer)
	createMoviesTemplates(horrorList, $horrorContainer)
	//Obtiene las peliculas realacionadas con la consulta en el formulario
	async function getMovie(url) {
		const response	 = await fetch(url)
		const res 		 = await response.json()
		const r 		 = res.data.movies
		return r
	}
	//Realiza la consulta y genera el template de las peliculas encontradas
	$form.addEventListener('submit', async (ev) =>{
		ev.preventDefault()	
		$findMovie.innerHTML = ''
		const inputData	  = new FormData($form)
		const movies 	  = await getMovie(`${URL_MOVIES_API}limit=5&query_term=${inputData.get('title')}`)
		const HTMLString  = createMoviesTemplates(movies, $findMovie)
		$inputMovie.value = ''
	})
})()