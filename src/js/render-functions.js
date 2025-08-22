import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const galleryElem = document.querySelector('.gallery');
let lightbox = new SimpleLightbox(".gallery a");

export function createGallery(images) {
  return images.map(img => 
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img 
          class="gallery-image"
          src="${img.webformatURL}" 
          alt="${img.tags}" 
          loading="lazy"
        />
      </a>
      <div class="gallery-box">
        <p class="gallery-box-text">Likes <span class="gallery-box-span">${img.likes}</span></p>
        <p class="gallery-box-text">Views <span class="gallery-box-span">${img.views}</span></p>
        <p class="gallery-box-text">Comments <span class="gallery-box-span">${img.comments}</span></p>
        <p class="gallery-box-text">Downloads <span class="gallery-box-span">${img.downloads}</span></p>
      </div>
    </li>
  ).join('');
}

export function clearGallery() {
  galleryElem.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}

export function showLoadMoreButton() {
  document.querySelector('.btn-load').classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.btn-load').classList.add('is-hidden');
}

export function loadMoreBtnVisibleStatus(totalHits, page, per_page = 15) {
  const maxPage = Math.ceil(totalHits / per_page);
  if (page < maxPage) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}

export function scrollNewContent() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}