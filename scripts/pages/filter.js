import recipes from "../../data/recipes.js"
import { displayRecipes, filterState } from "../pages/index.js";



function applyFilters() {
    displayRecipes(recipes);
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












/*

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
    ContainerDivFilter.appendChild(MainDiv)*/


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
