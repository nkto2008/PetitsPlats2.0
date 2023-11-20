import recipes from "../../data/recipes.js"
import displayRecipes from "../pages/index.js";
// Fonction permettant l'ajout d'option dans le select voulu
//Value: identifié pour l'option
//text: valeur de l'option affiché a l'utilisateur
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

function addFilters(recipes) {
    const ingredientsSelect = document.getElementById('ingredients');
    const appareilsSelect = document.getElementById('appareils');
    const ustensilesSelect = document.getElementById('ustensiles');

    // Ajout d'option par défaut pour ne pas avoir les premiers résultat et donc afficher la liste de recettes complètes
    addOption(ingredientsSelect, '', 'Ingrédient');
    addOption(appareilsSelect, '', 'Appareils');
    addOption(ustensilesSelect, '', 'Ustensiles');

    const ingredientsSet = new Set();
    const appareilsSet = new Set();
    const ustensilesSet = new Set();

    //Parcourir le tableau recipes pour récuperer les valeurs (pas de duplication) dans les sets
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);
        });
        appareilsSet.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            ustensilesSet.add(ustensil);
        });
    });

    // Ajout des ingrédients via le set dans les options
    ingredientsSet.forEach(ingredient => {
        addOption(ingredientsSelect, ingredient, ingredient);
    });

    // idem pour les appareils
    appareilsSet.forEach(appareil => {
        addOption(appareilsSelect, appareil, appareil);
    });

    // idem pour les ustensiles
    ustensilesSet.forEach(ustensil => {
        addOption(ustensilesSelect, ustensil, ustensil);
    });
    
    ingredientsSelect.addEventListener('change', displayRecipes);
    appareilsSelect.addEventListener('change', displayRecipes);
    ustensilesSelect.addEventListener('change', displayRecipes);
}


addFilters(recipes);
