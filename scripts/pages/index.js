import recipes from "../../data/recipes.js";

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    const ingredientsSelect = document.getElementById('ingredients');
    const appareilsSelect = document.getElementById('appareils');
    const ustensilesSelect = document.getElementById('ustensiles');
    const filteredRecipes = new Set();
    recipesContainer.innerHTML = ''
    if (ingredientsSelect.value || appareilsSelect.value || ustensilesSelect.value){
        console.log(ingredientsSelect.value)
        console.log(appareilsSelect.value)
        console.log(ustensilesSelect.value)
        if (ingredientsSelect.value) {
            recipes.forEach(recipe => {
                if (recipe.ingredients.some(ingredient => ingredient.ingredient.includes(ingredientsSelect.value))) {
                    filteredRecipes.add(recipe);
                }
            });
        }
        if(appareilsSelect.value) {
            recipes.forEach(recipe => {
                if (recipe.appliance.includes(appareilsSelect.value)) {
                    filteredRecipes.add(recipe);
                }
            });
        }
        if(ustensilesSelect.value){
            recipes.forEach(recipe => {
                if (recipe.ustensils.includes(ustensilesSelect.value)) {
                    filteredRecipes.add(recipe);
                }
            });
        }
        const totalRecipes = filteredRecipes.size;
        const totalRecipesDisplay = document.createElement('p');
        totalRecipesDisplay.textContent = totalRecipes + " " + "Recettes";
        recipesContainer.appendChild(totalRecipesDisplay);
        filteredRecipes.forEach(recipe => {
            createRecipeContainer(recipe, recipesContainer);
        });
    }else{
        const totalRecipes = recipes.length;
        const totalRecipesDisplay = document.createElement('p');
        totalRecipesDisplay.textContent = totalRecipes + "Recettes";
        recipesContainer.appendChild(totalRecipesDisplay);
        recipes.forEach(recipe => {
            createRecipeContainer(recipe, recipesContainer)
        });
    }
}

function createRecipeContainer(recipe, container){
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.id = recipe.id

    /*const image = document.createElement('img');
    image.src = "./assets/recettes/"+recipe.image;
    image.alt = recipe.name;
*/
    const name = document.createElement('h2');
    name.textContent = recipe.name;

    const description = document.createElement('p');
    description.textContent = recipe.description;

    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient.ingredient + " " + ingredient.quantity + " " + ingredient.unit
        ingredientsList.appendChild(listItem);
    });

    recipeDiv.appendChild(name);
    recipeDiv.appendChild(description);
    recipeDiv.appendChild(ingredientsList);

    container.appendChild(recipeDiv);
}


displayRecipes(recipes);

export default displayRecipes

