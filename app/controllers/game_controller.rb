# frozen_string_literal: true

class GameController < ApplicationController
  require 'net/http'
  require 'json'

  def play
    sleep(3)
    @result = ::GameService.play(user_throw: params[:throw])

    respond_to do |format|
      format.json { render json: @result }
    end
  end
end
