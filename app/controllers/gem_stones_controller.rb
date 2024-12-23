#
# >This is docs
#
class GemStonesController < ApplicationController
  before_action :set_gem_stone, only: [ :show, :update, :destroy ]

  # GET /gem_stones
  def index
    if params[:q] != nil
      like_value = "%#{params[:q]}%".downcase
      @gemstones = GemStone.where("lower(name) like ?", like_value)
    else
      @gemstones = GemStone.all
    end
    render json: @gemstones
  end

  # POST /gem_stones
  def create
    @gemstone = GemStone.create!(gem_stone_params)
    render json: @gemstone, status: :created
  end

  # GET /gem_stones/:id
  def show
    render json: @gemstone
  end

  # PUT /gem_stones/:id
  def update
    @gemstone.update(gem_stone_params)
    head :no_content
  end

  # DELETE /gem_stones/:id
  def destroy
    @gemstone.destroy
    head :no_content
  end

  private
  def gem_stone_params
    params.require(:gem_stone).permit(:name, :chem_formula, :color, :image)
  end

  def set_gem_stone
    @gemstone = GemStone.find(params[:id])
  end
end
