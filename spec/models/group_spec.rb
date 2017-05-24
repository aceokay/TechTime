require 'rails_helper'

describe Group do
  it { should have_many :students }
  it { should validate_presence_of :name }
end
