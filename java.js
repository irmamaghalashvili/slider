let data = [
  {
    id: 1,
    imageUrl: "images/s1.jpg",
    title: "nature title 1",
  },
  {
    id: 2,
    imageUrl: "images/s2.jpg",
    title: "nature title 2",
  },
  {
    id: 3,
    imageUrl: "images/s3.jpg",

    title: "nature title 3",
  },
  {
    id: 4,
    imageUrl: "images/s4.jpg",
    title: "nature title 4",
  },
];

let arrowLeft = document.getElementById("arrow-left");
let arrowRight = document.getElementById("arrow-right");
let sliderContent = document.getElementById("sider-content");
let sliderIndex = 0;

function createDivTag() {
  let divTag = document.createElement("div");
  divTag.classList.add("slide");

  return divTag;
}

function createImgTag(item) {
  let tagImage = document.createElement("img");
  tagImage.setAttribute("src", item.imageUrl);
  tagImage.setAttribute("alt", item.title);

  return tagImage;
}

function createTiTleTag(item) {
  let tagTitle = document.createElement("h3");
  tagTitle.innerText = item.title;

  return tagTitle;
}
function createDots() {
  let dotsParent = document.createElement("div");
  dotsParent.classList.add("dotParent");

  data.forEach((element) => {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dotsParent.appendChild(dot);
  });
  return dotsParent;
}
function slider() {
  sliderContent.innerHTML = "";
  let slideItem = createDivTag(data[sliderIndex]);
  let imgTag = createImgTag(data[sliderIndex]);
  let titleTag = createTiTleTag(data[sliderIndex]);
  let dotsElemen = createDots();
  slideItem.appendChild(imgTag);
  slideItem.appendChild(titleTag);
  sliderContent.appendChild(slideItem);
  sliderContent.appendChild(dotsElemen);
}

function arrowLeftClick() {
  if (sliderIndex == 0) {
    sliderIndex = data.length - 1;
    slider();
    return;
  }
  sliderIndex--;
  slider();
}
function arrowRightClick() {
  if (sliderIndex == data.length - 1) {
    sliderIndex = 0;
    slider();
    return;
  }
  sliderIndex++;
  slider();
}

arrowLeft.addEventListener("click", arrowLeftClick);

arrowRight.addEventListener("click", arrowRightClick);

setInterval(() => {
  arrowRightClick();
}, 3000);

slider();

// registracion form
let regForm = document.getElementById("reg-form");

regForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  let userNameValue = document.getElementById("userNameField").value;
  if (userNameValue == "") {
    errors.username = "Enter Username";
  }
  let passwordValue = document.getElementById("passwordField").value;
  let passwordValue2 = document.getElementById("passwordFildRepeat").value;
  if (passwordValue != passwordValue2) {
    errors.password2 = "Passwords do NOT match";
  }
  if (passwordValue == "") {
    errors.password = "Enter your password";
  }
  let agreeField = document.getElementById("agreeTearms").checked;
  if (!agreeField) {
    errors.agree = "You mast agree with tearsm and conditions";
  }
  document.querySelectorAll(".error-text").forEach((item) => {
    item.innerText = " ";
  });
  for (let key in errors) {
    let spanText = document.getElementById("error_" + key);

    if (spanText) {
      spanText.innerText = errors[key];
    }
  }
    if (Object.keys(errors).length == 0) {
        regForm.onsubmit();
    }
});

let password = document.getElementById('passwordField');
let icon = document.getElementById('passicon');

icon.addEventListener('click', function() {
    if (password.type == 'password') {
        password.setAttribute('type', 'text');
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        password.setAttribute('type', 'password')
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
})
let password2 = document.getElementById('passwordFildRepeat');
let icon2 = document.getElementById('passicon2');

icon2.addEventListener('click', function() {
    if (password2.type == 'password') {
        password2.setAttribute('type', 'text');
        icon2.classList.remove('fa-eye');
        icon2.classList.add('fa-eye-slash');
    } else {
        password2.setAttribute('type', 'password')
        icon2.classList.remove('fa-eye-slash')
        icon2.classList.add('fa-eye')
    }
})

// splide
var currentImage;
var splide;
var previousButton, nextButton;
var thumbnails, thumbnailButtons;

window.addEventListener("DOMContentLoaded", function () {
  currentImage = document.querySelector(".current-image");
  previousButton = document.querySelector(".carousel .previous-button");
  nextButton = document.querySelector(".carousel .next-button");
  thumbnails = document.querySelectorAll(".carousel .thumbnail");
  thumbnailButtons = document.querySelectorAll(".carousel .thumbnail-button");

  thumbnailButtons.forEach(function (thumbnailButton) {
    thumbnailButton.addEventListener("click", function () {
      activateThumbnail(thumbnailButton);
    });
  });

  splide = new splide(".splide", {
    gap: "1px",
    padding: {
      left: "25px",
      right: "25px",
    },
    arrows: false,
    perPage: 3,
    pagination: false,
    keyboard: false, // Splide listens to key events at the document level and moves ALL carousels when arrow keys are used. Also, keyboard controls are not expected by real users.
    slideFocus: false, // removes tabindex="0" from each slide wrapper, since we only want our links inside each slide to receive focus.
  }).mount();

  // To prevent animation issues, let's make every slide visible before a transition happens. Splide will then automatically remove the `.is-visible` class from non-visible slides once the transition is finished.
  splide.on("move", function () {
    var slides = document.querySelectorAll(".splide .splide__slide");

    slides.forEach(function (slide) {
      slide.classList.add("is-visible");
    });
  });

  // Go to the previous slide when the Previous button is activated
  previousButton.addEventListener("click", function () {
    splide.go("<");
  });

  // Go to the next slide when the Next button is activated
  nextButton.addEventListener("click", function () {
    splide.go(">");
  });
});

/**
  Update the large current image when a thumbnail button is activated.
*/
function activateThumbnail(thumbnailButton) {
  // Swap the current image based to match the thumbnail
  // - If you'd like to use separate images, like higher-res versions, consider using the index to pick an appropriate src string from an array, or storing the URI of the higher-res image in a custom data attribute on the thumbnail.
  var newImageSrc = thumbnailButton.querySelector("img").getAttribute("src");
  var newImageAlt = thumbnailButton
    .querySelector("img")
    .getAttribute("data-full-alt");
  currentImage.querySelector("img").setAttribute("src", newImageSrc);
  currentImage.querySelector("img").setAttribute("alt", newImageAlt);

  // Remove aria-current from any previously-activated thumbnail
  thumbnailButtons.forEach(function (button) {
    button.removeAttribute("aria-current");
  });

  // Indicate to screen readers which thumbnail is selected using aria-current
  thumbnailButton.setAttribute("aria-current", true);
}
