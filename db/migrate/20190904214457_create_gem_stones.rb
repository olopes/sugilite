class CreateGemStones < ActiveRecord::Migration[5.2]
  def change
    create_table :gem_stones do |t|
      t.string :name
      t.string :chem_formula
      t.string :color

      t.timestamps
    end
  end
end
