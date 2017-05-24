class Assignment < ActiveRecord::Base
  belongs_to :group
  has_many :students_assignments, class_name: StudentsAssignments
  has_many :students, through: :students_assignments

  validates :title, presence: true
end
