//DOM Elements
const body = document.querySelector("body");
const burger = document.querySelector(".burger");
const headerLogo = document.querySelector(".header__logo");
const headerNavList = document.querySelector(".header__nav-list");
const shadow = document.querySelector(".shadow");
const linkActive = document.querySelector(".active-link");
const headerLogoTitle = document.querySelector(".header__logo-title");
const headerLogoSubtitle = document.querySelector(".header__logo-subtitle");

//popup
const cardButtons = document.querySelectorAll(".card-button");
const popup = document.querySelector(".popup");
const popupWindow = document.querySelector(".popup__window");
const popupCloseButton = document.querySelector(".popup__close-button");

const mobileMenu = () => {
  burger.classList.add("burger-active");
  headerLogo.classList.add("burger-active");
  headerNavList.classList.add("burger-active");
  shadow.classList.add("burger-active");
  headerLogoTitle.classList.add("burger-active");
  headerLogoSubtitle.classList.add("burger-active");

  document.body.style.overflowY = "hidden";
  burger.removeEventListener("click", mobileMenu);

  if (burger.classList.contains("burger-active")) {
    burger.addEventListener("click", function closeBurger() {
      burger.classList.remove("burger-active");
      headerLogo.classList.remove("burger-active");
      headerNavList.classList.remove("burger-active");
      headerLogoTitle.classList.remove("burger-active");
      headerLogoSubtitle.classList.remove("burger-active");
      shadow.classList.remove("burger-active");
      document.body.style.removeProperty("overflow-y");
      burger.removeEventListener("click", closeBurger);
      burger.addEventListener("click", mobileMenu);
    });
  }
};

linkActive.addEventListener("click", () => {
  burger.classList.remove("burger-active");
  headerLogo.classList.remove("burger-active");
  headerNavList.classList.remove("burger-active");
  shadow.classList.remove("burger-active");
});
burger.addEventListener("click", mobileMenu);

const popupDelay = () => {
  const catalogCard = document.querySelectorAll(".pets__catalog-card");
  catalogCard.forEach((el) =>
    el.addEventListener("click", (evt) => {
      popupPet(evt);
    })
  );
};

setInterval(popupDelay, 500);

async function popupPet(evt) {
  const url = `../pets.json`;
  const res = await fetch(url);
  const data = await res.json();
  body.classList.add("active");
  popup.classList.add("active");
  let name = evt.target
    .closest(".pets__catalog-card")
    .querySelector(".card-name").textContent;
  let currentIndexCardName = data.findIndex((elem) => elem.name === name);
  popupWindow.innerHTML = `
    <picture class="popup__window-image">
        <img src=${data[currentIndexCardName].img}>
    </picture>
    <div class="popup__window-text">
        <div class="popup-content__caption">
        <h3 class="popup-content__caption-title">${data[currentIndexCardName].name}</h3>
        <h4 class="popup-content__caption-subtitle">${data[currentIndexCardName].type} - ${data[currentIndexCardName].breed}</h4>
        </div>
        <h5 class="popup-content__description">${data[currentIndexCardName].description}</h5>
        <ul class="popup-content__list">
        <li class="popup-content__list-item" id="petAge">
            <h5 class="popup-content__list-item--text-black">
            <span class="popup-content__list-item--bold">Age : </span> ${data[currentIndexCardName].age}
            </h5>
        </li>
        <li class="popup-content__list-item" id="petInoculations">
            <h5 class="popup-content__list-item--text-black"><span class="popup-content__list-item--bold">Inoculations
                : </span>${data[currentIndexCardName].inoculations}</h5>
        </li>
        <li class="popup-content__list-item" id="petDiseases">
            <h5 class="popup-content__list-item--text-black"><span class="popup-content__list-item--bold">Diseases :
            </span>${data[currentIndexCardName].diseases}</h5>
        </li>
        <li class="popup-content__list-item" id="petParasites">
            <h5 class="popup-content__list-item--text-black"><span class="popup-content__list-item--bold">Parasites :
            </span>${data[currentIndexCardName].parasites}</h5>
        </li>
        </ul>
    </div>
    `;

  popup.addEventListener("click", (evt) => {
    if (
      evt.target.className === "popup__close-button" ||
      evt.target.className === "popup active"
    ) {
      popup.classList.remove("active");
      body.classList.remove("active");
    }
  });
}

var mySwiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
      slidesPerGroup: 2,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 90,
      slidesPerGroup: 3,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
