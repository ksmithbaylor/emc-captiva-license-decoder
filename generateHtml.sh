#!/usr/bin/env zsh

rm -f index.html
cat dev.html | grep -v '</body>' | grep -v '</html>' | grep -v 'dist/bundle' >> index.html
echo '<script>' >> index.html
cat dist/bundle.js >> index.html
echo '</script></body></html>' >> index.html
echo 'Generated index.html'
