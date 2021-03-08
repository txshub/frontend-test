<template src='./DataTable.html' />

<script>
import Pagination from '../Pagination'
import Magnify from 'vue-material-design-icons/Magnify'

export default {
  name: 'DataTable',
  components: {
    Pagination,
    Magnify
  },
  data: () => {
    return {
      page: 1,
      searchTerm: ""
    }
  },
  props: {
    tableData: Array,
    columns: Array,
    itemsPerPage: Number
  },
  computed: {
    getFilteredData: function () {
      const lowerSearchTerm = this.searchTerm.toLowerCase()
      return this.tableData.filter(entry => { 
        if (this.searchTerm.length > 0) {
          return entry.givenName.toLowerCase().indexOf(lowerSearchTerm) >= 0 || 
            entry.familyName.toLowerCase().indexOf(lowerSearchTerm) >= 0
        } else {
          return true
        }
      })
    },
    getPageCount: function () {
      const div = this.getFilteredData.length / this.itemsPerPage
      const round = Math.round(div)
      if (div - round > 0) {
        return round + 1
      } else {
        return round
      }
    },
    getCurrentItemCount: function () {
      const remainingItems = this.getFilteredData.length - this.page * this.itemsPerPage
      if (remainingItems < 0) {
        return this.itemsPerPage + remainingItems
      } else {
        return this.itemsPerPage
      }
    }
  }
}
</script>

<style scoped src="./DataTable.css" />