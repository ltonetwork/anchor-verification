#!/bin/bash
rm -rf www/lto-anchor-verification
mkdir www/lto-anchor-verification
cat dist/lto-anchor-verification/{runtime,polyfills,scripts,main}.js | gzip > www/lto-anchor-verification/lto-anchor-verification.js.gz
cp dist/lto-anchor-verification/styles.css www/lto-anchor-verification/lto-anchor-verification.css
