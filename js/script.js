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

  const deadline = "2023-06-5";

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
    console.log("open");
    if (
      target.classList.contains("modal__close") ||
      target.classList.contains("modal") ||
      target.getAttribute("data-close") == ""
    ) {
      hideModalWindow();
    }
  });

  // Show modal window after 6s.

  const modalInterval = setInterval(showModalWindow, 6000);

  // Show window after scrolling

  function scrollHandler() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModalWindow();
      window.removeEventListener("scroll", scrollHandler);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  // class CreateCards

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
      this.parent.append(element);
    }
  }

  getRes("http://localhost:3000/main").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // use axios

  // axios.get("http://localhost:3000/main").then((data) => {
  //   data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // Post data

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });

    return await res.json();
  };

  async function getRes(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "Загрузка",
    success: "Дякую! Ми скоро з вами зв'яжемось",
    failure: "Щось пішло не так",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  // Bind post data

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(msg) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    showModalWindow();

    // New content

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");

    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${msg}</div>
      </div>
    
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      hideModalWindow();
    }, 5000);
  }

  fetch("../db/db.json")
    .then((data) => data.json())
    .then((res) => console.log(res));

  // Slider

  let count = 1,
    offset = 0;
  const slides = document.querySelectorAll(".offer__slide"),
    left = document.querySelector(".offer__slider-prev"),
    right = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  if (count < 10) {
    current.textContent = `0${count}`;
    total.textContent = `0${slides.length}`;
  } else {
    current.textContent = count;
    total.textContent = slides.length;
  }

  slidesField.style.width = 100 * slides.length + "%";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  left.addEventListener("click", () => {
    if (offset <= 0) {
      offset = +parseInt(width) * (slides.length - 1);
    } else {
      offset -= +parseInt(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(count <= 1) {
      count = 4;
    } else {
      count--;
    }

    if (slides.length < 10) {
      current.textContent = `0${count}`;
    } else {
      current.textContent = count;
    }
  });

  right.addEventListener("click", () => {
    console.log(count);
    if (offset == +parseInt(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +parseInt(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(count == slides.length) {
      count = 1;
    } else {
      count++;
    }
    
    if (slides.length < 10) {
      current.textContent = `0${count}`;
    } else {
      current.textContent = count;
    }
  });
});
