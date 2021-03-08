<template src="./MarketingLists.html" />

<script>
import DataTable from '../DataTable'
import FiltersForm from '../FiltersForm'
import Tabs from '../Tabs'
import moment from 'moment'

export default {
  name: 'MarketingLists',
  components: {
    DataTable,
    Tabs,
    FiltersForm
  },
  data: () => {
    return {
      columns: [
        { text: 'Email', value: entry => entry.email, imageSource: () => 'https://picsum.photos/50/50' },
        { text: 'Source', value: entry => entry.source },
        { text: 'First Name', value: entry => entry.givenName },
        { text: 'Last Name', value: entry => entry.familyName },
        { text: 'App Status', value: entry => entry.applicationStatus },
        { text: 'Profile Status', value: entry => entry.profileStatus },
        { 
          text: 'Value',
          value: entry => {
            if (!entry.value) {
              return ''
            }
            if (entry.value >= 1000) {
              return `$${Math.round(entry.value / 10) / 100}k`
            } else {
              return `$${entry.value}`
            }
          }
        },
        { text: 'Renewal Date', value: entry => moment(entry.mortgageRenewalDate).format('DD MMM YYYY') },
        { text: 'Referrer', value: entry => entry.referrer && entry.referrer.givenName },
        { 
          text: 'Opt-In',
          value: entry => entry.optIn ? 'Subscribed' : 'Unsubscribed',
          style: entry => {
            let style = 'border-radius:3px; padding:2px 6px; font-size:0.8em; font-weight:bold;'
            if (entry.optIn) {
              style += 'background-color:#21cc99; color:#ffffff;'
            } else {
              style += 'background-color:#b0b0b0; color:#ffffff;'
            }
            return style
          }
        }
      ],
      currentTab: 0,
      tabs: [
        { 
          name: 'All Contacts', 
          filterOptions: {
            aggregationType: 'any',
            filters: []
          } 
        }
      ]
    }
  },
  computed: {
    getTabItems: function () {
      return this.tabs.map(tab => tab.name)
    },
    tableData: function () {
      let data = JSON.parse(window.sessionStorage.getItem('tableData'))

      if (this.currentTab !== 'newTab'){
        const conditions = this.tabs[this.currentTab].filterOptions.filters.map(filter => {
          if (filter.type === 'multi') {
            return entry => (filter.value1.indexOf(filter.selector(entry)) >= 0)
          } else {
            return entry => ((filter.operator === 'is' && filter.selector(entry) === filter.value1)
              || (filter.operator === 'isLarger' && filter.selector(entry) > filter.value1)
              || (filter.operator === 'isLess' && filter.selector(entry) < filter.value1)
              || (filter.operator === 'isBetween' && filter.selector(entry) > filter.value1 && filter.selector(entry) < filter.value2))
          }
        })

        if (this.tabs[this.currentTab].filterOptions.aggregationType === 'all') {
          data = data.filter(entry => {
            let matches = true
            conditions.forEach(condition => { matches = matches && condition(entry) })
            return matches
          })
        } else {
          data = data.filter(entry => {
            let matches = conditions.length === 0 || false
            conditions.forEach(condition => { matches = matches || condition(entry) })
            return matches
          })
        }
      }
      return data
    }
  },
  methods: {
    createSegment: function (filterOptions) {
      this.tabs.push({ name: 'Segment ' + this.tabs.length, filterOptions: filterOptions })
      this.currentTab = this.tabs.length - 1
    }
  }
}
</script>

<style src="./MarketingLists.css" />