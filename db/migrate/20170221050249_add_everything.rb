class AddEverything < ActiveRecord::Migration[5.0]
  def change
    create_table :students do |t|
      t.string :name
      t.boolean :skip
      t.timestamps
    end

    create_table :groups do |t|
      t.string :name
      t.timestamps
    end

    create_table :groups_students do |t|
      t.belongs_to :student, index: true
      t.belongs_to :group, index: true
      t.timestamps
    end

    create_table :assignments do |t|
      t.string :title
      t.integer :group_id
      t.timestamps null: true
    end

    create_table :assignment_records do |t|
      t.integer :group_id
      t.belongs_to :student, index: true
      t.belongs_to :assignment, index: true
      t.timestamps
    end
  end
end
