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


const filterPhotos =  async () => {
  const searchInput = photoSearch.value;

  if (searchInput === "") {
    await fetch(endpoint);
    renderPhotos(photos);
    return;
  }
  
  filteredPhotos = searchPhoto(searchInput, photos);
  renderPhotos(filteredPhotos);
}


const initPhotos = async () => {
    const res = await fetch(endpoint)
    const photo = await res.json()
    renderPhotos(photo)
photoSearch.addEventListener("keyup", filterPhotos);
}
initPhotos();






