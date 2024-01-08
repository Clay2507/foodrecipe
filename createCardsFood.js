function createCardsFood(details) {
    const {
        idMeal,
        strMealThumb,
        strMeal,
        strArea,
    } = details

    const cardFood = `
        <div class="card__food" data-cardId="${idMeal}">
            <div class="favorites__icon">
                <i class='bx bxs-bookmark-star' style='color:red'></i>
            </div>
            <div class="poster">
                <img src="${strMealThumb}" alt="">
            </div>
            <div class="desc">
                <h3>${strMeal}</h3>
                <p>${strArea}</p>
            </div>
            <div class="rating">
                <div class="star"><i class='bx bx-star'></i></div>
                <div class="star"><i class='bx bx-star'></i></div>
                <div class="star"><i class='bx bx-star'></i></div>
                <div class="star"><i class='bx bx-star'></i></div>
                <div class="star"><i class='bx bx-star'></i></div>
            </div>
            <div class="view__recipe-btn">
                <button type="button" class="viewIngredient" data-meal-id='${details.idMeal}'>View Ingredients</button>
            </div>
        </div>
        `
    return cardFood;
}

export { createCardsFood }
