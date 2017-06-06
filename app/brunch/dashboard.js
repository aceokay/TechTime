var Dashboard = {
  components: {
    'assignments-list': Assignments,
    'groups-list': Groups,
    'students-list': Students
  },
  data: function() {
    return {
      group: {
        name: ''
      }
    }
  },
  methods: {
    selectGroup: function(selectedGroup) {
      this.group = selectedGroup;
    }
  },
  template: `
  <div>
    <groups-list
      :selectGroup="selectGroup">
    </groups-list>
    <div v-if="group.id != null">
      <students-list
        :group="group">
      </students-list>
      <assignments-list
        :group="group">
      </assignments-list>
    </div>
  </div>`
}
