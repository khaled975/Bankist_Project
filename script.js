'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// ======>> طريقة تانية
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// cookies msg
const header = document.querySelector('.header');
const cookieMsg = document.createElement('div');
cookieMsg.className = 'cookie-message';
cookieMsg.style.backgroundColor = '#37383d';
cookieMsg.innerHTML =
  'We use cookies in that website <button class="btn btn-close-cookie" >Got It!</button>';
header.append(cookieMsg);
const btnCloseCookie = document.querySelector('.btn-close-cookie');
btnCloseCookie.addEventListener('click', () => {
  cookieMsg.remove();
});
///////////////////////////////////////
// smooth scrolling
const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// scrollBtn.addEventListener('click', function(e){
//     console.log(e);
//     console.log(this);
//   section1.scrollIntoView({ behavior: 'smooth' })
// });
const fun = function (t) {
  section1.scrollIntoView({ behavior: 'smooth' });
  console.log(t);
};
scrollBtn.addEventListener('click', fun);

// console.log(section1.getBoundingClientRect());

// scrollBtn.addEventListener('click', () => {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
//   scrollBtn.addEventListener('click', () => {
//   const position = section1.getBoundingClientRect();
//   window.scrollTo({
//     left: position.left,
//     top: position.top,
//     behavior: 'smooth',
//   });
// });

///////////////////////////////////////
// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');

// طريقة الاولى
// tabs.forEach(tab => {
//   tab.addEventListener('click', e => {
//     // remove all active tabs
//     for (let t of tabs) t.classList.remove('operations__tab--active');
//     // add active class
//     tab.classList.add('operations__tab--active');
//     // remove all active contents
//     contents.forEach(c => {
//       c.classList.remove('operations__content--active');
//     // add active class to content
//       document
//         .querySelector(`.operations__content--${tab.dataset.tab}`)
//         .classList.add('operations__content--active');
//     });
//   });
// });

// الطريقة التانية ودي الافضل
// Event Delegation طريقة
const tabsContainer = document.querySelector('.operations__tab-container');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // remove all active tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // add active class
  clicked.classList.add('operations__tab--active');
  // remove all active contents
  contents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // add active class to content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  console.log(clicked);
});

///////////////////////////////////////
// nav fade out effect
const handelHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    console.log('hovered');
    // get hovered target link
    const hovered = e.target;
    // get all other links
    const siblings = document.querySelectorAll('.nav__link');
    const logo = document.querySelector('.nav__logo');
    siblings.forEach(ele => {
      // بعمل التاثير على كل اللينكات ماعدا اللي عملت عليه هوفر
      if (ele !== hovered) ele.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', e => {
  // call انا حاطط الفانكشن دي جوا فانكشن عشان اقدر اباصي براميترز من غير ما اعملها
  handelHover(e, 0.5);
});

nav.addEventListener('mouseout', e => {
  handelHover(e, 1);
});

///////////////////////////////////////
// sticky nav

// window.addEventListener('scroll', () => {
//   const sections = document.querySelectorAll('.section');
//   const section1Positions = section1.getBoundingClientRect();
//   if (window.scrollY > section1Positions.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

///////////////////////////////////////
// // Intersection Observer API
// // دي لو ترجمتها هتلاقي معناها .. مراقبه التقاطع
// // يعني دي طريقة معموله عشان تشوف تقاطع حاجتين مع بعض .. ولما بحصل التقاطع ده ينفذ لوجيك معين
// // طب ازاي بنشئ واحد
// const observer = new IntersectionObserver()
// // new IntersectionObserver(callback,options)
// // بتستقبل حاجتين الاولى
// // callback function ==>>> دي اللي بتكتب فيها اللوجيك اللي هيتنفذ لما التقاطع ده يحصل
// // options ==>>> دي بيبقا اوبجكت بحط فيه شويه خصائص زي .. الحاجة اللي التارجت هيتقاطع معاها .. ونسبة التقاطع قد اي
// // observe() كدة عملت واحد وخزنته في متغير عشان استخدم خاصيه التقاطع بستخدم الميثود اللي اسمها
// observer.observe(header)
// // observe() ==>>> اللي هو العنصر اللي هيحصله تقاطع target element دي بتاخد الـ

const obsCallback = (entries, observer) => {
  // الفانكشن دي بتاخد 2 براميتر
  // 1) entries >> دي بتكون عبارة عن اراي بتشيل فيها معلومات عن التارجت ايلمينت
  // 2) دي بتكون الاوبسيرفر اللي انا عامله .. بستخدمه عشان اوقت التقاطع عند وقت معين
  entries.forEach(entry => {
    console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};
const obsOptions = {
  root: null,
  // دي معناها بقوله الحاجة اللي التارجت هيتقاطع معاها
  // null ==>> viewport معناها اني بقوله الـ
  threshold: 0,
  // دي كدة بقوله نسبة التقاطع قد اي .. وممكن تكون قيمة واحدة وممكن اعمل اكتر من واحدة واحطها في اراي
  // 0 ==>> viewport معاها اني بقوله لما التارجت كله يختفي من الـ
  // 1 ==>> viewport معاها اني بقوله لما التارجت كله يكون ظاهر بالكامل في الـ
  // 0.2 ==>> viewport معاها اني بقوله لما التارجت يظهر منه 20% منه في الـ
  rootMargin: '-70px',
  // دي كدة اكني بقوله اعمل التقاطع قبل ما مفروض يحصل ب 70 بكسل
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

// الطريقة دي هيبان اهميتها بقا وانت بتعمل اظهار للسكاشن اثناء الاسكرول

///////////////////////////////////////
// Reveal sections
const sections = document.querySelectorAll('.section');
const secCallback = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};
const secOptions = {
  root: null,
  threshold: 0.15,
};
const secObserver = new IntersectionObserver(secCallback, secOptions);
sections.forEach(section => {
  section.classList.add('section--hidden');
  secObserver.observe(section);
});

///////////////////////////////////////
// Reveal imgs
const imgs = document.querySelectorAll('.features img');
const imgCallback = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    console.log(entry);
    // let digitalSrc = entry.target.dataset.src
    // entry.target.setAttribute('src',digitalSrc)
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  }
};
const imgOptions = {
  root: null,
  threshold: 0.2,
};
const imgObserver = new IntersectionObserver(imgCallback, imgOptions);
imgs.forEach(img => {
  imgObserver.observe(img);
});

///////////////////////////////////////
// implement slides
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currSlide = 0;
// slides.forEach((slide, i) => {
//   slide.style.transform = `translateX(${100 * i}%)`;
// });

const goToSlide = slide => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = () => {
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
};
const PreSlide = () => {
  if (currSlide === 0) {
    currSlide = slides.length - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', PreSlide);
document.addEventListener('keydown', e => {
  console.log(e);
  e.key === 'ArrowLeft' && PreSlide();
  e.key === 'ArrowRight' && nextSlide();
});



// window.addEventListener('beforeunload', (e)=>{
//   e.preventDefault()
//   console.log(e);
  
//   e.returnValue = ''
// })