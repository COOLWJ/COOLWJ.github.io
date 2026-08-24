---
layout: default
title: 归档
permalink: /archives/
---
<section class="page-head"><p class="eyebrow">ARCHIVES</p><h1>时间归档</h1><p>按时间回看学习、实验与项目推进的轨迹。</p></section>
<div class="archive-list">{% assign current_year = '' %}{% for post in site.posts %}{% assign year = post.date | date: '%Y' %}{% if year != current_year %}{% unless forloop.first %}</div>{% endunless %}<div class="archive-year"><h2>{{ year }}</h2>{% assign current_year = year %}{% endif %}<article><time>{{ post.date | date: '%m.%d' }}</time><div><a href="{{ post.url | relative_url }}">{{ post.title }}</a><span>{{ post.category }}</span></div></article>{% if forloop.last %}</div>{% endif %}{% endfor %}</div>
