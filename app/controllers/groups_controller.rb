class GroupsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @groups = Group.all
    respond_to do |format|
      format.html
      format.json { render json: @groups }
    end
  end

  def create
    @group = Group.new(group_params)
    respond_to do |format|
      format.json do
        if @group.save
          render json: @group
        else
          render json: { errors: @group.errors.messages }, status: 422
        end
      end
    end
  end

  def update
    @group = Group.find(params[:id])
    respond_to do |format|
      format.json do
        if @group.update(group_params)
          render json: @group
        else
          render json: { errors: @group.errors.messages }, status: 422
        end
      end
    end
  end

  def destroy
    Group.find(params[:id]).destroy
    respond_to do |format|
      format.json { render json: {}, status: :no_content }
    end
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end
end
