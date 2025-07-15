  const fetchNewsArticles = async () => {
    try {
      const response = await fetch("http://localhost:8000/news");
      const newsData = await response.json();

      let newsHTML = "";

      newsData.forEach((article) => {
        newsHTML += `
          <div class="col-md-4" style="margin-bottom: 40px;">
              <div class="card h-100 text-bg-dark">
                  <img src="${article.img}"  class="card-img-top banner">
                  <div class="card-body">
                      <h4 style="font-weight:bolder; text-align:center" class="card-title">${article.article}</h4>
                      <p class="card-text">
                        ${article.title}
                      </p>
                  </div>
                  <div class="card-footer">
                      <a target="_blank" href="${article.link}" class="btn btn-link">Visit Article</a>
                  </div>
              </div>
          </div>
        `;
      });

      document.querySelector('.js-news-row').innerHTML = newsHTML;

    } catch (error) {
      console.error("Error fetching F1 news:", error);
      document.querySelector('.js-news-row').innerHTML = `
      <p class="text-danger">⚠️ Failed to load latest news articles. you can read these old articles.</p>
        <div class="col-md-4" style="margin-bottom: 40px;">
              <div class="card h-90 text-bg-dark">
                  <img src="https://cdn.racingnews365.com/2025/Norris/_1456x910_crop_center-center_65_none/14011700/Norris-Piastri-Imola.webp?v=1747642222" class="card-img-top banner">
                  <div class="card-body">
                      <h4 style="font-weight:bolder; text-align:center " class="card-title">RN 365</h4>
                      <p class="card-text">
                        The McLaren F1 title fight hit a new level in Canada last weekend when Lando Norris and Oscar Piastri collided.
                      </p>
                  </div>
                  <div class="card-footer">
                      <a target="_blank" href="https://racingnews365.com/mclaren-make-f1-team-order-declaration-after-lando-norris-oscar-piastri-crash" class="btn btn-link">Visit Article</a>
                  </div>
              </div>
          </div>
          <div class="col-md-4" style="margin-bottom: 40px;">
              <div class="card h-90 text-bg-dark">
                  <img src="https://r.testifier.nl/Acbs8526SDKI/resizing_type:fit/width:1080/height:720/plain/https://s3-newsifier.ams3.digitaloceanspaces.com/gpblog.com/images/2025-06/lachende-sergio-perez.jpg@webp" 
                  class="card-img-top banner">
                  <div class="card-body">
                      <h4 style="font-weight:bolder; text-align:center" class="card-title">GP BLOG</h4>
                      <p class="card-text">
                          'Sergio Perez will return to Formula 1 in 2026.' according to Carlos Slim, the Mexican billionaire, who played a significant role in Checo's career.
                      </p>
                  </div>
                  <div class="card-footer">
                      <a target="_blank" href="https://www.gpblog.com/en/news/sergio-perez-returns-to-formula-1-in-2026" class="btn btn-link">Visit Article</a>
                  </div>
              </div>
          </div>
          <div class="col-md-4" style="margin-bottom: 40px;">
              <div class="card h-100 text-bg-dark">
                  <img src="https://cdn-8.motorsport.com/images/amp/2QzA4bXY/s1200/brad-pitt-at-the-world-premier-2.webp"  class="card-img-top banner">
                  <div class="card-body">
                      <h4 style="font-weight:bolder; text-align:center" class="card-title">AUTOSPORT</h4>
                      <p class="card-text">
                        Pitt makes F1 car debut in McLaren test at COTA
                      </p>
                  </div>
                  <div class="card-footer">
                      <a target="_blank" href="https://www.autosport.com/f1/news/pitt-makes-f1-car-debut-in-mclaren-test-at-cota/10734697/" class="btn btn-link">Visit Article</a>
                  </div>
              </div>
          </div>
        </div>
      `;
    }
  };

  // Call on page load
  document.addEventListener("DOMContentLoaded", fetchNewsArticles);