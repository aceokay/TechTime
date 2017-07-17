var Dashboard = {
  components: {
    'assignments-list': Assignments,
    'assignment-records-list': AssignmentRecords,
    'groups-list': Groups,
    'students-list': Students
  },
  data: function() {
    return {
      displayAssignmentRecords: false,
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
    },
    selectAssignments: function(assignments) {
      this.assignments = assignments;
    },
    selectStudents: function(students) {
      this.students = students;
    },
    updateDisplayAssignmentRecords: function() {
      this.displayAssignmentRecords = !this.displayAssignmentRecords;
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
        :selectStudents="selectStudents"
        :displayAssignmentRecords="displayAssignmentRecords"
        :updateDisplayAssignmentRecords="updateDisplayAssignmentRecords">
      </students-list>
      <assignments-list
        :group="group"
        :selectAssignments="selectAssignments">
      </assignments-list>
      <div v-if="displayAssignmentRecords">
        <assignment-records-list
          :group="group"
          :assignments="assignments"
          :students="students">
        </assignment-records-list>
      </div>
    </div>
  </div>`
}
