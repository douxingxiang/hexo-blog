---
title: Writing Posts and Pages
tags: jekyll
---

## Creating posts
You must create post in `_post` folder, the post file name must be in the format of

```
year-month-day-title.MARKUP
```

### Display an index of posts

``` 
for post in site.posts
endfor
```
### Post excerpt

`post.excerpt`

### Hightlighten the code snippet

`highlight ruby`

## Working with drafts

`jekyll build` or `jekyll serve` with `--drafts`

## Writing Pages

- Named html files
- Named folders containing html files