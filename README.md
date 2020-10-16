# V_ Engineering Website

This the git repo for https://www.valtech.engineering. Pushing to `main` will automatically generate a new build of the site using [Jekyll](https://jekyllrb.com) and is hosted on [Github Pages](https://pages.github.com). 

## Local Development

It is recommended that you use `rbenv` for your Ruby and GEM  environment. Here is a decent [guide](https://jekyllrb.com/docs/installation/) if you need help setting up Ruby.

Install the bundler by running:

```
$ gem install bundler:2.1.4
```

To set up your development environment first run the following from the root directory of this repo:

```
$ bundle install
```

To build the site and make it available on your local machine:

```
$ bundle exec jekyll serve
```

## Adding New Prototypes

Prototypes are stored as a [Jekyll Collection](https://jekyllrb.com/docs/collections/). To add a new prototype complete the following:

1) Add a new file to the `_prototypes` directory with a relevant name such as `internet-smells.md`:

```
$ touch _prototypes/internet-smells.md
```

2) Add the proper front matter to the file:

```
---
layout: prototype
title:  "Internet Smells"
date: 2020-10-01
description: "This prototype does the impossible and makes it possible for you to smell things over the Internet."
prototype_url: "https://smelly.valtech.engineering"
screenshot: ""
demo: "https://smelly.valtech.engineering/images/demo.mp4"
category: "Enhanced Reality"
---
```

**Required Fields:** layout, title, description, category, screenshot
**Optional Fields:** prototype_url, demo

3) Run Jekyll locally and make sure the site is rendering properly:

```
$ bundle exec jekyll serve
```

## Demo Videos

It's probably best if full demos are hosted on Vimeo and embedded