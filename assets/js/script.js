const searchInput = document.getElementById("user-input")
const searchBtn = document.getElementById("searchbutton")

const searchInput1 = document.getElementById("user-input1")
const searchBtn1 = document.getElementById("searchbutton1")
// const history = document.getElementById("")
// const clearHistory = document.getElementById("")
const searchResults = document.getElementById("search-results");
// let searchHistory = JSON.parse(localStorage.getItem("search")) || []

// //Giphy apiKey
const apiKey1 = '3aOkUhqhHeSCKZu7WjMvBl1hPZu2xPSH'
// //wallhaven apiKey
const apiKey2 = '0ee7750f-1c0a-476b-8bca-77a33cfc6dd5'


// //search button functionality (API calls within eventListener to prevent calls from happening on search page)
searchBtn.addEventListener("click", function CallBoth(){
  api1();
  api2()
})

function api1() {
  homescreen.style.display = "none"
  searchResults.style.display = "block"
  fetch(`https://api.giphy.com/v1/gifs/search?q=${searchInput.value}&api_key=${apiKey1}&limit=3`)
    // .then(response => console.log(response))
    .then(response => response.json())
    .then(gifData => {
      console.log(gifData)
      for (i = 0; i < 3; i++) {

        //creates containers for gif outputs
        const gifContainer = document.createElement("img")
        gifContainer.src = gifData.data[i].images.original.url
        var gifResults = document.querySelector("#giphy-results")
        gifResults.append(gifContainer)
        searchResults.classList.remove("is-hidden")
      }
    })
}
function api2() {

  fetch(`https://api.harvardartmuseums.org/object?title=${searchInput.value}&classification=Paintings&apikey=${apiKey2}`)
    .then(response => response.json())
    .then(resData => {
      console.log(resData)
      for (i = 0; i < 3; i++) {
        if (resData.records[i].images.length) {
          // creates containers for gif outputs
          const gifContainer = document.createElement("img")
          gifContainer.src = resData.records[i].images[0].baseimageurl
          var gifResults = document.querySelector("#art-results")
          gifResults.append(gifContainer)
        }
        searchResults.classList.remove("is-hidden")
      }
    })
}

//       fetch(`wallpaperapi`)
//         .then(response => response.JSON())
//         .then(wallpaperData => {
//           // manipulate DOM here
//         })
//       // for loop setup for API call 1 
//       for (i = 0; i < 3; i++) {
//         //creates containers for gif outputs
//         const gifContainer = document.createElement("")
//       }
//       search_result.innerHTML = `<img src=${data.file} alt="wallpaper 1" />`
//     }
//     );

//   //for loop setup for API call 2
//   for (i = 0; i < 3; i++) {
//     //creates containers for wallpaper outputs
//     const WallpaperContainer = document.createElement("")
//   }

// //creates and appends search history
// function renderSearchHistory() {
//   history.innerHTML = ""
//   for (let i = 0; i < searchHistory.length; i++) {
//     const historyEl = document.createElement("input");
//     historyEl.setAttribute("type", "text");
//     historyEl.setAttribute("readonly", true);
//     historyEl.setAttribute("value", searchHistory[i]);
//     historyEl.setAttribute("class", "bg-secondary rounded text-light mt-3 mb-3")
//     historyEl.addEventListener("click", function () {
//       placeholder(historyEl.value);
//     })
//     history.append(historyEl);
//   }
// }

// //clears history on click
// clearHistory.addEventListener("click", function () {
//   searchHistory = [];
//   renderSearchHistory()
// })