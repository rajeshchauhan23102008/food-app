import { DOMElements } from '../common/common.view';

export function addRecipeLike(recipe) {
  const recipeLikeMarkup = `<li class="mb-5">
  <a class="" href="#${recipe.idMeal}">
    <img
      class="img-fluid likes-img rounded"
      src="${recipe.strMealThumb}"
      alt="${recipe.strMeal}"
    />
    <div class="">
      <h5 class=" text-light">${recipe.strMeal}</h5>
    </div>
  </a>
</li>`;

  DOMElements.likesListEl.insertAdjacentHTML('afterbegin', recipeLikeMarkup);
}

export function removeRecipeLike(recipeId) {
  // https://www.w3schools.com/csSref/css_selectors.asp
  // * in a[href*=] selects subString.
  const listItemEl = document.querySelector(
    `.likes-list a[href*="${recipeId}"]`
  );

  if (listItemEl) {
    const liEl = listItemEl.closest('li');

    if (liEl) {
      liEl.remove(); // ES6.
      // liEl.parentElement.removeChild(liEl); // ES5.
    }
  }
}
