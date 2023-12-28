import recipes from "../../data/recipes.js";

let filterState = {
    ingredients: [],
    appareils: [],
    ustensiles: []
};



function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    const filterCounter = document.getElementById('counter')
    const filteredRecipes = new Set();
    recipesContainer.innerHTML = ''
    filterCounter.innerHTML = ''
    if (filterState.ingredients.length > 0 || filterState.appareils.length > 0 || filterState.ustensiles.length > 0){
        if (filterState.ingredients.length > 0) {
            recipes.forEach(recipe => {
                // Vérifie si la recette contient tous les ingrédients du filtre
                if (filterState.ingredients.every(filterIngredient =>
                    recipe.ingredients.some(recipeIngredient =>
                        recipeIngredient.ingredient.toLowerCase().includes(filterIngredient.toLowerCase())))) {
                    filteredRecipes.add(recipe);
                }
            });
        }
        
        if (filterState.appareils.length > 0) {
            recipes.forEach(recipe => {
                // Vérifie si la recette contient tous les appareils du filtre
                if (filterState.appareils.every(filterAppliance =>
                    recipe.appliance.toLowerCase().includes(filterAppliance.toLowerCase()))) {
                    filteredRecipes.add(recipe);
                }
            });
        }
        
        if (filterState.ustensiles.length > 0) {
            recipes.forEach(recipe => {
                // Vérifie si la recette contient tous les ustensiles du filtre
                if (filterState.ustensiles.every(filterUstensil =>
                    recipe.ustensils.some(recipeUstensil =>
                        recipeUstensil.toLowerCase().includes(filterUstensil.toLowerCase())))) {
                    filteredRecipes.add(recipe);
                }
            });
        }
        const totalRecipes = filteredRecipes.size;

        if (totalRecipes <= 1) {
            filterCounter.innerHTML = totalRecipes + " " + "Recette"
        }else {
            filterCounter.innerHTML = totalRecipes + " " + "Recettes"
        }
        filteredRecipes.forEach(recipe => {
            createRecipeContainer(recipe, recipesContainer);
        });
    }else{
        const totalRecipes = recipes.length;
        if (totalRecipes <= 1) {
            filterCounter.innerHTML = totalRecipes + " " + "Recette"
        }else {
            filterCounter.innerHTML = totalRecipes + " " + "Recettes"
        }
        recipes.forEach(recipe => {
            createRecipeContainer(recipe, recipesContainer)
        });
    }
}

function createRecipeContainer(recipe, container){
    const recipeDivContainer = document.createElement('div')
    recipeDivContainer.classList.add('recipes')
    ///////////////CARD HEADER////////////////////////////
    const recipeImageDiv = document.createElement('div')
    recipeImageDiv.classList.add('card-header')

    const image = document.createElement('img');
    image.src = "./assets/recettes/"+recipe.image;
    image.alt = recipe.name;
    
    const timer = document.createElement('div')
    timer.classList.add('timer')
    timer.innerHTML = recipe.time + " mins"

    recipeImageDiv.appendChild(timer)
    recipeImageDiv.appendChild(image)

    /////////CARD MAIN/////////////////////
    const recipeDivMain = document.createElement('div');
    recipeDivMain.classList.add('card-main');
    recipeDivMain.id = recipe.id

    const name = document.createElement('h2');
    name.textContent = recipe.name;

    const divStepsRecipes = document.createElement('div')
    divStepsRecipes.classList.add('steps')

    const inth3 = document.createElement('h3')
    inth3.innerHTML = "RECETTE";

    const description = document.createElement('p');
    description.textContent = recipe.description;

    divStepsRecipes.appendChild(inth3)
    divStepsRecipes.appendChild(description)

    const ingredientDiv = document.createElement('div')
    ingredientDiv.classList.add('ingredients')

    const ingredienth3 = document.createElement('h3')
    ingredienth3.innerHTML = 'INGRÉDIENTS'

    const detailsIngredients = document.createElement('div')
    detailsIngredients.classList.add('list-ingredients')

    recipe.ingredients.forEach(ingredient => {
        const loopDiv = document.createElement('div')
        loopDiv.classList.add('ingredient')

        const h4 = document.createElement('h4')
        h4.innerHTML = ingredient.ingredient

        const p = document.createElement('p')
        p.innerHTML = (ingredient.quantity ? ingredient.quantity : '') + " " + (ingredient.unit ? ingredient.unit : '');

       

        loopDiv.appendChild(h4)
        loopDiv.appendChild(p)
        detailsIngredients.appendChild(loopDiv)
    });

    ingredientDiv.appendChild(ingredienth3)
    ingredientDiv.appendChild(detailsIngredients)

    recipeDivMain.appendChild(name)
    recipeDivMain.appendChild(divStepsRecipes)
    recipeDivMain.appendChild(ingredientDiv)

    recipeDivContainer.appendChild(recipeImageDiv)
    recipeDivContainer.appendChild(recipeDivMain)

    container.appendChild(recipeDivContainer)
}


displayRecipes(recipes);

export { displayRecipes, filterState };

