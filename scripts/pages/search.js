import recipes from "../../data/recipes.js"
import { displayRecipes, filterState } from "./index.js" 


function GetInputSearch() {
    const searchInput = document.getElementById('searchInputForm');

    searchInput.addEventListener('input', () => {
        const userInput = searchInput.value;
        filterState.searchQuery = userInput; // Mise à jour de l'état de recherche
        if (userInput.length >= 3 || userInput.length === 0) {
            SearchFromInput(userInput);
        }
    });
}

const filteredRecipes = [];

function SearchFromInput(input){
    const filteredRecipes = []; 
    if (input.length >= 3) {
        const inputLower = input.toLowerCase();

        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let matchesSearch = false;
            let matchesFilters = true;

            
            if (recipe.name.toLowerCase().includes(inputLower) ||
                recipe.description.toLowerCase().includes(inputLower) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputLower))) {
                matchesSearch = true;
            }

            // Vérification des filtres sélectionnés
            for (let j = 0; j < filterState.ingredients.length; j++) {
                let filterIngredient = filterState.ingredients[j];
                if (!recipe.ingredients.some(recipeIngredient => 
                    recipeIngredient.ingredient.toLowerCase() === filterIngredient.toLowerCase())) {
                    matchesFilters = false;
                    break; 
                }
            }

            if (matchesFilters) {
                for (let k = 0; k < filterState.appareils.length; k++) {
                    let filterAppliance = filterState.appareils[k];
                    if (recipe.appliance.toLowerCase() !== filterAppliance.toLowerCase()) {
                        matchesFilters = false;
                        break; 
                    }
                }
            }

            if (matchesFilters) {
                for (let l = 0; l < filterState.ustensiles.length; l++) {
                    let filterUstensil = filterState.ustensiles[l];
                    if (!recipe.ustensils.some(recipeUstensil => 
                        recipeUstensil.toLowerCase() === filterUstensil.toLowerCase())) {
                        matchesFilters = false;
                        break; 
                    }
                }
            }

            // Ajouter la recette si elle correspond à la recherche et aux filtres
            if (matchesSearch && matchesFilters) {
                filteredRecipes.push(recipe);
            }
        }
        filterState.searchQuery = input; 
        displayRecipes(filteredRecipes); 
    } else if(input.length == 0) {
        displayRecipes(recipes); 
    }
}


GetInputSearch()

export { filteredRecipes };