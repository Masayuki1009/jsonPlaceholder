const endpoint = "https://jsonplaceholder.typicode.com/photos?_limit=10";

let photos = [];
let filteredPhotos = [];

const photoContainer = document.querySelector("#photoContainer");
const photoSearch = document.querySelector("#photoSearch");

const renderPhotos = (photoList) => {
    photoContainer.innerHTML = "";

    photoList.forEach((photo) => {
    const photoEl = buildPhotoCard(photo)
    photoContainer.innerHTML += photoEl;
    });
};

const buildPhotoCard = (photo) => {
    return `
    <div class="thumbnail">
    <img src="${photo.thumbnailUrl}"/>
    <p>${photo.title}</p>
    </div>
    `;
};

const searchPhoto = (searchInput, photos) =>
  photos.filter((p) => p.title.match(new RegExp(searchInput, "gi")));

fetch(endpoint)
.then((res) => res.json())
.then((photos) =>{
  renderPhotos(photos)
  photoSearch.addEventListener("keyup", () =>{
    const searchInput = photoSearch.value;
    filteredPhotos = searchPhoto(searchInput, photos);
    renderPhotos(filteredPhotos);
  })
})


