# syntax=docker/dockerfile:1

# Use the official Ruby image with version 3.3.5
FROM ruby:3.3.5

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs yarnpkg curl

RUN ln -s /usr/bin/yarnpkg /usr/bin/yarn

# Set the working directory
WORKDIR /app

# Copy the Gemfile and Gemfile.lock
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

# Install Gems dependencies
RUN gem install bundler && bundle install

# Copy JS package.json and yarn.lock
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

# Install JS dependecies
RUN yarn install --frozen-lockfile

# Copy the application code
COPY . /app

ENV PATH="/app/bin:$PATH"

# Precompile assets (optional, if using Rails with assets)
RUN sh -c "NODE_OPTIONS=--openssl-legacy-provider bundle exec rake assets:precompile"

# Expose the port the app runs on
EXPOSE 3000

# Command to run the server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
