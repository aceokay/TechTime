var AssignmentListRow = {
  props: {
    assignment: Object
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
        <input class="form-control" type="text" v-model="assignment.title" v-on:keyup.enter="updateAssignment()" ><br>
      </span>
      <span v-else>
        <i class="fa fa-times text-danger" @click="deleteAssignment()" aria-hidden="true"></i>
        <span @click="editMode = true">
          {{ assignment.title }}
        </span>
      </span>
    </div>
  </li>`
}

var Assignments = {
  props: {
    group: Object
  },
  components: {
    'assignment-list-row': AssignmentListRow
  },
  data: function() {
    return {
      assignments: [],
      assignment: {
        title: ''
      },
      errors: {}
    }
  },
  watch: {
    group: function() {
      this.renderAssignments();
    }
  },
  mounted: function() {
    this.renderAssignments();
  },
  methods: {
    renderAssignments: function() {
      var that = this;
      assignmentResource.get({groupId: this.group.id}).then(
        function(response) {
          that.assignments = response.data;
        }
      );
    },
    addAssignment: function() {
      var that = this;
      assignmentResource.save({groupId: this.group.id}, this.assignment).then(
        function(response) {
          that.errors = {};
          that.assignment = {};
          that.assignments.push(response.data);
        },
        function(response) {
          that.errors = response.data.errors;
        }
      );
    }
  },
  template: `
  <div class="col-sm-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <p class="text-center">
          <i class="fa fa-tasks" aria-hidden="true"></i>
          Assignments
        </p>
      </div>
      <div class="panel-body">
        <input class="form-control" type="text" v-model="assignment.title" v-on:keyup.enter="addAssignment" placeholder="Assignment Title"><br>
        <span style="color:red">{{ errors.title }}</span>
        <ul class="list-unstyled">
          <li is="assignment-list-row"
            v-for="assignment in assignments"
            :assignment="assignment">
          </li>
        </ul>
      </div>
    </div>
  </div>`
}
