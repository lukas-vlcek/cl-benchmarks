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