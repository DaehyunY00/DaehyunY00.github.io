/* ============================================================
   filter.js — Post Browser client-side filter & sort
   ============================================================ */
(function () {
  'use strict';

  var searchInput = document.getElementById('pb-search');
  var sortSelect = document.getElementById('pb-sort');
  var categorySelect = document.getElementById('pb-category');
  var productSelect = document.getElementById('pb-product');
  var useCaseSelect = document.getElementById('pb-usecase');

  var btnGrid = document.getElementById('pb-btn-grid');
  var btnList = document.getElementById('pb-btn-list');
  var grid = document.getElementById('pb-grid');
  var noResults = document.getElementById('pb-no-results');
  var countEl = document.getElementById('pb-count');
  var clearBtn = document.getElementById('pb-clear');

  if (!grid) return;

  var debounceTimer = null;

  function debounce(fn, ms) {
    return function () {
      var args = arguments;
      var ctx = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        fn.apply(ctx, args);
      }, ms);
    };
  }

  function sortCards(cards, sortBy) {
    cards.sort(function (a, b) {
      if (sortBy === 'newest') return Number(b.dataset.date) - Number(a.dataset.date);
      if (sortBy === 'oldest') return Number(a.dataset.date) - Number(b.dataset.date);
      if (sortBy === 'alpha') return (a.dataset.title || '').localeCompare(b.dataset.title || '');
      return 0;
    });
  }

  function apply() {
    var query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    var sortBy = sortSelect ? sortSelect.value : 'newest';
    var category = categorySelect ? categorySelect.value : '';
    var product = productSelect ? productSelect.value : '';
    var useCase = useCaseSelect ? useCaseSelect.value : '';

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.pb-card'));

    var visible = cards.filter(function (card) {
      var title = card.dataset.title || '';
      var cardCategory = card.dataset.category || '';
      var cardTags = (card.dataset.tags || '').split(' ').filter(Boolean);

      if (query && title.indexOf(query) === -1) return false;
      if (category && cardCategory !== category) return false;
      if (product && cardTags.indexOf(product) === -1) return false;
      if (useCase && cardTags.indexOf(useCase) === -1) return false;

      return true;
    });

    cards.forEach(function (card) {
      card.hidden = true;
    });

    sortCards(visible, sortBy);

    visible.forEach(function (card) {
      card.hidden = false;
      grid.appendChild(card);
    });

    if (countEl) countEl.textContent = String(visible.length);
    if (noResults) noResults.style.display = visible.length === 0 ? 'block' : 'none';
  }

  function setView(mode) {
    if (!grid) return;

    if (mode === 'list') {
      grid.classList.remove('pb-view-grid');
      grid.classList.add('pb-view-list');
      if (btnList) btnList.classList.add('pb-view-btn--active');
      if (btnGrid) btnGrid.classList.remove('pb-view-btn--active');
      localStorage.setItem('pb-view', 'list');
      return;
    }

    grid.classList.remove('pb-view-list');
    grid.classList.add('pb-view-grid');
    if (btnGrid) btnGrid.classList.add('pb-view-btn--active');
    if (btnList) btnList.classList.remove('pb-view-btn--active');
    localStorage.setItem('pb-view', 'grid');
  }

  function clearAll() {
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'newest';
    if (categorySelect) categorySelect.value = '';
    if (productSelect) productSelect.value = '';
    if (useCaseSelect) useCaseSelect.value = '';
    apply();
  }

  if (searchInput) searchInput.addEventListener('input', debounce(apply, 220));
  if (sortSelect) sortSelect.addEventListener('change', apply);
  if (categorySelect) categorySelect.addEventListener('change', apply);
  if (productSelect) productSelect.addEventListener('change', apply);
  if (useCaseSelect) useCaseSelect.addEventListener('change', apply);

  if (btnGrid) btnGrid.addEventListener('click', function () { setView('grid'); });
  if (btnList) btnList.addEventListener('click', function () { setView('list'); });
  if (clearBtn) clearBtn.addEventListener('click', clearAll);

  try {
    if (localStorage.getItem('pb-view') === 'list') {
      setView('list');
    }
  } catch (err) {
    // no-op
  }

  apply();
})();
