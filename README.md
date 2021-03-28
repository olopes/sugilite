# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version: 2.5.5

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
