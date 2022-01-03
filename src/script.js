const getData = (isSearch, url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=517f7a208cae496c868b9a03fa95b109`) => {
  // Jika ada value di input
  if (isSearch) {
    if (isSearch == "") {
      getData(false);
    }

    axios
      .get(url + `&q=` + isSearch)
      .then(function (response) {
        console.log(response);
        displayData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios
      .get(url)
      .then(function (response) {
        displayData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

const displayData = (data) => {
  let result = "";
  if (data.totalResults < 1) {
    result = `<h3 class="text-center">Artikel Tidak Ditemukan</h3>`;
    document.getElementById("container-articels").innerHTML = result;
  } else {
    data.articles.forEach((data) => {
      result += `
        <div class="card" style="width: 15rem;">
        <img src="${data.urlToImage}" class="card-img-top" alt="Image">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text"><small class="text-muted">${data.author},${data.publishedAt}</small></p>
          <p class="card-text">${data.description}</p>
          <a href="${data.url}" class="btn btn-primary" target="__blank">Read More....</a>
        </div>
      </div>
            `;
      document.getElementById("container-articels").innerHTML = result;
    });
  }
};

getData(false);
