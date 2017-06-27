class Group < ActiveRecord::Base
  has_many :groups_students, class_name: GroupsStudents
  has_many :students, through: :groups_students
  has_many :assignments
  has_many :assignment_records

  validates :name, presence: true
end
