+++
title = "Daehyun Tech Blog"
description = "Paper Review, AI Engineering, and Practical Tech Insights"
layout = "landing"
bookToC = false
bookSearchExclude = true
+++

<section class="pb-top-hero" aria-labelledby="pb-home-title">
  <h1 id="pb-home-title">Daehyun's Tech Blog</h1>
  <p class="pb-top-sub">Paper Review, 개인 프로젝트 기록, 그리고 AI/Engineering 인사이트를 실무 관점으로 정리합니다.</p>
</section>

<div class="pb-layout">

<aside class="pb-sidebar" id="pb-sidebar" aria-label="Post filters">

  <div class="pb-search-wrap">
    <label for="pb-search" class="pb-filter-title">Search</label>
    <input type="search" id="pb-search" class="pb-select" placeholder="Search posts" autocomplete="off" />
  </div>

  <div class="pb-view-row" role="group" aria-label="View mode">
    <span class="pb-view-label">View</span>
    <button id="pb-btn-grid" class="pb-view-btn pb-view-btn--active" aria-label="Grid view" title="Grid view">
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="6" height="6" rx="1.2" />
        <rect x="9" y="1" width="6" height="6" rx="1.2" />
        <rect x="1" y="9" width="6" height="6" rx="1.2" />
        <rect x="9" y="9" width="6" height="6" rx="1.2" />
      </svg>
    </button>
    <button id="pb-btn-list" class="pb-view-btn" aria-label="List view" title="List view">
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="2" width="14" height="2.5" rx="1.2" />
        <rect x="1" y="6.75" width="14" height="2.5" rx="1.2" />
        <rect x="1" y="11.5" width="14" height="2.5" rx="1.2" />
      </svg>
    </button>
  </div>

  <div class="pb-filter-section">
    <label class="pb-filter-title" for="pb-sort">Sort by</label>
    <select id="pb-sort" class="pb-select" aria-label="Sort by">
      <option value="newest" selected>Newest</option>
      <option value="oldest">Oldest</option>
      <option value="alpha">A to Z</option>
    </select>
  </div>

  <div class="pb-filter-section">
    <label class="pb-filter-title" for="pb-category">Category</label>
    <select id="pb-category" class="pb-select" aria-label="Category filter">
      <option value="">All categories</option>
      <option value="paper">Paper Review</option>
      <option value="ai">AI / ML</option>
      <option value="engineering">Engineering</option>
    </select>
  </div>

  <div class="pb-filter-section">
    <label class="pb-filter-title" for="pb-product">Product</label>
    <select id="pb-product" class="pb-select" aria-label="Product filter">
      <option value="">All products</option>
      <option value="llm">LLM</option>
      <option value="rag">RAG</option>
      <option value="transformer">Transformer</option>
      <option value="nlp">NLP</option>
      <option value="mcts">MCTS</option>
    </select>
  </div>

  <div class="pb-filter-section">
    <label class="pb-filter-title" for="pb-usecase">Use Case</label>
    <select id="pb-usecase" class="pb-select" aria-label="Use case filter">
      <option value="">All use cases</option>
      <option value="reasoning">Reasoning</option>
      <option value="small-language-model">Small LM</option>
      <option value="mlops">MLOps</option>
      <option value="inference">Inference</option>
    </select>
  </div>

  <button class="pb-clear-btn" id="pb-clear" type="button">Clear filters</button>

</aside>

<main class="pb-main">
{{< post_grid >}}
</main>

</div>

<div class="dt-section-head">
  <h2>Tags</h2>
</div>

{{< top_tags limit="16" >}}
