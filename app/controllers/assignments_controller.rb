class AssignmentsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @group = Group.find(params[:group_id])
    @assignments = @group.assignments
    respond_to do |format|
      format.html
      format.json { render json: @assignments }
    end
  end

  def create
    @group = Group.find(params[:group_id])
    @assignment = Assignment.new(assignment_params)
    @group.assignments.push(@assignment)
    respond_to do |format|
      format.json do
        if @assignment.save
          render json: @assignment
        else
          render json: { errors: @assignment.errors.messages }, status: 422
        end
      end
    end
  end

  private

  def assignment_params
    params.require(:assignment).permit(:title)
  end
end
