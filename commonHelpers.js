import{a as g,b as h}from"./assets/vendor-3783c3cd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const b="https://api.themoviedb.org/3",v="/trending/movie/week",y="598d894135bb5dfa4bf6d8e6fe6006eb",l={container:document.querySelector(".js-movie-list"),loadBtn:document.querySelector(".js-load-more"),guard:document.querySelector(".js-guard")};l.container.addEventListener("click",M);let d=1,$={root:null,rootMargin:"100px",threshold:1},w=new IntersectionObserver(L,$);p(d).then(r=>{l.container.insertAdjacentHTML("beforeend",m(r.results)),console.log(r),r.page<500&&w.observe(l.guard)}).catch(r=>console.log(r.message));async function p(r=1){const{data:s}=await g(`${b}${v}`,{params:{api_key:y,page:r}});return s}function m(r){return r.map(({id:s,poster_path:n,original_title:o,release_date:e,vote_average:t})=>{const a=Math.floor(t/2),u=t%2!==0,f=5-Math.ceil(t/2);let c="";for(let i=0;i<a;i++)c+='<use href="#stars-full-star"></use>';u&&(c+='<use href="#stars-half-star"></use>');for(let i=0;i<f;i++)c+='<use href="#stars-empty-star"></use>';return`
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
            `}).join("")}function L(r,s){r.forEach(async n=>{if(n.isIntersecting){d+=1;try{const o=await p(d);l.container.insertAdjacentHTML("beforeend",m(o.results)),o.page>=500&&s.unobserve(n.target)}catch{alert(error.message)}}})}async function M(r){if(r.target===r.currentTarget)return;console.log("ok");const n=r.target.closest(".movie-card").dataset.id,e=(await p(d)).results.find(i=>i.id===Number(n)),t=e.backdrop_path,a=e.original_title,u=Math.floor(e.vote_average*10)/10,f=e.overview;h.create(`
  <div class='modal'>
  <img class='modal-img' src="https://image.tmdb.org/t/p/w500${t}" alt="${a}">
  <h2>${a}</h2>
  <h3>Film rating: ${u}</h3>
  <p>${f}</p>
  </div>
  `).show()}
//# sourceMappingURL=commonHelpers.js.map
