---
layout: default
title: 标签
permalink: /tags/
---
<section class="page-head"><p class="eyebrow">TAG CLOUD</p><h1>技术标签</h1><p>标签越大，代表相关记录越多。</p></section>
{% assign max_count = 1 %}{% for tag in site.tags %}{% assign count = tag[1] | size %}{% if count > max_count %}{% assign max_count = count %}{% endif %}{% endfor %}
<div class="tag-cloud">{% assign tags = site.tags | sort %}{% for tag in tags %}{% assign weight = tag[1] | size | times: 4.0 | divided_by: max_count | plus: 1 %}<a href="#{{ tag[0] | slugify }}" style="--weight:{{ weight }}">{{ tag[0] }} <small>{{ tag[1] | size }}</small></a>{% endfor %}</div>
<div class="tag-groups">{% for tag in tags %}<section id="{{ tag[0] | slugify }}"><h2># {{ tag[0] }}</h2>{% for post in tag[1] %}<a href="{{ post.url | relative_url }}"><span>{{ post.title }}</span><time>{{ post.date | date: '%Y.%m.%d' }}</time></a>{% endfor %}</section>{% endfor %}</div>
