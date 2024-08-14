# frozen_string_literal: true

class GameService
  THROWS = { 0 => 'rock', 1 => 'paper', 2 => 'scissors' }

  def self.play(user_throw:)
    new(user_throw).result
  end

  def initialize(user_throw)
    @user_throw = user_throw
    @server_throw = generate_throw
  end

  def result
    {
      result: determine_winner,
      server_choice: @server_throw
    }
  end

  private

  def determine_winner
    return "Unsupported value" unless THROWS.values.include?(@user_throw)

    return "It\'s a tie!" if @user_throw == @server_throw

    winning_combinations = {
      'rock' => ['scissors'],
      'paper' => ['rock'],
      'scissors' => ['paper']
    }

    if winning_combinations[@user_throw].include?(@server_throw)
      'You won!'
    else
      'You lost!'
    end
  end

  def generate_throw
    THROWS[rand(0..2)]
  end
end
