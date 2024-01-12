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
   if (input.length >= 3){
    const inputLower = input.toLowerCase();
    
    
    recipes.forEach(recipe => {
        let matchesSearch = false;
        let matchesFilters = true;

        // Vérification de la correspondance avec la saisie de l'utilisateur
        if (recipe.name.toLowerCase().includes(inputLower) ||
            recipe.description.toLowerCase().includes(inputLower) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputLower))) {
            matchesSearch = true;
        }

        // Vérification des filtres sélectionnés
        filterState.ingredients.forEach(filterIngredient => {
            if (!recipe.ingredients.some(recipeIngredient =>
                recipeIngredient.ingredient.toLowerCase() === filterIngredient.toLowerCase())) {
                matchesFilters = false;
            }
        });

        filterState.appareils.forEach(filterAppliance => {
            if (recipe.appliance.toLowerCase() !== filterAppliance.toLowerCase()) {
                matchesFilters = false;
            }
        });

        filterState.ustensiles.forEach(filterUstensil => {
            if (!recipe.ustensils.some(recipeUstensil =>
                recipeUstensil.toLowerCase() === filterUstensil.toLowerCase())) {
                matchesFilters = false;
            }
        });

        // Ajouter la recette si elle correspond à la recherche et aux filtres
        if (matchesSearch && matchesFilters) {
            filteredRecipes.push(recipe);
        }
    });
    filterState.searchQuery = input;
    displayRecipes(filteredRecipes);
   }else if(input.length == 0) {
    displayRecipes(recipes)
   }
}

GetInputSearch()

export { filteredRecipes };