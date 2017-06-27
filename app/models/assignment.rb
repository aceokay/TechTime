class Assignment < ActiveRecord::Base
  belongs_to :group
  has_many :assignment_records

  validates :title, presence: true
end
