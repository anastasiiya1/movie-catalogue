import{a as m}from"./assets/vendor-af591e2d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const h="https://api.themoviedb.org/3",y="/trending/movie/week",v="598d894135bb5dfa4bf6d8e6fe6006eb",l={container:document.querySelector(".js-movie-list"),loadBtn:document.querySelector(".js-load-more"),guard:document.querySelector(".js-guard")};let u=1,b={root:null,rootMargin:"100px",threshold:1},L=new IntersectionObserver($,b);f(u).then(r=>{l.container.insertAdjacentHTML("beforeend",d(r.results)),r.page<500&&L.observe(l.guard)}).catch(r=>console.log(r.message));async function f(r=1){const{data:s}=await m(`${h}${y}`,{params:{api_key:v,page:r}});return s}function d(r){return r.map(({id:s,poster_path:n,original_title:o,release_date:e,vote_average:t})=>{const a=Math.floor(t/2),p=t%2!==0,g=5-Math.ceil(t/2);let c="";for(let i=0;i<a;i++)c+='<use href="/img/rating.svg#stars-full-star"></use>';p&&(c+='<use href="/img/rating.svg#stars-half-star"></use>');for(let i=0;i<g;i++)c+='<use href="/img/rating.svg#stars-empty-star"></use>';return`
            <li class='movie-card' data-id='${s}'>
              <img src='https://image.tmdb.org/t/p/w500${n}' alt='${o}'>
              <div class='movie-info'>
                  <h2>${o}</h2>
                  <p>Release date: ${e}</p>
                  <p class="rating-container">
                      <svg aria-hidden="true" focusable="false" class="rating">
                          ${c}
                      </svg>
                  </p>
                  <span class='vote-average'>${Math.floor(t*10)/10}</span>
              </div>
            </li>
          `}).join("")}function $(r,s){r.forEach(async n=>{if(n.isIntersecting){u+=1;try{const o=await f(u);l.container.insertAdjacentHTML("beforeend",d(o.results)),o.page>=500&&s.unobserve(n.target)}catch{alert(error.message)}}})}l.container.addEventListener("click",M);function M(r){r.currentTarget.contains("movie-card")}
//# sourceMappingURL=commonHelpers.js.map
