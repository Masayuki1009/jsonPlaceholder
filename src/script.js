const BASE_URL = "https://jsonplaceholder.typicode.com";

const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const getRequest = async (endPoint, queryParams = []) => {
    try {
      const option = {
        method: httpMethods.GET,
        headers: {},
      };
  
      let url = `${BASE_URL}${endPoint}`;
  
      // add query params if any
      if (queryParams.length > 0) {
        queryParams.forEach((q, index) => {
          if (index === 0) return (url = url + `?${q.key}=${q.value}`);
  
          url = url + `&${q.key}=${q.value}`;
        });
      }
  
      const res = await fetch(url, option);
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };

let photos = [];
let filteredPhotos = [];

const photoContainer = document.querySelector("#photoContainer");
const photoSearch = document.querySelector("#photoSearch");

const fetchphotos = async (start, limit) => {
  try {
    const data = await getRequest("/photos", [
      {
        key: "_start",
        value: start,
      },
      {
        key: "_limit",
        value: limit,
      },
    ]);

    photos = data;
  } catch (error) {
    console.log(error);
  }
};

const renderPhotos = (photoList) => {
  photoContainer.innerHTML = "";

  photoList.forEach((photo) => {
    const photoEl = buildPhotoCard(photo)
    photoContainer.innerHTML += photoEl;
  });
};

const buildPhotoCard = (photo) => {
  return /*html*/ `
  <div class="thumbnail">
  <img src="${photo.thumbnailUrl}"/>
  <p>${photo.title}</p>
  </div>
  `;
};

const searchPhoto = (searchInput, photos) =>
  photos.filter((p) => p.title.match(new RegExp(searchInput, "gi")));

const filterPhotos = async () => {
  const searchInput = photoSearch.value;

  if (searchInput === "") {
    await fetchphotos(0, 12);
    renderPhotos(photos);
    return;
  }

  filteredPhotos = searchPhoto(searchInput, photos);
  renderPhotos(filteredPhotos);
};

const initPhotos = async () => {
  await fetchphotos(0, 12);
  renderPhotos(photos);
  photoSearch.addEventListener("keyup", filterPhotos);
};

initPhotos();
