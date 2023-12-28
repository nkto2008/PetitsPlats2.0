import recipes from "../../data/recipes.js"
import { displayRecipes, filterState } from "../pages/index.js";



function applyFilters() {
    displayRecipes();
}

function createFilters(recipes, Filter) {
    const ContainerDivFilter = document.getElementById('container-filter')

    const MainDiv = document.createElement('div')
    const FilterDiv = document.createElement('div')
    FilterDiv.classList.add('list')
    FilterDiv.setAttribute('id', 'filter_'+Filter)

    const OpenDiv = document.createElement('div')
    OpenDiv.classList.add('header-list')
    OpenDiv.setAttribute('id','open_'+Filter)

    const nameFilter = document.createElement('p')
    nameFilter.innerHTML = Filter

    const chevronD = document.createElement("i");
    chevronD.setAttribute("class", "fa-solid fa-chevron-down");

    const chevronU = document.createElement("i");
    chevronU.setAttribute("class", "fa-solid fa-chevron-up disabled");

    OpenDiv.appendChild(nameFilter)
    OpenDiv.appendChild(chevronD)
    OpenDiv.appendChild(chevronU)

    FilterDiv.appendChild(OpenDiv)

    const extensionFiler = document.createElement('div')
    const wFilter = document.createElement('div')
    const sFilter = document.createElement('div')
    const sText = document.createElement('input')
    sText.type = 'text'
    sText.placeholder = 'Rechercher ' + Filter
    sText.setAttribute('id','input_'+Filter)

    sFilter.appendChild(sText)
    wFilter.appendChild(sFilter)
    extensionFiler.appendChild(wFilter)

    const ListElementDiv = document.createElement('div')
    ListElementDiv.setAttribute('id','list_'+Filter)
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

    // Creating <p> elements for each unique filter
    filterSet.forEach(filterValue => {
        const filterOption = document.createElement('p');
        filterOption.setAttribute('id', 'filter_' + Filter + '_' + filterValue);
        filterOption.textContent = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
        filterOption.addEventListener('click', function() {
            // Update filterState based on the clicked filter
            if (Filter === 'ingredients') {
                filterState.ingredients.push(filterValue);
            } else if (Filter === 'appareils') {
                filterState.appareils.push(filterValue);
            } else if (Filter === 'ustensiles') {
                filterState.ustensiles.push(filterValue);
            }

            // Apply filters and update UI
            applyFilters();
            DisplayFilterSelected(Filter, filterValue);

            // Remove the clicked option from the list
            this.style.display = "none"; // Hide the clicked option
        });
        ListElementDiv.appendChild(filterOption);
    });

    sText.addEventListener('input', function() {
        const searchValue = sText.value.toLowerCase();
        const filterOptions = ListElementDiv.getElementsByTagName('p');
        for (let option of filterOptions) {
            const optionText = option.textContent.toLowerCase();
            if (optionText.includes(searchValue)) {
                option.style.display = ""; // Show option
            } else {
                option.style.display = "none"; // Hide option
            }
        }
    });

    MainDiv.appendChild(extensionFiler)
    MainDiv.appendChild(ListElementDiv)
    ContainerDivFilter.appendChild(FilterDiv)
    ContainerDivFilter.appendChild(MainDiv)


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
        
        displayRecipes();
    });
    div.appendChild(p);
    div.appendChild(closeButton);
    filterContainer.appendChild(div);
}


addFilters(recipes);
