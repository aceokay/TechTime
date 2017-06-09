class StudentsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @group = Group.find(params[:group_id])
    @students = @group.students
    respond_to do |format|
      format.html
      format.json { render json: @students }
    end
  end

  def create
    @group = Group.find(params[:group_id])
    @student = Student.new(student_params)
    @group.students.push(@student)
    respond_to do |format|
      format.json do
        if @student.save
          render json: @student
        else
          render json: { errors: @student.errors.messages }, status: 422
        end
      end
    end
  end

  def update
    @student = Student.find(params[:id])
    respond_to do |format|
      format.json do
        if @student.update(student_params)
          render json: @student
        else
          render json: { errors: @student.errors.messages }, status: 422
        end
      end
    end
  end

  def destroy
    Student.find(params[:id]).destroy
    respond_to do |format|
      format.json { render json: {}, status: :no_content }
    end
  end

  private

  def student_params
    params.require(:student).permit(:name, :skip)
  end
end
