class Student < ActiveRecord::Base
  has_many :groups_students, class_name: GroupsStudents
  has_many :groups, through: :groups_students
  has_many :assignment_records

  validates :name, presence: true, uniqueness: true
end
