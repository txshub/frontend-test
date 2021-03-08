<template src="./Pagination.html" />

<script>
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight'

export default {
  name: 'Pagination',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  data: () => {
    return {
     
    }
  },
  model: {
    prop: 'currentPage',
    event: 'change'
  },
  methods: {
    changePage (value) {
      let newPage = this.currentPage
      switch (value) {
        case 'next':
          if (this.currentPage < this.pageCount) {
            newPage += 1
          }
          break
        case 'previous':
          if (this.currentPage > 1) {
            newPage -= 1
          }
          break
        default:
          newPage = value
      }
      this.$emit('change', newPage)
    }
  },
  props: {
    pageCount: Number,
    currentPage: Number
  }
}
</script>

<style src="./Pagination.css" />
