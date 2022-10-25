var searchInput = document.getElementById("user-input")
const searchBtn = document.getElementById("searchbutton")
var searchInput1 = document.getElementById("user-input1")
const searchBtn1 = document.getElementById("searchbutton1")
const history = document.getElementById("history")
// const clearHistory = document.getElementById("")
var searchResults = document.getElementById("search-results")
let searchHistory = JSON.parse(localStorage.getItem("search")) || []

//Giphy apiKey
const apiKey1 = '3aOkUhqhHeSCKZu7WjMvBl1hPZu2xPSH'
// //Quote Garden apiKey
const apiKey2 = '563492ad6f917000010000014e745c14ae944027b87993eea1ac6349'
var currentSearch = "";

// //search button functionality (API calls within eventListener to prevent calls from happening on search page)
searchBtn.addEventListener("click", function CallBoth(event) {
  event.preventDefault()

  currentSearch = searchInput.value
  searchHistory.push(currentSearch);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory()
  api1()
  api2()
})


function api1() {
  homescreen.style.display = "none"
  searchResults.style.display = "block"
  fetch(`https://api.giphy.com/v1/gifs/search?q=${currentSearch}&api_key=${apiKey1}&limit=1`)
    .then(response => response.json())
    .then(gifData => {
      console.log(gifData)
      var gifResults = document.querySelector("#giphy-results")
      gifResults.innerHTML = ""
      for (i = 0; i < 1; i++) {
        //creates containers for gif outputs
        var gifContainer = document.createElement("img")
        gifContainer.src = gifData.data[i].images.original.url
        var gifResults = document.querySelector("#giphy-results")
        gifResults.append(gifContainer)
        searchResults.classList.remove("is-hidden")
      }
    })
}

function api2() {
  fetch(`https://geek-jokes.sameerkumar.website/api?format=json`)
    .then(response => response.json())
    .then(resData => {
      console.log(resData)
      var quoteResults = document.querySelector("#quote-results")
      quoteResults.innerHTML = ""
      for (i = 0; i < 1; i++) {
        // creates containers for gif outputs
        var quoteContainer = document.createElement("p")
        quoteContainer.innerHTML = resData.joke
        var quoteResults = document.querySelector("#quote-results")
        quoteResults.append(quoteContainer)
        searchResults.classList.remove("is-hidden")
      }
    })
}

//creates and appends search history
function renderSearchHistory() {
  history.innerHTML = ""
  for (let i = 0; i < searchHistory.length; i++) {
    const historyEl = document.createElement("input");
    historyEl.setAttribute("type", "text");
    historyEl.setAttribute("readonly", true);
    historyEl.setAttribute("value", searchHistory[i]);
    historyEl.addEventListener("click", function () {
      currentSearch = historyEl.value
      api1();
      api2();
    })
    history.append(historyEl);
  }
}

//clears history on click
// clearHistory.addEventListener("click", function () {
//   searchHistory = [];
//   renderSearchHistory()
// })
