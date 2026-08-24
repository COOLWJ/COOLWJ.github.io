---
layout: default
title: 搜索
permalink: /search/
---
<section class="page-head"><p class="eyebrow">SEARCH</p><h1>全站搜索</h1><p>搜索文章标题、分类、标签和正文内容。</p></section>
<div class="search-box"><label for="search-input">输入关键词</label><input id="search-input" type="search" placeholder="例如：ROS2、STM32、SSPP、CAN 通信" autocomplete="off"><p id="search-count">请输入关键词开始搜索</p></div><div id="search-results" class="search-results"></div>
<script id="search-data" type="application/json">[{% for post in site.posts %}{"title":{{ post.title | jsonify }},"url":{{ post.url | relative_url | jsonify }},"date":{{ post.date | date: '%Y.%m.%d' | jsonify }},"category":{{ post.category | jsonify }},"tags":{{ post.tags | jsonify }},"content":{{ post.content | strip_html | strip_newlines | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}]</script>
<script src="{{ '/assets/search.js' | relative_url }}"></script>
