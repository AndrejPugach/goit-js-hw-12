import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();
  
  if (!query) {
    iziToast.warning({ title: "Увага", message: "Введи пошуковий запит!" });
    return;
  }

  gallery.innerHTML = "";
  loader.style.display = "block";

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.error({ title: "Помилка", message: "Нічого не знайдено!" });
    } else {
      gallery.innerHTML = createGallery(data.hits);
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({ title: "Помилка", message: "Щось пішло не так!" });
  } finally {
    loader.style.display = "none";
  }
});