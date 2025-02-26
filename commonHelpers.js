import g from"axios";import{b as h}from"./assets/vendor-1795e137.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const b="https://api.themoviedb.org/3",v="/trending/movie/week",y="598d894135bb5dfa4bf6d8e6fe6006eb",l={container:document.querySelector(".js-movie-list"),loadBtn:document.querySelector(".js-load-more"),guard:document.querySelector(".js-guard")};l.container.addEventListener("click",M);let d=1,$={root:null,rootMargin:"100px",threshold:1},w=new IntersectionObserver(L,$);p(d).then(r=>{l.container.insertAdjacentHTML("beforeend",m(r.results)),r.page<500&&w.observe(l.guard)}).catch(r=>console.log(r.message));async function p(r=1){const{data:o}=await g(`${b}${v}`,{params:{api_key:y,page:r}});return o}function m(r){return r.map(({id:o,poster_path:a,original_title:s,release_date:e,vote_average:t})=>{const n=Math.floor(t/2),u=t%2!==0,f=5-Math.ceil(t/2);let c="";for(let i=0;i<n;i++)c+='<use href="#stars-full-star"></use>';u&&(c+='<use href="#stars-half-star"></use>');for(let i=0;i<f;i++)c+='<use href="#stars-empty-star"></use>';return`
              <li class='movie-card' data-id='${o}'>
                <img src='https://image.tmdb.org/t/p/w500${a}' alt='${s}'>
                <div class='movie-info'>
                    <h2>${s}</h2>
                    <p>Release date: ${e}</p>
                    <p class="rating-container">
                        <svg aria-hidden="true" focusable="false" class="rating">
                            ${c}
                        </svg>
                    </p>
                    <span class='vote-average'>${Math.floor(t*10)/10}</span>
                </div>
              </li>
            `}).join("")}function L(r,o){r.forEach(async a=>{if(a.isIntersecting){d+=1;try{const s=await p(d);l.container.insertAdjacentHTML("beforeend",m(s.results)),s.page>=500&&o.unobserve(a.target)}catch(s){alert(s.message)}}})}async function M(r){if(r.target===r.currentTarget)return;const a=r.target.closest(".movie-card").dataset.id,e=(await p(d)).results.find(i=>i.id===Number(a)),t=e.backdrop_path,n=e.original_title,u=Math.floor(e.vote_average*10)/10,f=e.overview;h.create(`
  <div class='modal'>
  <img class='modal-img' src="https://image.tmdb.org/t/p/w500${t}" alt="${n}">
  <h2>${n}</h2>
  <h3>Film rating: ${u}</h3>
  <p>${f}</p>
  </div>
  `).show()}
//# sourceMappingURL=commonHelpers.js.map
