#!/bin/bash
rm -rf docs/lto-anchor-verification
mkdir docs/lto-anchor-verification
cat dist/lto-anchor-verification/{runtime,polyfills,scripts,main}.js | gzip > docs/lto-anchor-verification/lto-anchor-verification.js.gz
cat dist/lto-anchor-verification/{runtime,polyfills,scripts,main}.js > docs/lto-anchor-verification/lto-anchor-verification.js
cp dist/lto-anchor-verification/styles.css docs/lto-anchor-verification/lto-anchor-verification.css
