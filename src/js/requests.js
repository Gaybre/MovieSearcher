const URL_MOVIES_API   = `https://yts.mx/api/v2/list_movies.json?`
const $comedyContainer = document.getElementById('comedy')
const $sciFicContainer = document.getElementById('sciFic')
const $horrorContainer = document.getElementById('horror')
const $inputMovie      = document.getElementById('inputMovie')
const $findMovie       = document.getElementById('findMovie')
const $form            = document.getElementById('form')
const $searchResults   = document.getElementById('searchResults')
const $searchResBtn    = document.getElementById('searchResultsButton')


;(async function getMovies() {
	//Realiza las consultas a la API y devuelve el listado de peliculas de la data
	async function getMoviesList(genre) {
		const URL = `${URL_MOVIES_API}genre=${genre}&order_by=asc`

		const response	 = await fetch(URL)
		const res 		 = await response.json()
		const r 		 = res.data.movies
		console.log(r)
		return r
	}
	//Almacenan un array con las listas de pelicula, pasando por parametro el genero
	const comedyList = await getMoviesList('comedy')
	const sciFicList = await getMoviesList('Sci-Fi')
	const horrorList = await getMoviesList('horror')
	//Template literal para devolver y crear un elemento por pelicula
	function movieItemTempleate(movie) {
		return(`
			<div class="carousel-item">
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
		`)
	}
	//Itera sobre cada pelicula de la lista y genera un item dentro del contenedor
	function createMoviesTemplates(list, container, template) {
		list.forEach(movie => {
			const HTMLString 	 = template(movie)
			container.innerHTML += HTMLString
		})
	}
	//Envía la lista a iterar y el contenedor para generar los items de las peliculas
	createMoviesTemplates(comedyList, $comedyContainer, movieItemTempleate)
	createMoviesTemplates(sciFicList, $sciFicContainer, movieItemTempleate)
	createMoviesTemplates(horrorList, $horrorContainer, movieItemTempleate)
	//Template literal para devolver y crear items de busqueda de peliculas
	function searchedMovieTemplate(movie) {
		return(`
			<div class="findMovie__item">
				<div class="findMovie__item--div1">
					<img class="findMovie__item--img" src="${movie.medium_cover_image}" alt="Img1">
				</div>
				<div class="findMovie__item--div2">
					<p class="findMovie__title">Titulo: ${movie.title}</p>
					<p class="findMovie__title">Titulo Largo: ${movie.title_long}</p>
					<p class="findMovie__title">Descripción:</p>
					<p class="carousel-item__details--title">${movie.summary}</p>
				</div>
				<div class="findMovie__item--div3">
					<img src="./src/img/play.png" alt="play"> 
					<p>Play</p>
				</div>
			</div>
		`)
	}
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
		$searchResults.classList.remove('hide')
		const inputData	  = new FormData($form)
		const movies 	  = await getMovie(`${URL_MOVIES_API}limit=5&query_term=${inputData.get('title')}`)
		const HTMLString  = createMoviesTemplates(movies, $findMovie, searchedMovieTemplate)
		$inputMovie.value = ''
	})
	//Oculta los resultados de la busqueda
	$searchResBtn.addEventListener('click', () => $searchResults.classList.add('hide'))
})()