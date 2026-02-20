/* ============================================================
   filter.js — Post Browser client-side filter & sort
   Depends on pb-* HTML written by post_grid.html shortcode
   ============================================================ */
(function () {
  'use strict';

  /* ---- DOM refs ---- */
  var searchInput = document.getElementById('pb-search');
  var sortRadios  = document.querySelectorAll('input[name="pb-sort"]');
  var catChecks   = document.querySelectorAll('[data-filter="category"]');
  var tagChecks   = document.querySelectorAll('[data-filter="tags"]');
  var btnGrid     = document.getElementById('pb-btn-grid');
  var btnList     = document.getElementById('pb-btn-list');
  var grid        = document.getElementById('pb-grid');
  var noResults   = document.getElementById('pb-no-results');
  var countEl     = document.getElementById('pb-count');
  var clearBtn    = document.getElementById('pb-clear');

  if (!grid) return; /* not on a page with the post browser */

  var debounceTimer = null;

  /* ---- Helpers ---- */
  function debounce(fn, ms) {
    return function () {
      var args = arguments;
      var ctx  = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  function checkedValues(inputs) {
    var out = [];
    inputs.forEach(function (el) { if (el.checked) out.push(el.value); });
    return out;
  }

  function getSortValue() {
    var checked = null;
    sortRadios.forEach(function (r) { if (r.checked) checked = r.value; });
    return checked || 'newest';
  }

  /* ---- Core: filter + sort + render ---- */
  function apply() {
    var query   = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var cats    = checkedValues(catChecks);
    var tags    = checkedValues(tagChecks);
    var sortBy  = getSortValue();

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.pb-card'));

    /* --- Filter --- */
    var visible = cards.filter(function (card) {
      var title     = card.dataset.title || '';
      var cat       = card.dataset.category || '';
      var cardTags  = (card.dataset.tags || '').split(' ');

      if (query && title.indexOf(query) === -1) return false;
      if (cats.length && cats.indexOf(cat) === -1) return false;
      if (tags.length && !tags.some(function (t) { return cardTags.indexOf(t) !== -1; })) return false;

      return true;
    });

    /* --- Show / hide --- */
    cards.forEach(function (c) { c.hidden = true; });
    visible.forEach(function (c) { c.hidden = false; });

    /* --- Sort (re-insert DOM nodes in order) --- */
    visible.sort(function (a, b) {
      if (sortBy === 'newest') return Number(b.dataset.date) - Number(a.dataset.date);
      if (sortBy === 'oldest') return Number(a.dataset.date) - Number(b.dataset.date);
      if (sortBy === 'alpha')  return (a.dataset.title || '').localeCompare(b.dataset.title || '');
      return 0;
    });
    visible.forEach(function (c) { grid.appendChild(c); });

    /* --- Update UI state --- */
    if (countEl)   countEl.textContent = visible.length;
    if (noResults) noResults.style.display = visible.length === 0 ? 'block' : 'none';
  }

  /* ---- View toggle ---- */
  function setView(mode) {
    if (!grid) return;
    if (mode === 'grid') {
      grid.classList.remove('pb-view-list');
      grid.classList.add('pb-view-grid');
      if (btnGrid) { btnGrid.classList.add('pb-view-btn--active'); }
      if (btnList) { btnList.classList.remove('pb-view-btn--active'); }
      localStorage.setItem('pb-view', 'grid');
    } else {
      grid.classList.remove('pb-view-grid');
      grid.classList.add('pb-view-list');
      if (btnList) { btnList.classList.add('pb-view-btn--active'); }
      if (btnGrid) { btnGrid.classList.remove('pb-view-btn--active'); }
      localStorage.setItem('pb-view', 'list');
    }
  }

  /* ---- Clear all filters ---- */
  function clearAll() {
    if (searchInput) searchInput.value = '';
    catChecks.forEach(function (c) { c.checked = false; });
    tagChecks.forEach(function (c) { c.checked = false; });
    sortRadios.forEach(function (r) { r.checked = (r.value === 'newest'); });
    apply();
  }

  /* ---- Event listeners ---- */
  if (searchInput) {
    searchInput.addEventListener('input', debounce(apply, 220));
  }
  sortRadios.forEach(function (r) { r.addEventListener('change', apply); });
  catChecks.forEach(function (c)  { c.addEventListener('change', apply); });
  tagChecks.forEach(function (c)  { c.addEventListener('change', apply); });

  if (btnGrid) btnGrid.addEventListener('click', function () { setView('grid'); });
  if (btnList) btnList.addEventListener('click', function () { setView('list'); });
  if (clearBtn) clearBtn.addEventListener('click', clearAll);

  /* ---- Restore saved view preference ---- */
  try {
    var savedView = localStorage.getItem('pb-view');
    if (savedView === 'list') setView('list');
  } catch (e) {}

  /* ---- Init ---- */
  apply();

})();
