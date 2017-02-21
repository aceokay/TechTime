class Student < ActiveRecord::Base
  validates :name, :email, presence: true, uniqueness: true

  attr_accessor :name, :count, :skip
end
