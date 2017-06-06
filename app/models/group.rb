class Group < ActiveRecord::Base
  has_many :students_groups, class_name: StudentsGroups
  has_many :students, through: :students_groups
  has_many :assignments

  validates :name, presence: true
end
