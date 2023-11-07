import icons from 'url:../../img/icons.svg';

/**
 * @class View
 * @classdesc A base class for rendering and managing the views in the user interface
 * @property {Object|Object[]}  _data - data to be rendered by view
 */
export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data - The data is rendered(e.g recipe)
   * @param {boolean} [render=true] - If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} - A markup is returned if render = false
   * @this {Object} - View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update the content & attributes of the view based on new data
   * @param {Object | Object[]} data - New data to to update view with
   * @returns {undefined}
   * @this {Object} - View instance
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // .isEqaulNode()
    // -->.isEqualNode will compare the content of newEl to the curEl
    // -->can only be used in node list
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // UPDATES CHANGED TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // UPDATES CHANGED ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**
   * Clears the DOM for new markup
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render the Loading Spinner in the user interface
   */
  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render an error message in the user interface
   * @param {string} [message = this._errorMessage] - The error message to display
   * @return {void}
   * @this {Object} - View instance
   */
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render a normal message in the user interface
   * @param {string} [message = this._message] - The message to display
   * @returns {void}
   * @this {Object} - View intance
   */
  renderMessage(message = this._message) {
    const markup = `<div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
