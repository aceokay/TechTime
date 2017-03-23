// Included because I need the uncompiled version of Vue
// This is the root declaration for Vue
const Vue = require("vue/dist/vue.common.js");

// Here we will declare all our resources
Vue.use(require('vue-resource'));
var studentResource = Vue.resource('/students{/id}.json')
