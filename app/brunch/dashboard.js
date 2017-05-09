var Dashboard = {
  components: {
    // 'assignments-list': Assignments,
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
    selectGroup: function() {

    }
  },
  template: `
  <groups-list></groups-list>`
}
