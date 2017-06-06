var GroupListRow = {
  props: {
    group: Object,
    parentUpdateGroup: Function,
    parentDeleteGroup: Function,
    parentSelectGroup: Function
  },
  methods: {
    updateGroup: function() {
      this.editMode = false;
      this.parentUpdateGroup(this.group);
    },
    deleteGroup: function() {
      this.parentDeleteGroup(this.group);
    },
    selectGroup: function() {
      this.parentSelectGroup(this.group);
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
        <input class="form-control" type="text" v-model="group.name" v-on:keyup.enter="updateGroup()" ><br>
      </span>
      <span v-else>
        <i class="fa fa-times text-danger" @click="deleteGroup()" aria-hidden="true"></i>
        <i class="fa fa-pencil" aria-hidden="true" @click="editMode = true"></i>
        <span @click="selectGroup()">{{ group.name }}</span>
      </span>
    </div>
  </li>`
}

var Groups = {
  props: {
    selectGroup: Function
  },
  components: {
    'group-list-row': GroupListRow
  },
  data: function() {
    return {
      groups: [],
      group: {
        name: ''
      },
      errors: {},
      AddGroup: false
    }
  },
  mounted: function() {
    var that = this;
    groupResource.get().then(
      function(response) {
        that.groups = response.data;
      }
    )
  },
  methods: {
    addGroup: function() {
      var that = this;
      groupResource.save({group: this.group}).then(
        function(response) {
          that.errors = {};
          that.group = {};
          that.groups.push(response.data);
        },
        function(response) {
          that.errors = response.data.errors;
        }
      )
    },
    parentUpdateGroup: function(group) {
      var that = this;
      groupResource.update({id: group.id}, group).then(
        function(response) {
          function MatchingId(group) {
            return group.id = response.data.id
          }

          that.errors = {};
          var group = that.groups.find(MatchingId);
          group = response.data;
        },
        function(response) {
          that.errors = response.data.errors;
        }
      );
    },
    parentDeleteGroup: function(group) {
      var that = this;
      groupResource.delete({id: group.id}).then(
        function(response) {
          // Grab the ID from the URL
          var groupId = response.url.match("/groups/([^-]+).json").pop();
          function NotMatchingId(group) {
            return group.id != groupId
          }
          that.groups = that.groups.filter(NotMatchingId);
        }
      )
    },
    parentSelectGroup: function(selectedGroup) {
      this.selectGroup(selectedGroup);
    }
  },
  template: `
  <div>
    <br>
    <div class="col-sm-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <p class="text-center">
            <i class="fa fa-users" aria-hidden="true"></i>
            Groups
          </p>
        </div>
        <div class="panel-body">
          <input class="form-control" type="text" v-model="group.name" v-on:keyup.enter="addGroup" placeholder="Group Name"><br>
          <span style="color:red">{{ errors.name }}</span>
          <ul class="list-unstyled">
            <li is="group-list-row"
              v-for="group in groups"
              :parentUpdateGroup="parentUpdateGroup"
              :parentDeleteGroup="parentDeleteGroup"
              :parentSelectGroup="parentSelectGroup"
              :group="group">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`
}
