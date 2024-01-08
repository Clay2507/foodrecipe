
const infoBlockEl = document.querySelector('.information__food-block');
const paginationBlock = document.querySelector('.pagination');

function creatingIngredientsBlock(meal) {
    const blockFoodCardsEl = document.querySelector('.block__food-cards');
    blockFoodCardsEl.style.display = 'none';
    
    infoBlockEl.innerHTML = "";

    const mainList = document.createElement('ul');
    mainList.classList.add('main__list');

    const recipeBtnBlock = document.createElement('div');
    recipeBtnBlock.classList.add('recipe__btn-block');

    const viewRecipeFoodBtnEl = document.createElement('button');
    viewRecipeFoodBtnEl.type = "button";
    viewRecipeFoodBtnEl.textContent = 'View Recipe';
    viewRecipeFoodBtnEl.classList.add('viewIngredient'); 
    paginationBlock.style.display = 'none';

    viewRecipeFoodBtnEl.addEventListener('click', e => {
        paginationBlock.style.display = 'none';
        if(viewRecipeFoodBtnEl.textContent === 'View Recipe') {
            viewInstructionMeal(meal)
            viewRecipeFoodBtnEl.textContent = 'Close';
        }else {
            document.querySelector('.instructions').remove();
            viewRecipeFoodBtnEl.textContent = 'View Recipe';
        }
    });

    const closeButton = document.createElement('button');
    closeButton.innerHTML = `<i class='bx bx-x' style='color:#fb0606'></i>`;
    closeButton.classList.add('close__button');
    paginationBlock.style.display = 'none';

    closeButton.addEventListener('click', e => {
        infoBlockEl.style.display = 'none';
        paginationBlock.style.display = 'flex';
        blockFoodCardsEl.style.display = 'grid';
    })

    const titleIngredientsBlockEl = document.createElement('h3');
    titleIngredientsBlockEl.classList.add('info__title');
    titleIngredientsBlockEl.textContent = 'Products List';

    meal.forEach(dish => {
        for(let i = 0; i <= 20; i++) {
            const ingredient = dish['strIngredient' + i];
            const measure = dish['strMeasure' + 1];
            if(ingredient) {
                const listItem = document.createElement('li');
                const ingredientName = document.createElement('span');
                ingredientName.textContent = ingredient;
    
                const ingredientMeasure = document.createElement('span');
                ingredientMeasure.textContent = measure;

                const imgIngredients = document.createElement('img');
                imgIngredients.src = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
                imgIngredients.classList.add('imageIngredients');

                listItem.append(ingredientName, imgIngredients, ingredientMeasure);
                mainList.appendChild(listItem);
            }
        }
    });
    recipeBtnBlock.appendChild(viewRecipeFoodBtnEl);
    infoBlockEl.append(titleIngredientsBlockEl, mainList, recipeBtnBlock, closeButton)
    infoBlockEl.style.display = 'block';
}   

function viewInstructionMeal(meal) {
    const instructions = document.createElement('p');
    instructions.classList.add('instructions');
    meal.forEach(dish => {
       instructions.textContent = dish.strInstructions;
    })
    infoBlockEl.insertAdjacentElement('beforeend', instructions);
}

export { creatingIngredientsBlock }