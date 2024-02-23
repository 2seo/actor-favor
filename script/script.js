const key = "b2f183b0405d9fd994b135a9c40c0215";

const searchSection = document.querySelector(".search-section");
const searchBtn = searchSection.querySelector("button");
const searchValue = searchSection.querySelector("input");

searchBtn.addEventListener('click', () => {
  const value = searchValue.value;
  getList(value);
});

var resultSection = document.querySelector(".result-section");
var results = resultSection.querySelectorAll(".results");
var buttons = resultSection.querySelectorAll("button");

const getList = (movieName) => {
  if (movieName === null || movieName === "") {
    alert("영화 제목을 입력하세요.")
  } else {
    fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${key}&movieNm=${movieName}`)
      .then(res => res.json())
      .then(data => {
        returnList(movieName, data.movieListResult);
      })
      .catch(error => console.log(error));
  }
}
const returnList = (movieName, result) => {
  const resultSection = document.querySelector(".result-section");
  resultSection.innerHTML = `
  <span>"${movieName}"의 검색결과(${result.totCnt}건)</span>
  ${result.movieList.map((m) => {
    return `
        <div key=${m.movieCd} class="results">
          <span>${m.movieNm}(${m.prdtYear})</span>
          <span>${m.directors[0]?.peopleNm || ""}</span>
          <button id=${m.movieCd} class="select-button">영화 선택</button>
        </div>
        `
    })
      }
  `;
  const buttons = [...document.querySelectorAll(".select-button")];
  buttons.map((btn) => {
    btn.addEventListener('click', ()=> {
      getMovieInfo(btn.id);
    })
  })

}

const getMovieInfo = (movieCode) => {
  fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${key}&movieCd=${movieCode}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}