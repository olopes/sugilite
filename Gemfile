#source 'https://rubygems.org'
source 'https://rubygems.org'
#git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.3.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
#gem "rails", "~> 6.0.3"
gem "rails", "~> 7.0.8"

# Use sqlite3 as the database for Active Record
gem 'sqlite3', "~> 1.7.2"
# Use Puma as the app server
gem 'puma', '>= 5.6'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 4.2.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '>= 5.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '>= 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '>= 2.11'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

gem 'psych', '< 4'

# react-js
# gem 'webpacker', '~> 6.x'
gem 'webpacker', '6.0.0.pre.2'
gem 'react-rails'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'rspec-rails', '>= 3.5'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'rubocop'
  gem 'reek'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  
  gem 'selenium-webdriver', '>= 4.11'
  
  gem 'factory_bot_rails', '>= 4.0'
  gem 'shoulda-matchers', '>= 3.1'
  gem 'faker'
  gem 'database_cleaner'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
