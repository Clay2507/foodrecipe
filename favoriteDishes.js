import { creatingIngredientsBlock } from "./creatingIngredientsBlock.js";
import { createCardsFood } from "./createCardsFood.js";

const favoritesBlockEl = document.querySelector('.favorites__block');
const favoritesIconEl = document.querySelector('.favorites__item-block');

let isEventAdded = false;

const foodCardsBlockEl = document.querySelector('.block__food-cards');

const favoritesBlockError = document.querySelector('.favorites__error');

function addViewIngredientHandler(card, data) {
    const viewIngredientBtnEl = card.querySelector('.viewIngredient');
    viewIngredientBtnEl.addEventListener('click', e => {
        const mealId = e.target.dataset.mealId;
        const meal = data.meals.find(meal => meal.idMeal === mealId);
        creatingIngredientsBlock([meal])
        favoritesBlockEl.style.display = 'none';
    });
}

function addFavoritesDishes(data) {
    if (!isEventAdded) {
        foodCardsBlockEl.addEventListener('click', e => {
            const icon = e.target.closest('.favorites__icon');
            if (icon) {
                const card = icon.closest('.card__food');
                if (card) {
                    const clonedCard = card.cloneNode(true);
                    favoritesBlockEl.appendChild(clonedCard);

                    deleteCardFood(clonedCard);
                    addViewIngredientHandler(clonedCard, data)
                    updateStorage(clonedCard)
                }
            }
        });
        isEventAdded = true;
    }
}

const favoritesCounterEl = document.createElement('span');
favoritesCounterEl.classList.add('favorites__counter');
favoritesIconEl.appendChild(favoritesCounterEl);

let favoriteFood = JSON.parse(localStorage.getItem('favoriteFood')) || [];

function updateStorage(card) {
    let cardData = {
        idMeal: card.dataset.cardId,
        strMealThumb: card.querySelector('.poster img').src,
        strMeal: card.querySelector('.desc h3').textContent,
        strArea: card.querySelector('.desc p').textContent
    }
    favoriteFood.push(cardData)
    localStorage.setItem('favoriteFood', JSON.stringify(favoriteFood));

    favoritesCounterEl.textContent = favoriteFood.length;
}

function loadFoodLocalStorage() {
    favoriteFood.forEach(cardData => {
        let favoriteFood = document.createElement('div');
        favoriteFood.classList.add('favorite__food');
        favoriteFood.innerHTML = createCardsFood(cardData);
        favoritesBlockEl.appendChild(favoriteFood);
        deleteCardFood(favoriteFood);
    });

    favoritesCounterEl.textContent = favoriteFood.length;
}



function deleteCardFood(card) {
    const clonedIcon = card.querySelector('.favorites__icon');
    clonedIcon.innerHTML = `<i class='bx bx-x'></i>`;
    
    clonedIcon.addEventListener('click', () => {
        card.remove();
        
        
        const cardId = card.dataset.cardId;
        const index = favoriteFood.findIndex(food => food.idMeal === cardId);
        if (index !== -1) {
            favoriteFood.splice(index, 1);
        }
        
        localStorage.setItem('favoriteFood', JSON.stringify(favoriteFood));

        favoritesCounterEl.textContent = favoriteFood.length;
        
        if (favoritesBlockEl.children.length === 0) {
            foodCardsBlockEl.style.display = 'grid';
            favoritesBlockEl.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadFoodLocalStorage();
})

function closeAndOpenFavoritesBlock() {
    if (favoritesBlockEl.style.display === 'none') {
        favoritesBlockEl.style.display = 'grid';
        if(favoritesBlockEl.children.length === 0) {
            favoritesBlockError.textContent = `You don't have any favorite dishes`;
            favoritesBlockError.style.display = 'flex';
            setTimeout(() => {
                favoritesBlockError.style.display = 'none';
            }, 1500)
            favoritesBlockEl.style.display = 'none';
        }
    } else {
        foodCardsBlockEl.style.display = 'grid';
        favoritesBlockEl.style.display = 'none';
    }
}

favoritesIconEl.addEventListener('click', e => {
    closeAndOpenFavoritesBlock()
})


export { addFavoritesDishes }

