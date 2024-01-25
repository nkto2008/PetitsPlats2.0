import recipes from "../../data/recipes.js"
import { filteredRecipes } from "./search.js";
import { displayRecipes, filterState } from "../pages/index.js";


function applyFilters() {
    let filteredRecipes = recipes;

    
    if (filterState.searchQuery.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
            recipe.description.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filterState.searchQuery.toLowerCase()))
        );
    }

    
    if (filterState.ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            filterState.ingredients.every(filterIngredient =>
                recipe.ingredients.some(recipeIngredient =>
                    recipeIngredient.ingredient.toLowerCase().includes(filterIngredient.toLowerCase())
                )
            )
        );
    }

   
    if (filterState.appareils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            filterState.appareils.some(filterAppliance =>
                recipe.appliance.toLowerCase().includes(filterAppliance.toLowerCase())
            )
        );
    }

    
    if (filterState.ustensiles.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            filterState.ustensiles.every(filterUstensil =>
                recipe.ustensils.some(recipeUstensil =>
                    recipeUstensil.toLowerCase().includes(filterUstensil.toLowerCase())
                )
            )
        );
    }

    
    updateFilters(filteredRecipes);


    displayRecipes(filteredRecipes);
}


function updateFilters(filteredRecipes) {
    const newIngredients = new Set();
    const newAppareils = new Set();
    const newUstensiles = new Set();

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            newIngredients.add(ingredient.ingredient);
        });
        newAppareils.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            newUstensiles.add(ustensil);
        });
    });

    // Mettre à jour le DOM pour chaque type de filtre
    updateFilterDOM('ingredients', newIngredients);
    updateFilterDOM('appareils', newAppareils);
    updateFilterDOM('ustensiles', newUstensiles);
}

function updateFilterDOM(filterType, options) {
    const filterContainer = document.getElementById(`option_${filterType}`);
    filterContainer.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('p');
        optionElement.textContent = option;
        optionElement.addEventListener('click', function() {
            if (filterType === 'ingredients') {
                filterState.ingredients.push(option);
            } else if (filterType === 'appareils') {
                filterState.appareils.push(option);
            } else if (filterType === 'ustensiles') {
                filterState.ustensiles.push(option);
            }

            // Ajouter le filtre sélectionné à l'affichage
            DisplayFilterSelected(filterType, option);

            // Réappliquer les filtres
            applyFilters();
        });
        filterContainer.appendChild(optionElement);
    });
}

function createFilters(recipes, Filter) {
    const filter = document.getElementById('filter')

    const div = document.createElement('div')
    const flt = document.createElement('div')
    flt.setAttribute('class','list')
    flt.setAttribute('id','flt_'+Filter)

    const arrow = document.createElement('div')
    arrow.setAttribute('class','header_list')
    arrow.setAttribute('id', 'arrow_'+Filter)

    const p = document.createElement('p')
    p.innerHTML = Filter

    const down = document.createElement('i')
    down.setAttribute('class', 'fa-solid fa-chevron-down')

    const up = document.createElement("i");
    up.setAttribute("class", "fa-solid fa-chevron-up disabled");

    arrow.appendChild(p)
    arrow.appendChild(down)
    arrow.appendChild(up)

    flt.appendChild(arrow)

    const extDiv = document.createElement('div')
    extDiv.setAttribute('class','extension_filter')

    const wrapSearch = document.createElement('div');
    wrapSearch.setAttribute("class", "wrap_srch");

    const inputSearch = document.createElement('div');
    inputSearch.setAttribute("class", "input_search");

    const input = document.createElement('input')
    input.setAttribute("type", "text");
    input.setAttribute("id", "input_" + Filter)
    input.setAttribute("placeholder", "Rechercher " + Filter)

    const i = document.createElement('i')
    i.setAttribute("class", "fa-solid fa-magnifying-glass")

    inputSearch.appendChild(input)
    inputSearch.appendChild(i)

    wrapSearch.appendChild(inputSearch)
    extDiv.appendChild(wrapSearch)

    const option = document.createElement('div')
    option.setAttribute('class', "list_options")
    option.setAttribute('id', "option_"+Filter)

    extDiv.appendChild(option)
    flt.appendChild(extDiv)
    div.appendChild(flt)
    filter.appendChild(div)

    //ISOLER CHAQUE FILTRE
    const filterSet = new Set();
    recipes.forEach(recipe => {
        if (Filter === 'ingredients') {
            recipe.ingredients.forEach(ingredient => {
                filterSet.add(ingredient.ingredient.toLowerCase());
            });
        } else if (Filter === 'appareils') {
            filterSet.add(recipe.appliance.toLowerCase());
        } else if (Filter === 'ustensiles') {
            recipe.ustensils.forEach(ustensil => {
                filterSet.add(ustensil.toLowerCase());
            });
        }
    });

    filterSet.forEach(filterValue => {
        const filterOption = document.createElement('p');
        filterOption.setAttribute('id', 'filter_' + Filter + '_' + filterValue);
        filterOption.innerHTML = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
        filterOption.addEventListener('click', function() {
            if (Filter === 'ingredients') {
                filterState.ingredients.push(filterValue);
            } else if (Filter === 'appareils') {
                filterState.appareils.push(filterValue);
            } else if (Filter === 'ustensiles') {
                filterState.ustensiles.push(filterValue);
            }


            applyFilters();
            DisplayFilterSelected(Filter, filterValue);

            this.style.display = "none"; 
        });
        option.appendChild(filterOption);
    });

    arrow.addEventListener('click', function() {
        if (down.classList.contains("disabled")) {
            extDiv.style.display = "none";
            down.classList.remove("disabled");
            up.classList.add("disabled");
        } else {
            extDiv.style.display = "block";
            up.classList.remove("disabled");
            down.classList.add("disabled");
        }
    })

    input.addEventListener('input', function() {
        const searchValue = input.value.toLowerCase();
        const filterOptions = option.getElementsByTagName('p');
        for (let options of filterOptions) {
            const optionText = options.textContent.toLowerCase();
            if (optionText.includes(searchValue)) {
                options.style.display = ""; // Show option
            } else {
                options.style.display = "none"; // Hide option
            }
        }
    });

}

function addFilters(recipes) {
    createFilters(recipes, "ingredients")
    createFilters(recipes, "appareils")
    createFilters(recipes, "ustensiles")
}

function DisplayFilterSelected(categoryFilter, value){
    const filterContainer = document.getElementById('SelectedFilter');
    const div = document.createElement('div');
    div.classList.add('filterChoose');
    const p = document.createElement('p');
    p.textContent = value;
    const closeButton = document.createElement('span');
    closeButton.classList.add('closeButtonChoose');
    closeButton.addEventListener('click', function() {
        if (categoryFilter === 'ingredients') {
            filterState.ingredients = filterState.ingredients.filter(item => item !== value);
        } else if (categoryFilter === 'appareils') {
            filterState.appareils = filterState.appareils.filter(item => item !== value);
        } else if (categoryFilter === 'ustensiles') {
            filterState.ustensiles = filterState.ustensiles.filter(item => item !== value);
        }    
        
        filterContainer.removeChild(div);
        
        displayRecipes(recipes);
    });
    div.appendChild(p);
    div.appendChild(closeButton);
    filterContainer.appendChild(div);
}


addFilters(recipes);

export {updateFilters}
