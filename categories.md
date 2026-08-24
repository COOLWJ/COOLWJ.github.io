---
layout: default
title: 分类
permalink: /categories/
---
<section class="page-head"><p class="eyebrow">CATEGORIES</p><h1>文章分类</h1><p>分类代表长期研究和学习的大方向。</p></section>
<div class="taxonomy-grid">{% assign categories = site.categories | sort %}{% for category in categories %}{% assign name = category[0] %}<section id="{{ name | slugify }}" class="taxonomy-card"><h2>{{ name }} <small>{{ category[1] | size }}</small></h2>{% for post in category[1] %}<a href="{{ post.url | relative_url }}"><span>{{ post.title }}</span><time>{{ post.date | date: '%Y.%m.%d' }}</time></a>{% endfor %}</section>{% endfor %}</div>
