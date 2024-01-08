import { createCardsFood } from "./createCardsFood.js";
import { starRating } from "./starRating.js";
import { showFood } from "./script.js";
import { addFavoritesDishes } from "./favoriteDishes.js";
import { creatingIngredientsBlock } from "./creatingIngredientsBlock.js";

let currentPage = 1;
const itemsPerPage = 8;

const paginationBlock = document.querySelector('.pagination');
let currentData = null;

function handleData(data) {
    currentData = data;
    const blockFoodCardsEl = document.querySelector('.block__food-cards');
    blockFoodCardsEl.style.display = 'grid';
    paginationBlock.style.display = 'flex';

    const infoBlockEl = document.querySelector('.information__food-block');
    infoBlockEl.style.display = 'none';

    const errorBlockEl = document.querySelector('.error__block');
    errorBlockEl.style.display = 'none';

    if (data && data.meals) {

        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;
        const mealsToShow = data.meals.slice(start, end);

        blockFoodCardsEl.innerHTML = "";

        mealsToShow.forEach(meal => {
            const card = createCardsFood(meal);
            blockFoodCardsEl.innerHTML += card;

            setTimeout(() => {
                starRating(meal.idMeal);
            }, 0)
        })
        addFavoritesDishes(data);
        const viewIngredientBtnEl = document.querySelectorAll('.viewIngredient');
        viewIngredientBtnEl.forEach(button => {
            button.addEventListener('click', e => {
                const mealId = e.target.dataset.mealId;
                const meal = data.meals.find(meal => meal.idMeal === mealId);
                creatingIngredientsBlock([meal])
            })
        })

        if (end >= data.meals.length) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
        if (currentPage === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }
    } else {
        errorBlockEl.style.display = 'block';
        paginationBlock.style.display = 'none';
        blockFoodCardsEl.style.display = 'none';
    }
}


const nextButton = document.createElement('button');
const prevButton = document.createElement('button');
function createPaginationBtn() {

    nextButton.type = 'button';
    prevButton.type = 'button';

    nextButton.innerHTML = `<i class='bx bxs-right-arrow' style='color:#ff6b00'></i>`
    prevButton.innerHTML = `<i class='bx bxs-left-arrow' style='color:#ff6b00'></i>`

    nextButton.addEventListener('click', showNextPage);
    prevButton.addEventListener('click', showPreviousPage);

    paginationBlock.append(prevButton, nextButton);
    paginationBlock.style.display = 'none';
}
createPaginationBtn()

function showNextPage() {
    currentPage++;
    showFood();
}

function showPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        showFood();
    }
}

function setCurrentPage(value) {
    currentPage = value;
}

const sortButton = document.querySelector('#btnSort');
function sortMealsAlphabetically() {
    if (currentData && currentData.meals) {
        currentData.meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        handleData(currentData);
    }
}

sortButton.addEventListener('click', sortMealsAlphabetically)

const sortRatingButton = document.querySelector('#btnSortRating');

function addRatingsToData() {
    if (currentData && currentData.meals) {
        currentData.meals.forEach(meal => {
            const savedRating = localStorage.getItem(`rating_${meal.idMeal}`);
            meal.rating = savedRating ? parseInt(savedRating) : 0;
        });
    }
}

function sortMealsByRating() {
    addRatingsToData();
    if (currentData && currentData.meals) {
        currentData.meals.sort((a, b) => b.rating - a.rating);
        handleData(currentData);
    }
}

sortRatingButton.addEventListener('click', sortMealsByRating);

export { handleData, setCurrentPage }