require 'rails_helper'

describe Student do
  it { should have_many :groups }
  it { should have_many :assignment_records }
  it { should validate_presence_of :name }
  it { should validate_uniqueness_of :name }
end
