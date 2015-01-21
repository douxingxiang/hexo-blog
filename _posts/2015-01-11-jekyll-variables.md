---
title: Jekyll Variables
tags: jekyll
---

## Global Variables

- `site`, sitewide information, and `_config.yml` configuration information
- `page`, page specific information and YAML front matter
- `content`, in layout files, the content transfered
- `pagenator`, effect when `paginate` is configurated

## Site Variables

- `site.time`, when jekyll run
- `site.pages`, all Pages
- `site.posts`, all Posts
- `site.related_posts`, jekyll --lsi(latent sematic indexing)
- `site.static_files`, each has `path`, `modified_time`, `extname` properties
- `site.html_pages`, all HTML Pages
- `site.collections`, all collections
- `site.data`, all `_data`
- `site.documents`, all collection documents
- `site.categories.CATEGORY`, all posts in `CATEGORY`
- `site.tags.TAG`, all posts in `TAG`
- `site.CONFIGURATION_DATA`

## Page Variables

- `page.content`
- `page.title`
- `page.excerpt`
- `page.url`
- `page.date`
- `page.id`
- `page.categories`
- `page.tags`
- `page.path`, path to raw post or page
- `page.next`
- `page.previous`

## Paginator

- `paginator.per_page`
- `paginator.posts`
- `paginator.total_posts`
- `paginator.total_pages`
- `paginator.page`
- `paginator.previous_page`
- `paginator.previous_page_path`
- `paginator.next_page`
- `paginator.next_page_path`

