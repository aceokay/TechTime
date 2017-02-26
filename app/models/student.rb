class Student < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  # attr_accessor :name, :count, :skip
end
