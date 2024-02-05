import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { numberToFraction } from '../helpers.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _message = '';
  _errorMessage = 'We could not find the recipe. Please try another one!';

  /**
   * PUBLISHER - adding event handlers to render content when the hash of the URL changes or when page loads.
   *
   * This method attaches the event listeners to the 'hashchange' and 'load' events on the window object
   * and calls the provided handler function when these events occur.
   * @param {function} handler - The callback function to execute when 'hashchange' or 'load' event occurs
   * @returns {void}
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * PUBLISHER - adding event handler to update 'servings' when a btn with class 'btn--update-servings' is clicked.
   *
   * This method attaches a click event handler to the '_parentElement' and using event delegation checks if the clicked element is a btn with class 'btn--update-servings'.
   * If true, it extracts the dataset property 'updateTo' from the element and passes it into handler function
   * @param {function} handler - The callback function to execute when there's a 'click' event on 'btn--update-servings' btn
   * @returns {void}
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;

      // 3.
      if (+updateTo > 0) {
        handler(+updateTo);
      }
    });
  }

  /**
   * PUBLISHER - adding event handler to update bookmarks when a btn with class 'btn--bookmark' is clicked.
   *
   * This method attaches a click event handler to the '_parentElement' and using event delegation checks if the clicked element is a btn with class 'btn--bookmark'.
   * If true, the handler functiion is called.
   * @param {function} handler - The callback function to execute when there's a 'click' event on 'btn--bookmark' btn
   * @returns {void}
   */
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  /**
   * Generating markup(string) to be added in DOM to render a recipe in user interface
   *
   * @returns {string} - To be used by the 'render' & 'update' method to render content on user interface
   * @this {Object} - View instance
   */
  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-user"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to ="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to ="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateMarkupIngredients).join('')}
   </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  /**
   * Generating markup(string) for the list of ingredients in the recipe one by one
   *
   * @param {Object} ing - The data to be rendered
   * @returns {string} - The markup for 1 ingredient to be rendered on the user interface
   */
  _generateMarkupIngredients(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity"> ${
        ing.quantity ? numberToFraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
        </li> 
        `;
  }
}

export default new RecipeView();
