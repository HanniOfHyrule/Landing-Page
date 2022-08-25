/**
 * Define Global Variables
 *
 */

const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const links = navList.getElementsByTagName("a");
let currentSection = null;

// create the nav &  links

for (const section of sections) {
  const li = document.createElement("li");
  li.className = "menu__link";
  const a = document.createElement("a");
  a.textContent = section.dataset.nav;
  a.href = `#${section.id}`;

  // add to the li-tag to the a-tags

  li.appendChild(a);
  navList.appendChild(li);
}

// navigation highlited after click-event and remove

function viewSection(e) {
  if (currentSection) {
    currentSection.style.color = null;
  }
  e.target.style.color = "yellow";
  currentSection = e.target;
}
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", viewSection);
}

//mobile Navbar toggle

function mobileBurgerBar() {
  const burgerToggle = document.getElementById("navbar__menu");
  if (burgerToggle === "navbar__menu") {
    burgerToggle += "responsive";
  } else {
    burgerToggle === "navbar__menu";
  }
  console.log(burgerToggle);
}

// Add class 'active' to section when near top of viewport and the sections as active

window.addEventListener("scroll", (e) => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const topDistance = section.getBoundingClientRect().top;
    if (topDistance > -5 && topDistance < 100) {
      section.classList.add("active-class");
    } else {
      section.classList.remove("active-class");
    }
  });
});

// Scroll smooth to section on link click

const scrollToSections = document.querySelectorAll('a[href^="#"');

for (let item of scrollToSections) {
  item.addEventListener("click", (e) => {
    let getHashValue = item.getAttribute("href");
    let target = document.querySelector(getHashValue);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    history.pushState(null, null, getHashValue);
    e.preventDefault();
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */
