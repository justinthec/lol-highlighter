class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.string :vod_link
      t.text :json_data

      t.timestamps null: false
    end
  end
end
