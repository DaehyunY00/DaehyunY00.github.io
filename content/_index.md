+++
title = "Daehyun Tech Blog"
description = "AI/ML Tech Blog"
layout = "landing"
bookToC = false
bookSearchExclude = true
+++

<div class="pb-layout">

<aside class="pb-sidebar" id="pb-sidebar">

  <!-- Search -->
  <div class="pb-search-wrap">
    <svg class="pb-search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="#555" stroke-width="1.5"/>
      <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <input type="search" id="pb-search" placeholder="Search posts" autocomplete="off"/>
  </div>

  <!-- View toggle -->
  <div class="pb-view-row">
    <span class="pb-view-label">View</span>
    <button id="pb-btn-grid" class="pb-view-btn pb-view-btn--active" aria-label="Grid view" title="Grid view">
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="6" height="6" rx="1.2"/>
        <rect x="9" y="1" width="6" height="6" rx="1.2"/>
        <rect x="1" y="9" width="6" height="6" rx="1.2"/>
        <rect x="9" y="9" width="6" height="6" rx="1.2"/>
      </svg>
    </button>
    <button id="pb-btn-list" class="pb-view-btn" aria-label="List view" title="List view">
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="2" width="14" height="2.5" rx="1.2"/>
        <rect x="1" y="6.75" width="14" height="2.5" rx="1.2"/>
        <rect x="1" y="11.5" width="14" height="2.5" rx="1.2"/>
      </svg>
    </button>
  </div>

  <!-- Sort by -->
  <div class="pb-filter-section">
    <h4 class="pb-filter-title">Sort by</h4>
    <label class="pb-radio"><input type="radio" name="pb-sort" value="newest" checked/>&nbsp;Newest</label>
    <label class="pb-radio"><input type="radio" name="pb-sort" value="oldest"/>&nbsp;Oldest</label>
    <label class="pb-radio"><input type="radio" name="pb-sort" value="alpha"/>&nbsp;A → Z</label>
  </div>

  <!-- Category -->
  <div class="pb-filter-section">
    <h4 class="pb-filter-title">Category</h4>
    <label class="pb-check"><input type="checkbox" data-filter="category" value="paper"/>&nbsp;Paper Review</label>
    <label class="pb-check"><input type="checkbox" data-filter="category" value="ai"/>&nbsp;AI / ML</label>
    <label class="pb-check"><input type="checkbox" data-filter="category" value="engineering"/>&nbsp;Engineering</label>
  </div>

  <!-- Product -->
  <div class="pb-filter-section">
    <h4 class="pb-filter-title">Product</h4>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="llm"/>&nbsp;LLM</label>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="rag"/>&nbsp;RAG</label>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="transformer"/>&nbsp;Transformer</label>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="nlp"/>&nbsp;NLP</label>
  </div>

  <!-- Use Case -->
  <div class="pb-filter-section">
    <h4 class="pb-filter-title">Use Case</h4>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="reasoning"/>&nbsp;Reasoning</label>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="small-language-model"/>&nbsp;Small LM</label>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="mlops"/>&nbsp;MLOps</label>
    <label class="pb-check"><input type="checkbox" data-filter="tags" value="inference"/>&nbsp;Inference</label>
  </div>

  <button class="pb-clear-btn" id="pb-clear">Clear filters</button>

</aside>

<main class="pb-main">
{{< post_grid >}}
</main>

</div>

<div class="dt-section-head">
  <h2>Browse by Tag</h2>
</div>

{{< top_tags limit="16" >}}

<script src="/js/filter.js" defer></script>
