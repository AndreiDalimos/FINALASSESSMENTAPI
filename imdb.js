const SEARCH_URL = "https://imdb-api.com/en/API/SearchMovie"
const MOVIE_PAGE_URL = "https://www.imdb.com/title";
const API_KEY = "k_x7667rxj";
const imdb_Result = document.querySelector('#imdb-search-results');
const movieSearch = document.querySelector("#movieSearch");
const movieForm = document.querySelector('.movieInput');

let movieInput = document.querySelector("#movieSearch").innerHTML;


movieSearch.addEventListener('change', (e) => {
	movieInput = movieSearch.value;
	searchMovie(movieInput);
});


movieForm.addEventListener('submit', (e) => {
	if (movieSearch.value.length == 0) {
		alert('please type in a movie name');
	}
	else {
		movieInput = movieSearch.value;
		searchMovie(movieInput);
		movieSearch.value = "";
	}

	e.preventDefault();
});

function searchMovie(movieName) {
	const url = `${SEARCH_URL}/${API_KEY}/${movieName}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data.results);
			const searchResultDiv = document.querySelector("#imdb-search-results");

			searchResultDiv.innerHTML = '';

			data.results.forEach(item => {
				const movieLink = `${MOVIE_PAGE_URL}/${item.id}`;
				const movieClickable = document.createElement('a');
				movieClickable.href = movieLink;
				movieClickable.target = "_blank";
				const movieImg = document.createElement('img');
				movieImg.src = item.image;
				movieImg.alt = item.title;
				movieImg.classList.add('imdb-images');
				movieClickable.appendChild(movieImg);
				searchResultDiv.appendChild(movieClickable);
			});
		})
		.catch(() => {
			alert("No movies found");
		});
};

