// Vue.http.interceptors.push({
//   request: function (request) {
//     Vue.http.headers.common['X-CSRF-Token'] = $('[name="csrf-token"]').attr('content');
//     return request;
//   },
//   response: function (response) {
//     return response;
//   }
// });

// A prop? Passing a student as a Vue Prop?
// Unsure if I need this just yet, or at all!
// Vue.component('student-line', {
//   template: '#student-line',
//   props: {
//     student: Object
//   }
// })

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
