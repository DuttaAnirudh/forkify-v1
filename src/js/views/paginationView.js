import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curaPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // 1. Page 1 -- There are other pages
    if (curaPage === 1 && numPages > 1) {
      return `<button data-goto ="${
        curaPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curaPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>  `;
    }

    // 2. Page 1 -- No other pages
    if (numPages === 1) {
      return ``;
    }

    // 3. Other Page
    if (curaPage < numPages) {
      return `<button data-goto ="${
        curaPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curaPage - 1}</span>
    </button>
      <button data-goto ="${
        curaPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curaPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>  `;
    }

    // 4. Last Page
    if (curaPage === numPages && numPages > 1) {
      return `<button data-goto ="${
        curaPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curaPage - 1}</span>
    </button>`;
    }
  }
}

export default new PaginationView();
/* <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>  */
