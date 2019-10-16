(function () {
  const MovieTypeData = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
	}
	const BASE_URL = "https://movie-list.alphacamp.io"
	const INDEX_URL = BASE_URL + "/api/v1/movies"
	const POSTER_URL = BASE_URL + "/posters/"
	const moviePanel = document.querySelector("#movie-panel")
	const footertag = document.querySelector(".card-footer")
	const data = []
	

	// 取得API資料放進變數data
	axios
	.get(INDEX_URL)
	.then( (response) => {
		response.data.results.forEach(movie => {
			data.push(movie)
			DisplayCard(data)
		})
	})


	// 把電影分類列出來
	const MovieType = document.querySelector("#movietype")
	for (let i = 1 ; i < 20 ; i++) {
		MovieType.innerHTML += `
		<a class="list-group-item list-group-item-action" id="${MovieTypeData[i]}" data-toggle="list" href="#list" role="tab">${MovieTypeData[i]}</a>
		`
	}
	

	// 用card模式顯示電影清單
	function DisplayCard (data) {
		let movieContent = ""
		data.forEach((item, index) => {
		// 每部電影的genres對應到MovieTypeData資料，並放置在footer位置
		let genres = item.genres
		let genresContent = ""

		for(let i = 0 ; i < genres.length ; i++) {
			genresContent += `
			<p class="genres${genres[i]}">${MovieTypeData[genres[i]]}</p>
			`
			}

			// 每部電影的海報及標題
			movieContent += `
				<div class="col-sm-3">
					<div class="card mb-2">
						<img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
						<div class="card-body movie-item-body">
							<h6>${item.title}</h6>
						</div>
						<div class="card-footer">
							<div class="row">
								${genresContent}
							</div>
						</div>
					</div>
				</div>
				`
		})
		moviePanel.innerHTML = movieContent
	}
	
	
	// 當點擊分類時，從每一部電影裡找出genres包含在MovieTypeData
	const movietypelist = document.querySelector("#movietypelist")
		
	movietypelist.addEventListener("click", function (event) {
		for(let i = 1 ; i < 20 ;i++) {
			if(event.target.matches(`#${MovieTypeData[i]}`)) {
				// 顯示有包含該類型的電影
				let dataKey =[]
				dataKey.push(data.filter((item) => {return item.genres.includes(i)}))
				console.log(...dataKey)
				DisplayCard(...dataKey)
				dataKey=[]
			}
		} 
	})

	
  
	
})()