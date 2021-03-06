# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170221050249) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignment_records", force: :cascade do |t|
    t.integer  "group_id"
    t.integer  "student_id"
    t.integer  "assignment_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["assignment_id"], name: "index_assignment_records_on_assignment_id", using: :btree
    t.index ["student_id"], name: "index_assignment_records_on_student_id", using: :btree
  end

  create_table "assignments", force: :cascade do |t|
    t.string   "title"
    t.integer  "group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups_students", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_groups_students_on_group_id", using: :btree
    t.index ["student_id"], name: "index_groups_students_on_student_id", using: :btree
  end

  create_table "students", force: :cascade do |t|
    t.string   "name"
    t.boolean  "skip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
