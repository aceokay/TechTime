class Group < ActiveRecord::Base
  has_many :students, through: :students_groups

  validates :name, presence: true
end
