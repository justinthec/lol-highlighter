class GamesController < ApplicationController
  def view
  	@game = Game.find(params[:id])
  end
end
