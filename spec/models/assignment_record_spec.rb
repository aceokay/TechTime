require 'rails_helper'

describe AssignmentRecord do
  it { should belong_to :group }
  it { should belong_to :student }
  it { should belong_to :assignment }
end
