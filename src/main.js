import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const BASE_URL = 'https://api.themoviedb.org/3';
const END_POINT = '/trending/movie/week';
const API_KEY = '598d894135bb5dfa4bf6d8e6fe6006eb';

const selectors = {
  container: document.querySelector('.js-movie-list'),
  loadBtn: document.querySelector('.js-load-more'),
  guard: document.querySelector('.js-guard'),
};

selectors.container.addEventListener('click', openCard);

let page = 1;

let options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(handlePagination, options);

fetchData(page)
  .then(data => {
    selectors.container.insertAdjacentHTML(
      'beforeend',
      createMarkup(data.results)
    );
    console.log(data);

    if (data.page < 500) {
      observer.observe(selectors.guard);
    }
  })
  .catch(error => console.log(error.message));

async function fetchData(page = 1) {
  const { data } = await axios(`${BASE_URL}${END_POINT}`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return data;
}

function createMarkup(arr) {
  return arr
    .map(({ id, poster_path, original_title, release_date, vote_average }) => {
      const fullStars = Math.floor(vote_average / 2);
      const hasHalfStar = vote_average % 2 !== 0;
      const emptyStars = 5 - Math.ceil(vote_average / 2);

      let stars = '';

      for (let i = 0; i < fullStars; i++) {
        stars += `<use href="#stars-full-star"></use>`;
      }

      if (hasHalfStar) {
        stars += `<use href="#stars-half-star"></use>`;
      }

      for (let i = 0; i < emptyStars; i++) {
        stars += `<use href="#stars-empty-star"></use>`;
      }

      return `
              <li class='movie-card' data-id='${id}'>
                <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt='${original_title}'>
                <div class='movie-info'>
                    <h2>${original_title}</h2>
                    <p>Release date: ${release_date}</p>
                    <p class="rating-container">
                        <svg aria-hidden="true" focusable="false" class="rating">
                            ${stars}
                        </svg>
                    </p>
                    <span class='vote-average'>${
                      Math.floor(vote_average * 10) / 10
                    }</span>
                </div>
              </li>
            `;
    })
    .join('');
}

function handlePagination(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;

      try {
        const movie = await fetchData(page);
        selectors.container.insertAdjacentHTML(
          'beforeend',
          createMarkup(movie.results)
        );

        if (movie.page >= 500) {
          observer.unobserve(entry.target);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  });
}

async function openCard(event) {
  if (event.target === event.currentTarget) {
    return;
  }

  const movieCard = event.target.closest('.movie-card');

  const movieId = movieCard.dataset.id;

  const response = await fetchData(page);
  const selectedMovie = response.results.find(
    movie => movie.id === Number(movieId)
  );

  const poster = selectedMovie.backdrop_path;
  const title = selectedMovie.original_title;
  const rating = Math.floor(selectedMovie.vote_average * 10) / 10;
  const description = selectedMovie.overview;

  const instance = basicLightbox.create(`
  <div class='modal'>
  <img class='modal-img' src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}">
  <h2>${title}</h2>
  <h3>Film rating: ${rating}</h3>
  <p>${description}</p>
  </div>
  `);

  instance.show();
}
