const key = "b2f183b0405d9fd994b135a9c40c0215";

const searchSection = document.querySelector(".search-section");
const searchBtn = searchSection.querySelector("button");
const searchValue = searchSection.querySelector("input");

searchBtn.addEventListener('click' , () => {
  const value = searchValue.value;
  getCode(value);
});

const getCode = (movieName) => {
  if(movieName===null || movieName==="") {
    alert("영화 제목을 입력하세요.")
  } else {
    fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${key}&movieNm=${movieName}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      getMovieInfo(data.movieListResult.movieList[0].movieCd);
    })
    .catch(error => console.log(error));
  }
}

const getMovieInfo = (movieCode) => {
  fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${key}&movieCd=${movieCode}`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

  // 영화 이름 -> 영화 코드 가져와야함
  // fetch 코드 함수화 하기
  // key 따로 빼기