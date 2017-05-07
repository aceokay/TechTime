class Assignment < ActiveRecord::Base
  belongs_to :group
  has_many :students, through: :students_assignments
  
  validates :title
end
