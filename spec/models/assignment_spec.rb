require 'rails_helper'

describe Assignment do
  it { should belong_to :group }
  it { should have_many :assignment_records }
  it { should validate_presence_of :title }
end
