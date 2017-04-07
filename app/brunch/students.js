var ListRow = {
  props: {
    student: Object
  },
  data: function() {
    return {
      editMode: false,
      errors: {}
    }
  },
  template: `
  <div>
    <div v-if="editMode">
      <input type="text" v-model="student.name"><br>
    </div>
    <div v-else>
      {{ student.name }}
    </div>
    <i class="fa fa-toggle-on" aria-hidden="true"></i>
    <button v-if="editMode" @click="updateStudent">Save</button>
    <button v-else @click="editMode = true">Edit</button>
  </div>
  `
}

var Students = {
  components: {
    'student-list-row': ListRow
  },
  data: function() {
    return {
      students: [],
      student: {
        name: ''
      },
      errors: {}
    }
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
  },
  template: `
  <div>
    <br>
    <div class="col-sm-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <i class="fa fa-graduation-cap" aria-hidden="true"></i>
          Students
        </div>
        <div class="panel-body">
          <input class="form-control" type="text" v-model="student.name" v-on:keyup.enter="addStudent" placeholder="name"><br>
          <span style="color:red">{{ errors.name }}</span>
          <ul class="list-unstyled">
            <li is="student-list-row"
              v-for="student in students"
              :student="student">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`
}
