# polyglotMemeGenerator

An attemt to connect JS and Ruby in a mad meme mix.

How to run the server:
```sh
$ cd polyglotMemeGenerator
$ node --polyglot --jvm --jvm.classpath=".:jar/sqlite-jdbc-3.21.0.jar" server.js
```

Deployment:

```sh
$ cd polyglotMemeGenerator
$ npm install express
$ npm install body-parser
$ npm install multer
$ ruby -Sgem install mini_magick
$ mkdir Images
```

File images.db (SQLite database file) must be in the same folder as the server.
(Here I included the file with 3 images) 

Development:
* Basic image upload server
* Basic frontend page
* Image processing with Ruby
* JDBC-based storage (...)
