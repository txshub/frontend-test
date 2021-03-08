import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import tableData from './mock-data'

Vue.config.productionTip = false

window.sessionStorage.setItem('tableData', JSON.stringify(tableData))

const referrers = []
tableData.forEach(entry => {
  if (!referrers.some(r => r.id === entry.referrer.id)) {
    referrers.push(entry.referrer)
  }
})
const appStatuses = []
tableData.forEach(entry => {
  if (appStatuses.indexOf(entry.applicationStatus) === -1) {
    appStatuses.push(entry.applicationStatus)
  }
})

window.sessionStorage.setItem('referrers', JSON.stringify(referrers))
window.sessionStorage.setItem('appStatuses', JSON.stringify(appStatuses))

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
