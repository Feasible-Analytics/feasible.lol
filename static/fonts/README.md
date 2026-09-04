# Fonts

`archivo-latin-wght-normal.woff2` and `archivo-latin-ext-wght-normal.woff2` are
the Latin and Latin-Extended subsets of Archivo Variable, taken from the
`@fontsource-variable/archivo` package. They're committed rather than installed
because the package carries eighteen files and the site needs two, and pulling
1.1 MB on every CI run to copy 67 KB out of it is a poor trade.

To refresh them:

```bash
npm install --no-save @fontsource-variable/archivo
cp node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2 static/fonts/
cp node_modules/@fontsource-variable/archivo/files/archivo-latin-ext-wght-normal.woff2 static/fonts/
```

Archivo is licensed under the SIL Open Font License 1.1.
