# README

This README would normally document whatever steps are necessary to get the
application up and running.

## Quick user guide

Read "Build and run" section below to start Sugilite.
Once started, open the URL http://localhost:3000 in your browser.

Click the tile with the plus symbol to add a new gemstone to your collection.
 * Enter the gemstone name
 * Enter the most common color
 * Enter the chemical formula. 
   * Use underscore characters to subscript: `O_2_` becomes O<sub>2</sub>. 
   * Use caret characters to superscript: `O^2^` becomes O<sup>2</sup>. 
   * Use two vertical bars `||` to add a new line.
 * Click the camera tile to upload a photo of the gemstone.
 * Click save and you're done!

To open the details a gemstone, just click the tile.

To search for a gemstone, use the top right input box (type something and press ENTER).

## Build and run

Things you may want to cover:

* Ruby version: 3.3.6

* System dependencies
Install dependencies:
```shell
bundle install
yarn
```

Update dependencies (updates Gemfile.lock):
```shell
bundle update
```

* Database creation & initialization (first run only)
```shell
# creation:
rails db:migration

# initialization with sample data:
rails db:seed

# or both in a single shot:
rails db:setup
```
* Start dev server
```shell
bin/dev
```

Once the server is up, you can open http://localhost:3000 in your browser.

* Docker
```shell
# build docker image
docker build -t sugilite .

# start the container
docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name sugilite sugilite
```


* How to run the test suite
```shell
rails spec
```

* Services (job queues, cache servers, search engines, etc.)

```shell
rails routes
```

* Deployment instructions
```shell
rails server
```

* Clear compiled assets cache
```shell
rails assets:clobber ; rails webpacker:clobber
```


* ...

### Convert icons to ico and png
* Get SVG from lucide icon set - https://lucide.dev/license
* `magick +antialias -density 2048 -background transparent -define 'icon:auto-resize=256,128,64,32,24,16' icon.svg favicon.ico`
* `magick +antialias -density 2048 -background transparent -define 'auto-resize=1024' icon.svg icon.png`

## TODO
* Drag & drop to upload a photo
