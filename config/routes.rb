Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Map /locales/en/translation.json to our custom controller
  get "/locales" => "locales#index"
  get "/locales/:locale/:ns" => "locales#show", constraints: { locale: /[a-z]{2}(?:-[A-Z]{2})?/, ns: /translation/ } # force 'translation' for now.

  # Our resources
  resources :gem_stones

  # Defines the root path route ("/")
  # root "articles#index"
  root "sugilite#index"
end
