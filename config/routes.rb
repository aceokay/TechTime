Rails.application.routes.draw do
  root to: 'groups#index'
  resources :groups, except: [:new, :edit] do
    resources :assignments, except: [:new, :edit]
    resources :students, except: [:new, :edit]
  end
end
