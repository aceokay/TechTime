var AssignmentRecordListRow = {
  props: {
    assignment: Object,
    student: Object
  },
  template: `
  <li>
    <div>
      {{ student.name }} |
      {{ assignment.title }}
    </div>
  </li>`
}

var AssignmentRecords = {
  props: {
    group: Object,
    students: Array,
    assignments: Array
  },
  components: {
    'assignment-record-list-row': AssignmentRecordListRow
  },
  data: function() {
    return {
      assignmentRecords: [],
      assignmentRecord: {
        student_id: Number,
        assignment_id: Number
      },
      errors: {}
    }
  },
  watch: {
    group: function() {
      this.renderAssignmentRecords();
    }
  },
  mounted: function() {
    this.renderAssignmentRecords();
  },
  methods: {
    renderAssignmentRecords: function() {
      var that = this;
      assignmentRecordResource.get({groupId: this.group.id}).then(
        function(response) {
          that.assignmentRecords = response.data;
        }
      );
    },
    findRecordedAssignment: function(record) {
      function matchingId(assignment) {
        return record.assignment_id == assignment.id;
      }

      return this.assignments.find(matchingId);
    },
    findRecordedStudent: function(record) {
      function matchingId(student) {
        return record.student_id == student.id;
      }

      return this.students.find(matchingId);
    }
  },
  template: `
  <div class="col-sm-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <p class="text-center">
          <i class="fa fa-check" aria-hidden="true"></i>
          Today's Random Assignments
        </p>
      </div>
      <div class="panel-body">
        <ul class="list-unstyled">
          <li is="assignment-record-list-row"
            v-for="assignmentRecord in assignmentRecords"
            :assignment="findRecordedAssignment(assignmentRecord)"
            :student="findRecordedStudent(assignmentRecord)">
          </li>
        </ul>
      </div>
    </div>
  </div>`
}
