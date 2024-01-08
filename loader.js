const loaderEl = document.querySelector('.loader');
const blockFoodCard = document.querySelector('.block__food-cards');

function loader() {
    loaderEl.style.display = 'block';
    blockFoodCard.style.display = 'none';
    setTimeout(() => {
        loaderEl.style.display = 'none';
        blockFoodCard.style.display = 'grid';
    }, 3000)
}

export default loader;