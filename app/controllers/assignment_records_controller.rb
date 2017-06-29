class AssignmentRecordsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    # Grab all the day old AssignmentRecords, if there are any...
    @recentAssignmentRecords = AssignmentRecord
                      .where(group_id: params[:group_id])
                      .where("created_at >= ?", Time.zone.now.beginning_of_day)

    # Check to see if there are none for today, make new ones if not.
    noRecentAssignmentRecordsExist = @recentAssignmentRecords.empty?
    if noRecentAssignmentRecordsExist
      # Make some new AssignmentRecords!
      @recentAssignmentRecords = randomlyAssignStudents
    end

    respond_to do |format|
      format.json { render json: @recentAssignmentRecords }
    end
  end

  private

  # Assigns as many students as possible to available Assignments through
  # AssignmentRecords. Tries to stay as random as possible.
  def randomlyAssignStudents
    group_id = params[:group_id]

    # Grab all the Students associated with this group that are not skipped...
    students = Student.joins(:groups).where("groups.id = ?", group_id)
                                     .where(skip: false).to_a

    # Grab all the Assignments associated with this group...
    assignments = Assignment.where(group_id: group_id).to_a

    # Return if there are no Students or Assignments to link between
    if assignments.empty? || students.empty?
      return
    end

    # Shake em up!
    students.shuffle!
    assignments.shuffle!

    newAssignmentRecords = []
    # Match a student to as many assignments as you can, creating
    # AssignmentRecords all the way.
    for assignment in assignments do
      if !students.empty?
        student = students.pop
        # Create and save to all associated models
        # (Group, Assignment, and Student)
        assignmentRecord = AssignmentRecord.create do |ar|
          ar.group_id = group_id
          ar.assignment_id = assignment.id
          ar.student_id = student.id
        end

        newAssignmentRecords << assignmentRecord
      end
    end

    return newAssignmentRecords
  end
end
