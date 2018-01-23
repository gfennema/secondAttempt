Rails.application.routes.draw do
  root to: 'pages#home'
  get 'about', to: 'pages#about'
  resources :contacts
  get 'ContactUs', to: 'contacts#new'
end
