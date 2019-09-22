# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
GemStone.create([{
        :name => 'Sugilite',
        :color => 'purple (translucent)',
        :chem_formula => 'KNa_2_(Fe, Mn, Al)_2_Li_3_Si_12_O_30_'
    }, {
        :name => 'Ruby',
        :color => 'red (translucent)',
        :chem_formula => 'Al_2_O_3_:Cr'
    }, {
        :name => 'Diamond',
        :color => 'colorless (translucent)',
        :chem_formula => 'C'
    }, {
        :name => 'Emerald',
        :color => 'green (translucent)',
        :chem_formula => 'Be_3_Al_2_(SiO_3_)_6_'
    }
])