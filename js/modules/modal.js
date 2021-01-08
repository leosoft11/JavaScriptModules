function openModal(modalSel, modalTimerId) {
    const  modal = document.querySelector(modalSel);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId){
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSel) {
    const modal = document.querySelector(modalSel);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSel, modalSel, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSel),
        modal = document.querySelector(modalSel);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSel, modalTimerId));
    });

   

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSel);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSel);
        }
    });

    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSel, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};