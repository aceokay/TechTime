class AssignmentRecord < ActiveRecord::Base
  belongs_to :group
  belongs_to :student
  belongs_to :assignment
end
