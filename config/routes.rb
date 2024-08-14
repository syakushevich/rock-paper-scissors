Rails.application.routes.draw do
  root 'game#index'
  post 'play', to: 'game#play'
end
