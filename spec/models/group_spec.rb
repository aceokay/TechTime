require 'rails_helper'

describe Group do
  it { should have_many :students }
  it { should have_many :assignments }
  it { should validate_presence_of :name }
end
