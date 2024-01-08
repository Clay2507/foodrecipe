let starStroke = 'bx-star';
let starSolid = 'bxs-star';

function handleOver(index) {

    const card = this; 
    const stars = card.querySelectorAll('.star .bx');
    for (let i = 0; i <= index; i++) {
        stars[i].classList.remove(starStroke);
        stars[i].classList.add(starSolid);
    }
}

function handleOut(index) {
    const card = this; 
    const stars = card.querySelectorAll('.star .bx'); 
    const rating = card.dataset.rating;

    if (!rating) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.remove(starSolid);
            stars[i].classList.add(starStroke);
        }
    } else {
        for (let i = rating; i < stars.length; i++) {
            stars[i].classList.remove(starSolid);
            stars[i].classList.add(starStroke);
        }
    }
}

function handleClick(index, cardId) {
    const card = this; 
    const stars = card.querySelectorAll('.star .bx'); 
    const rating = index + 1; 
    card.dataset.rating = rating; 
    for (let i = 0; i <= index; i++) {
        stars[i].classList.remove(starStroke);
        stars[i].classList.add(starSolid);
    }
    localStorage.setItem(`rating_${cardId}`, rating.toString());
}

function starRating(cardId) {
    const card = document.querySelector(`.card__food[data-cardId="${cardId}"]`);
    if(card) {
        const stars = card.querySelectorAll('.star .bx');
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => handleOver.call(card, index));
            star.addEventListener('mouseout', () => handleOut.call(card, index));
            star.addEventListener('click', () => handleClick.call(card, index, cardId));
        })
        const savedRating = localStorage.getItem(`rating_${cardId}`);
        if (savedRating) {
            handleClick.call(card, parseInt(savedRating) - 1, cardId);
        }
    }else {
        return;
    }
}

export { starRating }