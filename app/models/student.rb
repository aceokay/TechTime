class Student < ActiveRecord::Base
  has_many :groups, through: :students_groups
  has_many :assignments, through: :students_assignments

  validates :name, presence: true, uniqueness: true
end
