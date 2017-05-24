class Student < ActiveRecord::Base
  has_many :students_groups, class_name: StudentsGroups
  has_many :groups, through: :students_groups
  has_many :students_assignments, class_name: StudentsAssignments
  has_many :assignments, through: :students_assignments

  validates :name, presence: true, uniqueness: true
end
