var Dashboard = {
  components: {
    'assignments-list': Assignments,
    'assignment-records-list': AssignmentRecords,
    'groups-list': Groups,
    'students-list': Students
  },
  data: function() {
    return {
      group: {
        name: ''
      },
      assignments: [],
      students: []
    }
  },
  methods: {
    selectGroup: function(selectedGroup) {
      this.group = selectedGroup;
      this.displayAssignmentRecords = false;
    },
    selectAssignments: function(assignments) {
      this.assignments = assignments;
    },
    selectStudents: function(students) {
      this.students = students;
    },
    studentsAndAssignmentsReady: function() {
      return this.students.length != 0 && this.assignments.length != 0;
    }
  },
  template: `
  <div>
    <groups-list
      :selectGroup="selectGroup">
    </groups-list>
    <div v-if="group.id != null">
      <students-list
        :group="group"
        :selectStudents="selectStudents">
      </students-list>
      <assignments-list
        :group="group"
        :selectAssignments="selectAssignments">
      </assignments-list>
      <div v-if="this.studentsAndAssignmentsReady()">
        <assignment-records-list
          :group="group"
          :assignments="assignments"
          :students="students">
        </assignment-records-list>
      </div>
    </div>
  </div>`
}
