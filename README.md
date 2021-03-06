# Benchmarks

Common Logging performance tests and benchmarks visualization.

Live preview: <http://lukas-vlcek.github.io/cl-benchmarks/>

## How it is implemented

A small fraction of code is based on Jekyll and its life-cycle, the
rest is dynamic DOM using React and D3 charting.

### Development

Use the following command for local development:

````
jekyll serve --config _config.yml,_config-dev.yml
````

Note, this page is using custom plugins, which means it can not be used
for GitHub Pages. See <https://github.com/jekyll/jekyll/issues/325> or
<https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/>.

To publish this site online on GitHub you need to build this site locally
and then push generated results into `gh-pages` branch.
See <http://davidensinger.com/2013/04/deploying-jekyll-to-github-pages/>
for inspiration.