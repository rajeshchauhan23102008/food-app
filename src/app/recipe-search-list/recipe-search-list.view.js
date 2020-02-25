import { DOMElements } from '../common/common.view';

export function getRecipeName() {
  return DOMElements.searchInputEl.value;
}

export function highlighter(recipeItemEl) {
  removeActiveCSSClass();
  addActiveCSSClass(recipeItemEl);
}
function addActiveCSSClass(recipeItemEl) {
  // add active css class to clicked anchor link.
  const linkEl = recipeItemEl.closest('.recipe-link');

  if (linkEl) {
    linkEl.classList.add('bg-secondary');
  }
}

function removeActiveCSSClass() {
  // Remove active css class from any other anchor link.
  const allLinksWithActiveCssClassEl = DOMElements.recipeListEl.querySelectorAll(
    '.bg-secondary'
  );

  if (allLinksWithActiveCssClassEl) {
    for (let link of allLinksWithActiveCssClassEl) {
      link.classList.remove('bg-secondary');
    }
  }
}

export function clearRecipeList() {
  // clear recipe list.
  DOMElements.recipeListEl.innerHTML = '';

  // clear pagination.
  DOMElements.paginationEl.innerHTML = '';
}

function displayPagination(
  totalRecipes,
  pageNumber = 1,
  numberOfRecipePerPage = 3
) {
  // previous button with page no. : Hide previous button on first page. = check first page.
  // next button with page no. : Hide next button on last page. = check last page
  // display both previous and next buttons for any other pages.
  // hide both previous and next button if only one page is available. = check only one page.

  // data: TotalRecipes, PageNo, NumberOfRecipePerPage.
  // computed values: totalPages = totalRecipes / numberOfRecipePerPage

  const totalPages = Math.ceil(totalRecipes / numberOfRecipePerPage);

  let recipeListPageSectionEl = DOMElements.paginationEl;

  recipeListPageSectionEl.innerHTML = '';

  if (totalPages > 1) {
    const prevBtnMarkup = getPaginationBtnMarkup(pageNumber, 'prev');
    const nextBtnMarkup = getPaginationBtnMarkup(pageNumber, 'next');

    if (pageNumber === 1) {
      // hide previous button on first page.
      recipeListPageSectionEl.insertAdjacentHTML('beforeend', nextBtnMarkup);
    } else if (pageNumber === totalPages) {
      // hide next button on last page
      recipeListPageSectionEl.insertAdjacentHTML('beforeend', prevBtnMarkup);
    } else {
      // display both previous and next buttons for any other pages.
      recipeListPageSectionEl.insertAdjacentHTML('beforeend', prevBtnMarkup);
      recipeListPageSectionEl.insertAdjacentHTML('beforeend', nextBtnMarkup);
    }
  }
}

function getPaginationBtnMarkup(pageNumber, type) {
  const gotoPageNumber = type === 'prev' ? pageNumber - 1 : pageNumber + 1;
  let buttonMarkup = `<button class="mr-1 btn btn-outline-light " data-goto=${gotoPageNumber}>
  <svg class="">
    <use href="content/img/icons.svg#icon-arrow-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
  </svg>
  <span>Page ${gotoPageNumber}</span>
</button>`;

  return buttonMarkup;
}

export function displayLoader() {
  const spinningLoaderMarkup = '<div class="lds-hourglass"></div>';

  DOMElements.recipeDetailEl.insertAdjacentHTML(
    'afterbegin',
    spinningLoaderMarkup
  );
}

export function hideLoader() {
  const spinningLoaderEl = document.querySelector('.lds-hourglass');

  //   spinningLoaderEl.remove(); //ES6.
  spinningLoaderEl.parentElement.removeChild(spinningLoaderEl); // ES5
}

export function displayRecipes(
  recipes,
  pageNumber = 1,
  numberOfRecipesPerPage = 3
) {
  clearRecipeList();

  const recipesToDisplay = getPaginatedRecipes(
    recipes,
    pageNumber,
    numberOfRecipesPerPage
  );

  displayRecipeList(recipesToDisplay);

  displayPagination(recipes.length, pageNumber, numberOfRecipesPerPage);
}

function displayRecipeList(recipesToDisplay) {
  for (let item of recipesToDisplay) {
    // console.log(item);

    let recipeItemMarkup = `<li class="p-3 recipe-link">
    <a class="text-light media" href="#${item.idMeal}">
    <div class="media-body ">
     
      <img
      class="align-self-center img-fluid rounded-circle"
      src="${item.strMealThumb}"
      alt="${item.strMeal}"
    />
        <h6 class="">${item.strMeal}</h6>
     
    </div>
    </a>
  </li>`;

    DOMElements.recipeListEl.insertAdjacentHTML('beforeend', recipeItemMarkup);
  }
}

function getPaginatedRecipes(
  allRecipes,
  pageNumber = 1,
  NumberOfRecipesPerPage = 3
) {
  // pagination data: allRecipes=19, pageNumber, NumberOfRecipesPerPage = 3.
  // calculated data: from ; to

  // case 1: pageNumber=1;
  // recipesToDisplay: from = 0 - to= from + NumberOfRecipesPerPage

  // case 2: pageNumber=2;
  // recipesToDisplay: from = 3 - to= from + NumberOfRecipesPerPage

  // case 3: pageNumber=3;
  // recipesToDisplay: from = 10 - to= from + NumberOfRecipesPerPage

  const from = (pageNumber - 1) * NumberOfRecipesPerPage;

  const recipesToShow = allRecipes.slice(from, from + NumberOfRecipesPerPage);

  return recipesToShow;
}
