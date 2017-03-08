const Vue = require("vue/dist/vue.common.js");
Vue.use(require('vue-resource'));

var studentResource = Vue.resource('/students{/id}.json')

var students = new Vue({
  el: '#students',
  data: {
    students: [],
    student: {
      name: ''
    },
    errors: {}
  },
  mounted: function() {
    var that;
    that = this;
    studentResource.get().then(
      function (response) {
        that.students = response.data
      }
    )
  },
  methods: {
    addStudent: function () {
      var that = this;
      studentResource.save({student: this.student}).then(
        function(response) {
          that.errors = {};
          that.student = {};
          that.students.push(response.data);
        },
        function(response) {
          that.errors = response.data.errors
        }
      )
    }
  }
});
