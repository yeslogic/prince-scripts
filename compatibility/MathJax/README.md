# MathJax Compatibility

This script allows Prince to render mathematics with [MathJax](https://www.mathjax.org/).

## Sample HTML

The following document shows how use MathJax with Prince. Note that when running Prince the `--javascript` option must be supplied.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>MathJax SVG Example</title>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script src="compat.js"></script><!-- script from prince-scripts -->
  <script id="MathJax-script" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
</head>
<body>
  <h1>MathJax Sample</h1>

  <p>
    When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
    \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
  </p>
</body>
</html>
```
