// 'use strict';

document.addEventListener("DOMContentLoaded", () => {
  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  console.log(tabs);

  function hideTabsContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabsContent();
  showTabContent(0);

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2023-05-20";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 3600)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      if (t.total >= 0) {
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
      } else {
        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
      }

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Show modal window

  const show = document.querySelector(".btn"),
    someModalWindow = document.querySelector(".modal");

  function showModalWindow() {
    someModalWindow.classList.add("show");
    someModalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalInterval);
  }

  // Close modal window

  function hideModalWindow() {
    someModalWindow.classList.add("hide");
    someModalWindow.classList.remove("show");
    document.body.style.overflow = "";
  }

  show.addEventListener("click", showModalWindow);
  someModalWindow.addEventListener("click", (e) => {
    const target = e.target;

    if (
      target.classList.contains("modal__close") ||
      target.classList.contains("modal")
    ) {
      hideModalWindow();
    }
  });

  // Show modal window after 6s.

  const modalInterval = setInterval(showModalWindow, 6000);

  // Show window after scrolling

  window.addEventListener("scroll", () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModalWindow();
      window.removeEventListener("scroll");
    }
  });

  // class CreateCards

  class CreateCards {
    constructor(cardContainer, data) {
      this.card = document.querySelector(cardContainer);
      this.data = data;
    }

    create() {
      const { img, title, text, price } = this.data;

      const element = document.createElement("div");

      element.innerHTML = `
        <div class="menu__item">
          <img src=${img} alt="vegy">
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">${text}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${price}</span> грн/день</div>
          </div>
        </div>`;

      this.card.append(element);
    }
  }

  const cardOne = new CreateCards(".menu .container", {
    img: "img/tabs/vegy.jpg",
    title: 'Меню "Фитнес"',
    text: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    price: "200",
  });
  
  const cardTwo = new CreateCards(".menu .container", {
    img: "img/tabs/elite.jpg",
    title: 'Меню “Премиум”"',
    text: '>В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    price: "550",
  });

  const cardThree = new CreateCards(".menu .container", {
    img: "img/tabs/post.jpg",
    title: 'Меню "Постное"',
    text: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    price: "430",
  });

  cardOne.create();
  cardTwo.create();
  cardThree.create();
});
