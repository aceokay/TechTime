class AddStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students do |t|
      t.string :name
      t.integer :count
      t.boolean :skip

      t.timestamps null: false
    end
  end
end
