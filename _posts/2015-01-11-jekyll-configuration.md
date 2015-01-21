---
title: Jekyll Configuration
tags: jekyll
---

The [configuration](http://jekyllrb.com/docs/configuration/) options can be specified in `_config.yml` or as flags for `jekyll` commandline tool.

### Global Configuration

| setting | options | flags|
|---|---|---  |
|site source| `source DIR`| `-s, --source DIR`|
|site destination|`destination DIR`|`-d, --destination DIR`|
|safe, disable plugins and symbolic links|`safe: BOOL`|`--safe`|
|exclude|`exclude: [DIR, FILE, ...]`||
|include|`include: [DIR, FILE, ...]`||
|keey_files, keep files in destination|`keep_files: [DIR, FILE, ...]`||
|timezone|`timezone: TIMEZONE`||
|encoding, default `utf-8`|`encoding: ENCODING`||

### Build Command Options

|Setting|Options|Flags|
|---|---|---|
|Regeneration||`-w, --watch`|
|Configuration||`--config FILE1[, FILE2, ...]`|
|Drafts||`--drafts`|
|Future, publish posts with a future date|`future: BOOL`|`--future`|
|LSI|`lsi: BOOL`|`--lsi`|
|Limit Posts|`limit_posts: NUM`|`--limit-posts NUM`|
|Force Polling||`--force-polling`|
|Verbose output||`-V, --verbose`|
|Quiet output||`-q, --quiet`|

### Server Command Options

|Setting|Options|Flags|
|---|---|---|
|Local Server Port|`port: PORT`|`--port PORT`|
|Local Server Hostname|`hostname: HOSTNAME`|`--host HOSTNAME`|
|Base URL|`baseurl: URL`|`--baseurl URL`|
|Detach|`detach: BOOL`|`-d, --detach`|
|Skip initial site build||`--skip-initial-build`|

### Front Matter defaults

The `defaults` sit in `_config.yml`, saving you specifying every front matter configuration in every post and page.

`type`: `posts`, `pages`, `drafts`, collection

``` yaml
defaults:
  -
    scope:
      path: ""
      type: "posts"
    values:
      layout: "my-site"
  -
    scope:
      path: "projects"
      type: "pages"
    values:
      layout: "project" # overrides previous default layout
      author: "Mr. Hyde"
```

### Default Configuration

``` yaml
# Where things are
source:      .
destination: ./_site
plugins:     ./_plugins
layouts:     ./_layouts
data_source: ./_data
collections: null

# Handling Reading
safe:         false
include:      [".htaccess"]
exclude:      []
keep_files:   [".git", ".svn"]
encoding:     "utf-8"
markdown_ext: "markdown,mkdown,mkdn,mkd,md"
textile_ext:  "textile"

# Filtering Content
show_drafts: null
limit_posts: 0
future:      true
unpublished: false

# Plugins
whitelist: []
gems:      []

# Conversion
markdown:    kramdown
highlighter: pygments
lsi:         false
excerpt_separator: "\n\n"

# Serving
detach:  false
port:    4000
host:    127.0.0.1
baseurl: "" # does not include hostname

# Backwards-compatibility
relative_permalinks: false

# Outputting
permalink:     date
paginate_path: /page:num
timezone:      null

quiet:    false
defaults: []

# Markdown Processors
maruku:
  use_tex:    false
  use_divs:   false
  png_engine: blahtex
  png_dir:    images/latex
  png_url:    /images/latex
  fenced_code_blocks: true

rdiscount:
  extensions: []

redcarpet:
  extensions: []

kramdown:
  auto_ids:       true
  footnote_nr:    1
  entity_output:  as_char
  toc_levels:     1..6
  smart_quotes:   lsquo,rsquo,ldquo,rdquo
  enable_coderay: false

  coderay:
    coderay_wrap:              div
    coderay_line_numbers:      inline
    coderay_line_number_start: 1
    coderay_tab_width:         4
    coderay_bold_every:        10
    coderay_css:               style

redcloth:
  hard_breaks: true
```

### Markdown Options

#### Redcarpet

`extensions` options: 

- `no-fenced-code-blocks`, default `fenced-code-blocks`
- `smark`, SmartPants
- `tables`
- `no-intra-emphasis`
- `autolink`

#### Kramdown

`input` option: 

- `GFM`, Github Flavored Markdown

#### Custom Markdown Processor

Create one, put in `_plugin` folder, or as a gem, configurate in `_config.yml`

- `markdown: XXX`