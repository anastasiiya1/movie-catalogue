import axios from 'axios';
import * as basicLightbox from 'basiclightbox';


const BASE_URL = 'https://api.themoviedb.org/3';
const END_POINT = '/trending/movie/week';
const API_KEY = '598d894135bb5dfa4bf6d8e6fe6006eb';

const selectors = {
  container: document.querySelector('.js-movie-list'),
  loadBtn: document.querySelector('.js-load-more'),
  guard: document.querySelector('.js-guard'),
};

// selectors.loadBtn.addEventListener('click', loadMore);

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

    // if (data.page < data.total_pages) {
    //   selectors.loadBtn.classList.toggle('load-more');
    // }
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
        stars += `<use href="./img/rating.svg#stars-full-star"></use>`;
      }

      if (hasHalfStar) {
        stars += `<use href="./img/rating.svg#stars-half-star"></use>`;
      }

      for (let i = 0; i < emptyStars; i++) {
        stars += `<use href="./img/rating.svg#stars-empty-star"></use>`;
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

// async function loadMore() {
//   page += 1;

//   selectors.loadBtn.disabled = true;

//   try {
//     const data = await fetchData(page);
//     selectors.container.insertAdjacentHTML(
//       'beforeend',
//       createMarkup(data.results)
//     );
//     selectors.loadBtn.disabled = false;

//     if (data.page >= 500) {
//       selectors.loadBtn.classList.toggle('load-more');
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// }

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

        if (movie.page >=500){
            observer.unobserve(entry.target)
        }
      } catch {
        alert(error.message);
      }
    }
  });
}

selectors.container.addEventListener('click', openCard);

