// Included because I need the uncompiled version of Vue
// This is the root declaration for Vue
const Vue = require("vue/dist/vue.common.js");

// Here we will declare all our resources
Vue.use(require('vue-resource'));
var assignmentResource = Vue.resource('/groups{/groupId}/assignments{/assignmentId}.json');
var groupResource = Vue.resource('/groups{/id}.json');
var studentResource = Vue.resource('/groups{/groupId}/students{/studentId}.json');
