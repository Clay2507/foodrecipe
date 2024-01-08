import { getUser } from "./fetch.js";
import loader from "./loader.js";
import { handleData, setCurrentPage } from "./pagination.js";


const formEl = document.forms.searchFood;
const inputEl = formEl.searchFoodInput;
const btnMealEl = document.querySelector('#btnAllMeals');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

formEl.addEventListener('submit', async e => {
    e.preventDefault();
    setCurrentPage(1)
    loader();
    await delay(3000);
    showFood();
})

btnMealEl.addEventListener('click', async e => {
    setCurrentPage(1)
    loader();
    await delay(3000);
    showFood();
})

async function showFood() {
    const inputVal = inputEl.value;
    const data = await getUser(inputVal);
    handleData(data);
    inputEl.value = '';
}

export { showFood }

