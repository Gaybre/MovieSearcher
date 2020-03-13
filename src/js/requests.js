const $comedyContainer = document.getElementById('comedy')
const $sciFicContainer = document.getElementById('sciFic')
const $horrorContainer = document.getElementById('horror');

(async function getMovies() {
	/*
	//Consulta general de peliculas a la API
	const URL_MOVIES_API = 'https://yts.mx/api/v2/list_movies.json';
	const URL_MOVIES_API = await fetch(`https://yts.mx/api/v2/list_movies.json?`)
	const response	 	 = await URL_MOVIES_API.json()
	console.log('pelis', response.data.movies)
	*/
	async function getMoviesList($nameList, genre) {
		const URL_MOVIES = await fetch(`https://yts.mx/api/v2/list_movies.json?genre=${genre}`)
		const response	 = await URL_MOVIES.json()
		console.log($nameList, response.data.movies)
		console.log(movieItemTempleate(response.data.movies))
	}

	const comedyList = await getMoviesList('Peliculas de Comedia', 'comedy')
	const sciFicList = await getMoviesList('Peliculas de Ciencia Ficción', 'Sci-Fi')
	const horrorList = await getMoviesList('Peliculas de Terror', 'horror')

	for(movie in movies) {

	}

	function movieItemTempleate($movie) {
		return(
			`<div class="carousel-item">
	            <img class="carousel-item__img" src="${$movie.background_image}" alt="Img1">
	            <div class="carousel-item__details">
	              <div>
	                <img class="carousel-item__icon" src="./src/img/play.png" alt="play">
	                <img class="carousel-item__icon" src="./src/img/add.png" alt="plus">
	              </div>
	              <p class="carousel-item__details--title">${$movie.title}</p>
	              <p class="carousel-item__details--subtitle">${$movie.title_long}</p>
	            </div>
	          </div>
			`
		)
	}

//	console.log(movieItemTempleate(movie))

})()

