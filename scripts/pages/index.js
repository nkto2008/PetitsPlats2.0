import recipes from "../../data/recipes";

function displayRecipes(recipes) {
    console.log(recipes)
    /*
    const recipesContainer = document.getElementById('recipes-container'); // Élément du DOM où tu veux afficher les recettes

    recipes.forEach(recipe => {
        // Création d'une div qui contiendra les elements de la recette
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const image = document.createElement('h3');
        image.textContent = recipe.image;
        image.alt = recipe.name;

        const name = document.createElement('h2');
        name.textContent = recipe.name;

        const description = document.createElement('p');
        description.textContent = recipe.description;

        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = ingredient.quantity + " " + ingredient.unit
            ingredientsList.appendChild(listItem);
        });

        // Ajout des éléments à la recette
        recipeDiv.appendChild(image);
        recipeDiv.appendChild(name);
        recipeDiv.appendChild(description);
        recipeDiv.appendChild(ingredientsList);

        // Ajout de la recette au conteneur
        recipesContainer.appendChild(recipeDiv);
    });*/
}


displayRecipes(recipes);
