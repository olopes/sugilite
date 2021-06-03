# README

This README would normally document whatever steps are necessary to get the
application up and running.

## Quick user guide

Read "Build and run" section below to start Sugilite.
Once started, open the URL http://localhost:3000 in your browser.

Click the tile with the plus symbol to add a new gemstone to your collection.
 * Enter the gemstone name
 * Enter the most common color
 * Enter the chemical formula. Use unserscore characters to subscript `O_2_` becomes O<sub>2</sub>. Use two vertical bars `||` to add a new line.
 * Click the camera tile to upload a photo of the gemstone.
 * Click save and you're done!

To open the details a gemstone, just click the tile.

To search for a gemstone, use the top right input box (type something and press ENTER).

### TODO
* Drag & drop to upload a photo
* Search as you type (no need to press ENTER key)

## Build and run

Things you may want to cover:

* Ruby version: 2.7.3

* System dependencies
Install dependencies:
```shell
bundle install
```

Update dependencies (updates Gemfile.lock):
```shell
bundle update
```

* Configuration

* Database creation & initialization
```shell
# creation:
rails db:migration

# initialization with sample data:
rails db:seed

# or both in a single shot:
rails db:setup
```

* How to run the test suite
```shell
rails spec
```

* Services (job queues, cache servers, search engines, etc.)

```shell
rake routes
```

* Deployment instructions
```shell
rails server
```

* ...


I'm following these tutorials:

* https://github.com/reactjs/react-rails
* https://guides.rubyonrails.org/getting_started.html
* https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one
* https://dzone.com/articles/consuming-rest-api-with-reactjs


Generate a ReactJS component:

```shell
rails g react:component GemstoneDetail
```
Then I rename .js to .jsx because yes, although is not really necessary.



