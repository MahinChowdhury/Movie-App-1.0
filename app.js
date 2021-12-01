//Burger Section
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
})

//Get Movie section

const API_key = 'api_key=c872f28e3ab253830fb3493c6fa42ee7';
const BaseAPI = 'https://api.themoviedb.org/3';
const API_popular = BaseAPI + '/discover/movie?sort_by=popularity.desc&' +  API_key;
const IMG_url = 'https://image.tmdb.org/t/p/w500';
const movieList = document.querySelector('.movie-list')
var movie;

getMovies(API_popular);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data){

    movieList.innerHTML='';

    data.forEach(movie => {
        const {title ,poster_path,vote_average,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movies');
        movieEl.innerHTML = `
            <img src="${IMG_url + poster_path}" alt="${title}" class="movie-img">
    
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <span style="color : ${getColor(vote_average)}" class="rating">${vote_average}</span>
            </div>

            <div class="overview">
                <h2>${title}</h2>
                <br>
                ${overview}
            </div>
        
        `

        movieList.appendChild(movieEl);
    })
}

function getColor(vote){
    if(vote>=8) return "chartreuse";
    else if(vote>=6) return "#dfff00";
    else return "#ff4500";
}

//search functionality

const form = document.querySelector('form');
const searchBox = document.querySelector('.search-box')

form.addEventListener("submit" , (e) => {
    e.preventDefault();

    const searchCont = searchBox.value;

    if(searchCont){
        getMovies(BaseAPI+'/search/movie?' + API_key + '&query=' + searchCont);
    }
    else{
        getMovies(API_popular);
    }

})