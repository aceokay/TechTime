Rails.application.routes.draw do
  root to: 'groups#index'
  resources :assignments, except: [:new, :edit]
  resources :groups, except: [:new, :edit]
  resources :students, except: [:new, :edit]
end
