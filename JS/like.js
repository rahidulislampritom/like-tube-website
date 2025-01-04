function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}



//bring categories from api
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
};



// bring all videos from api
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error));

};

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
        .catch(err => console.log(err));
}

// const cardDemo = {

//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."

// }




// display categories by appending in html (another nav for button)
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
        // console.log(item);
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button onclick = "loadCategoryVideos(${item.category_id})" class = "btn lg:text-2xl">
            ${item.category}
            </button>
        `
        categoryContainer.append(buttonContainer);
    })
};




// display all videos by appending in html (all videos append in this section)
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact lg:mb-8"
        card.innerHTML = `
  <figure class ="h-60 relative">
    <img class = "w-full h-full object-cover rounded-lg" src=${video.thumbnail} />
    ${video.others.posted_date?.length == 0
                ? ""
                : `<span class="bg-black px-2 rounded-md absolute bottom-2 right-4 text-white">${getTimeString(
                    video.others.posted_date)}</span>`
            }
    
  </figure>

    <div class="flex gap-3 mt-1 items-center">

        <div class="h-10 w-10 rounded-full">
            <img class="h-full w-full rounded-full object-cover" src=${video.authors[0].profile_picture}>
        </div>

        <div>

            <h2 class="text-lg font-semibold">${video.title}</h2>

            <div class="flex items-center gap-2">

                <div>
                <p>${video.authors[0].profile_name}</p>
                </div>

                <div class="w-4 h-4">
                ${video.authors[0].verified === true
                ? "<img class='w-full h-full' src='./assets/icons8-verified-badge-32.png'></img>"
                : ""}
                </div>

            </div>

            <p>${video.others.views}</p>
        </div>
    </div>
    `
        videoContainer.append(card);
        

    })

}





loadCategories()
loadVideos()