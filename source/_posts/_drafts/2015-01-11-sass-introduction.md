---
title: A Introduction to Sass
tags: sass
---

### What's Sass

Sass is shor for Syntactically Awesome Stylesheets, and

> Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. --[Sass](http://sass-lang.com/)

Sass is a preprocessor, tranforming a Sass file to normal CSS stylesheet. It provides features like variables, nesting, mixins, inheritance etc..

### [Difference](http://stackoverflow.com/questions/5654447/whats-the-difference-between-scss-and-sass) between Sass And SCSS

Sass is the preprocess, and has four sytanx parsers: sass, scss, CSS and less. sass and scss have different syntax, and all four of them convert different sytax into Abstract Syntax Tree, then to CSS. sass syntax is more concise.

### Installation

``` bash
sudo gem install sass 
```

### [Start Guides](http://sass-lang.com/guide)

#### Variables

Sass uses `$` as the first letter of a variable. A variable can be asigned with any CSS value. 

``` scss
$primary-color: #333;

body {
    color: $primary-color;
}
```

#### Nesting

You can nest CSS selectors as the same hierarchy as the HTML.

``` scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
```

#### Partials

A partial is a snippts of CSS, partial Sass file name starts with a underscore `_`, like `_partial.scss`, and can be imported by other files using `@import`.

#### Import

Sass `@import` doesn't fire up a HTTP request, it just includes partial file's content.

#### Mixins

A mixin lets you make groups of CSS declarations using `@mixin` directive, and reuse it using `@include` directive.

``` scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
```

#### Extend/Inheritance

Inheritance lets you share one selector's property to another using `@extend`.

``` scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}
```

#### Operators

Sass provides basic math operators for `article` and `aside`, like `+`, `-`, `*`, `/`, `%`

``` scss
.container { width: 100%; }

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complimentary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

### [More Information](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)