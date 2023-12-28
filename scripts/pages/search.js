import recipes from "../../data/recipes.js"
import { displayRecipes, filterState } from "./index.js" 


function GetInputSearch() {
    const searchInput = document.getElementById('searchInputForm');

    searchInput.addEventListener('input', () => {
        const userInput = searchInput.value
        SearchFromInput(userInput)
    });
}

function SearchFromInput(input){
   if (input.length >= 3){
    console.log(input)
    const inputLower = input.toLowerCase();
    const filteredRecipes = [];
    
    recipes.forEach(recipe => {
        const titleMatch = recipe.name.toLowerCase().includes(inputLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(inputLower);
        const ingredientMatch = recipe.ingredients.some(ingredient => 
            ingredient.ingredient.toLowerCase().includes(inputLower)
        );
    
        if (titleMatch || descriptionMatch || ingredientMatch) {
            filteredRecipes.push(recipe);
        }
    });

    displayRecipes(filteredRecipes);
   }else{
    displayRecipes(recipes)
   }
}

GetInputSearch()