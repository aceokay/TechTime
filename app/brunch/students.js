var StudentListRow = {
  props: {
    student: Object,
    parentUpdateStudent: Function,
    parentDeleteStudent: Function
  },
  methods: {
    updateStudent: function() {
      this.editMode = false;
      this.parentUpdateStudent(this.student);
    },
    deleteStudent: function() {
      this.parentDeleteStudent(this.student);
    },
    skipStudent: function() {
      this.student.skip ? this.student.skip = false : this.student.skip = true;
      this.parentUpdateStudent(this.student);
    }
  },
  data: function() {
    return {
      editMode: false
    }
  },
  template: `
  <li>
    <div>
      <span v-if="editMode">
        <input class="form-control" type="text" v-model="student.name" v-on:keyup.enter="updateStudent()" ><br>
      </span>
      <span v-else>
        <i class="fa fa-times text-danger" @click="deleteStudent()" aria-hidden="true"></i>
        <span v-if="student.skip">
          <i class="fa fa-toggle-off text-danger" @click="skipStudent()" aria-hidden="true"></i>
        </span>
        <span v-else>
          <i class="fa fa-toggle-on text-success" @click="skipStudent()" aria-hidden="true"></i>
        </span>
        <span @click="editMode = true">
          {{ student.name }}
        </span>
      </span>
    </div>
  </li>`
}

var Students = {
  props: {
    group: Object,
    displayAssignmentRecords: Boolean,
    selectStudents: Function,
    updateDisplayAssignmentRecords: Function
  },
  components: {
    'student-list-row': StudentListRow
  },
  data: function() {
    return {
      students: [],
      student: {
        name: '',
        skip: Boolean
      },
      errors: {}
    }
  },
  watch: {
    group: function() {
      this.renderStudents();
    }
  },
  mounted: function() {
    this.renderStudents();
  },
  methods: {
    renderStudents: function() {
      var that = this;
      studentResource.get({groupId: this.group.id}).then(
        function(response) {
          that.students = response.data;
          that.selectStudents(response.data);
        }
      );
    },
    addStudent: function() {
      var that = this;
      studentResource.save({groupId: this.group.id}, this.student).then(
        function(response) {
          that.errors = {};
          that.student = {};
          that.students.push(response.data);
        },
        function(response) {
          that.errors = response.data.errors;
        }
      );
    },
    parentUpdateStudent: function(student) {
      var that = this;
      studentResource.update({groupId: this.group.id, studentId: student.id}, student).then(
        function(response) {
          function MatchingId(student) {
            return student.id == response.data.id
          }

          that.errors = {};
          var student = that.students.find(MatchingId);
          student = response.data;
        },
        function(response) {
          that.errors = response.data.errors;
        }
      );
    },
    parentDeleteStudent: function(student) {
      var that = this;
      studentResource.delete({groupId: this.group.id, studentId: student.id}).then(
        function(response) {
          // Grab the ID from the URL
          var studentId = response.url.match("/students/([^-]+).json").pop();
          function NotMatchingId(student) {
            return student.id != studentId
          }
          that.students = that.students.filter(NotMatchingId);
        }
      );
    }
  },
  template: `
  <div class="col-sm-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <p class="text-center">
          <i class="fa fa-graduation-cap" aria-hidden="true"></i>
          Students
        </p>
      </div>
      <div class="panel-body">
        <input class="form-control" type="text" v-model="student.name" v-on:keyup.enter="addStudent" placeholder="Student Name"><br>
        <span style="color:red">{{ errors.name }}</span>
        <ul class="list-unstyled">
          <li is="student-list-row"
            v-for="student in students"
            :parentUpdateStudent="parentUpdateStudent"
            :parentDeleteStudent="parentDeleteStudent"
            :student="student">
          </li>
        </ul>
        <button @click="this.updateDisplayAssignmentRecords" type="button" class="btn btn-success center-block">
          Randomly Assign
        </button>
      </div>
    </div>
  </div>`
}
