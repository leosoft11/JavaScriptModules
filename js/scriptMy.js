window.addEventListener('DOMContentLoaded', () =>{

    const tabItems = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabParent  = document.querySelector('.tabheader__items'),
          icon = document.querySelector('.pepper');

          const hideTabContent = () =>{
              tabContent.forEach(item =>{
                    item.classList.add('hide');
                    item.classList.remove('show');
          });
               tabItems.forEach(item =>{
                        item.classList.remove('tabheader__item_active');
                    });
                        };
          const showTabContent = (i = 0) =>{
                tabContent[i].classList.add('show');
                tabContent[i].classList.remove('hide');

                tabItems[i].classList.add('tabheader__item_active');
          };
          
         hideTabContent();
         showTabContent();

        tabParent.addEventListener('click', (e) =>{
            const target = e.target;
            
            if (target && target.classList.contains('tabheader__item')){
                tabItems.forEach((item, i) =>{
                        if (target == item){
                            hideTabContent();
                            showTabContent(i);
                        }
                })
            }
        });

        const sTop = () =>{
            if (window.pageYOffset > 0){
             let ScrolTop = document.documentElement.scrollTop;
                window.scrollBy(0, -30);
                setTimeout(sTop, 0);
            }
        }

        icon.addEventListener('click', () =>{
            sTop();        
      });


      const btnModal = document.querySelectorAll('[data-modal]'),
          modalclose = document.querySelector('[modal-close]'),
               modal = document.querySelector('.modal');

               btnModal.forEach(btn =>{
                        btn.addEventListener('click', () =>{
                        modal.classList.add('show');
                        modal.classList.remove('hide');
            
                        document.body.style.overflow = 'hidden';
                });
               });
     

      modalclose.addEventListener('click', () => {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
      });

      modal.addEventListener('click', (e) =>{
            if (e.target === modal){
                 modal.classList.add('hide');
                 modal.classList.remove('show');
                 document.body.style.overflow = '';
            }
      });


    // tabItems.forEach((tabs, i) =>{
    //         tabs.addEventListener('click', () =>{
    //                // console.log(`${index} { ${tabs.textContent}}`);
    //               //tabs.classList.add('tabheader__item_active');
    //         });
    // });
    // Классовые компоненты

    const getRes = async (url) =>{
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status : ${res.status}`);
        }
        return await res.json();
    };

    // getRes('http://localhost:3000/menu')
    //     .then(data =>{
    //         data.forEach(({img, altimg, title, descr, price}) =>{
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
    getRes('http://localhost:3000/menu')
        .then(data => createCard(data));

        function createCard(data){
            data.forEach(({img, altimg, title, descr, price}) =>{
                    const elem = document.createElement('div');
                    elem.classList.add('menu__item');
                    elem.innerHTML = `
                        <img src="${img}" alt="${altimg}">
                            <h3 class="menu__item-subtitle">${title}”</h3>
                            <div class="menu__item-descr">${descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${price}</span> баксы/день</div>
                    </div>
                    `;
                    document.querySelector('.menu .container').append(elem);
            });
        }

    
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     "Меню 'Фитнес'",
    //     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    //      110,
    //      '.menu .container',
    //      'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     "Меню 'Спорт'",
    //     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    //      150,
    //      '.menu .container',
    //      'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     "Меню 'Фитнес'",
    //     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    //      130,
    //      '.menu .container',
    // ).render();

    
    const getRequest = () =>{
        const inputRub = document.querySelector('.rub'),
            inputUsd = document.querySelector('.usd');
  
            inputRub.addEventListener('input', () => {
                const requst = new XMLHttpRequest();

                requst.open('GET','js/current.json');
                requst.setRequestHeader('Content-type','application/json; charset=utf-8');
                requst.send();

                requst.addEventListener('load', () =>{
                    if (requst.status === 200){
                        const data = JSON.parse(requst.response);
                        const country = data.current.country;
                        const city = data.current.city;
                        console.log(country);
                        console.log(city);
                        inputUsd.value = `${(+inputRub.value / data.current.usd).toFixed(2)} баксов`; 
                    } else {
                        inputUsd.value = "Сервер накрылся"
                    }

                });
            });
    }

        const forms = document.querySelectorAll('form');

        const message = {
            load: 'Загрузка',
            success: 'Мы скоро с вами свяжемся',
            failure: 'Что то пошло не таk..'
        }

        forms.forEach(item =>{
            bindPostData(item);
        });

        const postData = async (url, data) =>{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });  
            return await res.json();
        };

        function bindPostData (form) {
            form.addEventListener('submit', (e) =>{
                    e.preventDefault();
                    console.log(message.load);

                    // const request  = new XMLHttpRequest();
                    // request.open('POST', 'server.php');                    
                    //request.setRequestHeader('Content-type','application/json');
                    const formData = new FormData(form);

                    // const obj = {};
                    // formData.forEach((value, key) =>{
                    //     obj[key] = value;
                    // });

                    const jso = JSON.stringify();




                    const json = JSON.stringify(obj);
                
                    postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        console.log(message.success)
                    }).catch(() => {
                        console.log(message.failure);

                    }).finally(() => {
                        form.reset();
                    });
                    //request.send(json);

                    // request.addEventListener('load', () =>{
                    //     if (request.status === 200){
                    //         form.reset();
                    //         console.log(request.response);
                    //         console.log(message.success)
                    //     } else{
                    //         console.log(message.failure);
                    //     }
                    // });
            });
        };
    getRequest();

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'lex'}),
    //     Headers: {
    //         'Content-type' : 'applicaton/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))


    // Slider // 

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
  
    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide =>{
        slide.style.width = width;
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g,'')
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width)* (slides.length - 1)){
            offset = 0;
        } else{
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else{
            slideIndex++;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else{
            current.textContent = `${slideIndex}`;

        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else{
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else{
            slideIndex--;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else{
            current.textContent = `${slideIndex}`;

        }
    });

    // calc 

    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, weight, age, ration  = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ration){
            result.textContent = '_______';
            return;
        }

        if (sex === 'female'){
            result.textContent = Math.round((447.6 +(9.2 * weight) + (3.1 * height) - (4.3 * age)) * ration);
        } else{
            result.textContent = Math.round((88.36 +(13.4 * weight) + (4.8 * height) - (5.7 * age)) * ration);
        }
    }

    calcTotal();

    function getStaticInforamtion(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem =>{
            elem.addEventListener('click', (e) =>{
                if(e.target.getAttribute('data-ratio')){
                    ration = +e.target.getAttribute('data-ratio');
                } else{
                    sex = e.target.getAttribute('id');
                }
                console.log(ration, sex);
    
                elements.forEach(elem =>{
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
    
            });
        });        
    }

    getStaticInforamtion('#gender','calculating__choose-item_active');
    getStaticInforamtion('.calculating__choose_big','calculating__choose-item_active');

    function getDinamInform(selector){
        const inp = document.querySelector(selector);
        inp.addEventListener('input', () =>{
                switch(inp.getAttribute('id')){
                    case 'height':
                        height = +inp.value;
                        break;
                    case 'weight':
                        weight = +inp.value;
                        break;
                    case 'age':
                        age = +inp.value;
                        break;
                }
                calcTotal();
        });
        
    }

    getDinamInform('#height');
    getDinamInform('#weight');
    getDinamInform('#age');

});