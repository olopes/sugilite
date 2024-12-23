class GemStone < ApplicationRecord
    # validations
    validates_presence_of :name, :chem_formula, :color
end
