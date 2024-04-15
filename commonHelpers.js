import{a as m}from"./assets/vendor-af591e2d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const h="https://api.themoviedb.org/3",y="/trending/movie/week",b="598d894135bb5dfa4bf6d8e6fe6006eb",l={container:document.querySelector(".js-movie-list"),loadBtn:document.querySelector(".js-load-more"),guard:document.querySelector(".js-guard")};let u=1,v={root:null,rootMargin:"100px",threshold:1},M=new IntersectionObserver(L,v);d(u).then(t=>{l.container.insertAdjacentHTML("beforeend",f(t.results)),console.log(t),t.page<500&&M.observe(l.guard)}).catch(t=>console.log(t.message));async function d(t=1){const{data:s}=await m(`${h}${y}`,{params:{api_key:b,page:t}});return s}function f(t){return t.map(({id:s,poster_path:a,original_title:o,release_date:e,vote_average:r})=>{const i=Math.floor(r/2),g=r%2!==0,p=5-Math.ceil(r/2);let c="";for(let n=0;n<i;n++)c+='<use href="https://anastasiiya1.github.io/pagination/img/rating.svg#stars-full-star"></use>';g&&(c+='<use href="https://anastasiiya1.github.io/pagination/img/rating.svg#stars-half-star"></use>');for(let n=0;n<p;n++)c+='<use href="https://anastasiiya1.github.io/pagination/img/rating.svg#stars-empty-star"></use>';return`
            <li class='movie-card' data-id='${s}'>
              <img src='https://image.tmdb.org/t/p/w500${a}' alt='${o}'>
              <div class='movie-info'>
                  <h2>${o}</h2>
                  <p>Release date: ${e}</p>
                  <p class="rating-container">
                      <svg aria-hidden="true" focusable="false" class="rating">
                          ${c}
                      </svg>
                  </p>
                  <span class='vote-average'>${Math.floor(r*10)/10}</span>
              </div>
            </li>
          `}).join("")}function L(t,s){t.forEach(async a=>{if(a.isIntersecting){u+=1;try{const o=await d(u);l.container.insertAdjacentHTML("beforeend",f(o.results)),o.page>=500&&s.unobserve(a.target)}catch{alert(error.message)}}})}l.container.addEventListener("click",$);async function $(t){if(t.target===t.currentTarget)return;const a=t.target.closest(".movie-card").dataset.id,o=await results.find(e=>e.id===Number(a));console.log(o)}
//# sourceMappingURL=commonHelpers.js.map
