import { galleryItems } from './app.js';

const galleryRefersArray = galleryItems.map(item => item.original);

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightboxContainer: document.querySelector('.js-lightbox'),
  closeButton: document.querySelector('.lightbox__button'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay')
};

const stringsMarkup = galleryItems.reduce((acc, { preview, original, description }) =>
  acc += `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`, ''
);

refs.galleryContainer.insertAdjacentHTML('afterbegin', stringsMarkup);

refs.galleryContainer.addEventListener('click', onClickImage);

function onClickImage(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return
  };
  refs.lightboxContainer.classList.add('is-open');
  refs.lightboxImage.setAttribute("src", event.target.dataset.source);
  refs.lightboxImage.setAttribute("alt", event.target.getAttribute("alt"));
  refs.lightboxContainer.addEventListener('click', onClickClose);
  window.addEventListener("keydown", onPressKey);
};

function onClickClose(event) {
  if (event.target !== refs.lightboxImage) {
    refs.lightboxContainer.classList.remove('is-open');
    refs.lightboxImage.src = "";
    refs.lightboxImage.alt = "";
    refs.closeButton.removeEventListener('click', onClickClose);
    window.removeEventListener("keydown", onPressKey);
  }
};

function onPressKey(event) {

  if (event.code === "Escape") {
    onClickClose(event)
  }
  else if
    (event.code === "ArrowRight") {
    const currentNumber = galleryRefersArray.indexOf(refs.lightboxImage.getAttribute("src"));
    if (currentNumber < (galleryRefersArray.length - 1)) {
      refs.lightboxImage.src = galleryItems[currentNumber + 1].original;
      refs.lightboxImage.setAttribute.alt = [currentNumber + 1].description;
    }
  }
  else if
    (event.code === "ArrowLeft") {
    const currentNumber = galleryRefersArray.indexOf(refs.lightboxImage.getAttribute("src"));
    if (currentNumber > 0) {
      refs.lightboxImage.src = galleryItems[currentNumber - 1].original;
      refs.lightboxImage.alt = galleryItems[currentNumber - 1].description;
    }
  }
}