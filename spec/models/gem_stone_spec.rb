require 'rails_helper'

# Test suite for the GemStone model
RSpec.describe GemStone, type: :model do
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:chem_formula) }
  it { should validate_presence_of(:color) }
end
