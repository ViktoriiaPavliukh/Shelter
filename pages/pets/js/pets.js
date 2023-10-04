let currentPage = 0;
const prevPage = document.querySelector(".pets__nav-paginator--prev");
const nextPage = document.querySelector(".pets__nav-paginator--next");
const firstPage = document.querySelector(".pets__nav-paginator--first");
const lastPage = document.querySelector(".pets__nav-paginator--last");
const petsCatalog = document.querySelector(".pets__catalog");

let screenWidth = window.innerWidth;
let itemsOnPage = 0;
let pets = []; // 8
let fullPetsList = []; // 48

function changeActiveNav() {
  document.querySelector(".pets__nav-paginator--current").textContent = (
    currentPage + 1
  ).toString();
  if (currentPage === fullPetsList.length / itemsOnPage - 1) {
    lastPage.classList.add("nav-disabled");
    lastPage.setAttribute("disabled", "true");
    nextPage.classList.add("nav-disabled");
    nextPage.setAttribute("disabled", "true");
    firstPage.classList.remove("nav-disabled");
    firstPage.removeAttribute("disabled");
    prevPage.classList.remove("nav-disabled");
    prevPage.removeAttribute("disabled");
  } else if (currentPage === 0) {
    firstPage.classList.add("nav-disabled");
    firstPage.setAttribute("disabled", "true");
    prevPage.classList.add("nav-disabled");
    prevPage.setAttribute("disabled", "true");
    lastPage.classList.remove("nav-disabled");
    lastPage.removeAttribute("disabled");
    nextPage.classList.remove("nav-disabled");
    nextPage.removeAttribute("disabled");
  } else {
    firstPage.classList.remove("nav-disabled");
    firstPage.removeAttribute("disabled");
    prevPage.classList.remove("nav-disabled");
    prevPage.removeAttribute("disabled");
    lastPage.classList.remove("nav-disabled");
    lastPage.removeAttribute("disabled");
    nextPage.classList.remove("nav-disabled");
    nextPage.removeAttribute("disabled");
  }
}

prevPage.addEventListener("click", (e) => {
  if (currentPage > 0) {
    currentPage--;
    petsCatalog.innerHTML = createElements(
      fullPetsList,
      currentPage,
      itemsOnPage
    );
  }
  changeActiveNav();
});

nextPage.addEventListener("click", (e) => {
  if (currentPage < fullPetsList.length / itemsOnPage - 1) {
    currentPage++;
    petsCatalog.innerHTML = createElements(
      fullPetsList,
      currentPage,
      itemsOnPage
    );
  }
  changeActiveNav();
});

lastPage.addEventListener("click", (e) => {
  currentPage = fullPetsList.length / itemsOnPage - 1;
  petsCatalog.innerHTML = createElements(
    fullPetsList,
    currentPage,
    itemsOnPage
  );
  changeActiveNav();
});

firstPage.addEventListener("click", (e) => {
  currentPage = 0;
  petsCatalog.innerHTML = createElements(
    fullPetsList,
    currentPage,
    itemsOnPage
  );
  changeActiveNav();
});

fetch("../pets.json")
  .then((res) => res.json())
  .then((list) => {
    pets = list;

    fullPetsList = (() => {
      let tempArr = [];

      for (let i = 0; i < 6; i++) {
        const newPets = pets;

        for (let j = pets.length; j > 0; j--) {
          let randInd = Math.floor(Math.random() * j);
          const randElem = newPets.splice(randInd, 1)[0];
          newPets.push(randElem);
        }

        tempArr = [...tempArr, ...newPets];
      }
      return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);
    try {
      document.querySelector(".pets__nav-paginator--current").textContent = (
        currentPage + 1
      ).toString();
    } catch (e) {}

    for (let i = 0; i < fullPetsList.length / 6; i++) {
      const stepList = fullPetsList.slice(i * 6, i * 6 + 6);

      for (let j = 0; j < 6; j++) {
        stepList.forEach((item, ind) => {
          if (item.name === stepList[j].name && ind !== j) {
            document.querySelector(".pets__catalog").children[
              i * 6 + j
            ].style.border = "5px solid red";
          }
        });
      }
    }
  });

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;

  list = sort6recursively(list);

  return list;
};

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < length / 6; i++) {
    const stepList = list.slice(i * 6, i * 6 + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && ind !== j;
      });

      if (duplicatedItem !== undefined) {
        const ind = i * 6 + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
};

const createPets = (petsList) => {
  petsCatalog.innerHTML = createElements(petsList, 0, itemsOnPage);
  card = document.querySelectorAll(".pets__catalog-card");
};

function createElements(petsList, page, itemsOnPage) {
  let index = page * itemsOnPage;
  let total = index + itemsOnPage;
  let str = "";
  for (index; index < total; index++) {
    str += `<a class="pets__catalog-card" data="${petsList[index].name}">
    <picture class="card-head">
      <img src="${petsList[index].img}" alt="${petsList[index].name}" data="${petsList[index].name}"/>
    </picture>
    <h4 class="card-name" data="${petsList[index].name}">${petsList[index].name}</h4>
    <button class="card-button button data="${petsList[index].name}">Learn more</button>
  </a>
    `;
  }

  return str;
}

window.addEventListener("resize", (e) => {
  currentPage = 0;
  changeActiveNav();
  checkScreenSize();
  petsCatalog.innerHTML = createElements(
    fullPetsList,
    currentPage,
    itemsOnPage
  );
});

function checkScreenSize() {
  let currentUrl = window.location.href.split("/");
  currentUrl = currentUrl[currentUrl.length - 1];

  screenWidth = window.innerWidth;
  if (screenWidth > 1279) {
    itemsOnPage = 8;
  } else if (screenWidth >= 768) {
    itemsOnPage = 6;
  } else {
    itemsOnPage = 3;
  }
}

//INIT

checkScreenSize();
