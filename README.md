# TechTime

A simple tool for teachers to track and assign use of digital devices in a classroom

## Development Notes
* Setup Database anew: rake db:create db:migrate
* Reset Migrations: rake db:migrate:reset

## Heroku Commands
* Launch to Heroku: git push heroku master
* Logs: heroku logs -n 500
* Run Rake tasks: heroku run rake db:migrate

### Technology
* Rails 5
* [Vue](https://vuejs.org/) front-end
* [Vue-Strap](https://yuche.github.io/vue-strap/) scripts for styling
* [Bootstrap 3](http://getbootstrap.com/) CSS for styling
* [Font Awesome](http://fontawesome.io/) Icons
* [npm-pipeline-rails](https://github.com/rstacruz/npm-pipeline-rails) asset tool
* [Brunch](http://brunch.io/) build system
    * Add dependencies with: npm install --save-dev plugin-name
* [Font Awesome Favicon Generator](https://paulferrett.com/fontawesome-favicon/) Favicon Generator
