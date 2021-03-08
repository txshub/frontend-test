<template src="./Tabs.html" />

<script>
import PlusIcon from 'vue-material-design-icons/Plus'

export default {
  name: 'Tabs',
  components: {
    PlusIcon
  },
  data: () => {
    return {
    }
  },
  model: {
    prop: 'currentTab',
    event: 'change'
  },
  methods: {
    changeTab (index) {
      this.$emit('change', index)
    }
  },
  props: {
    items: Array,
    currentTab: [Number, String]
  }
}
</script>

<style src="./Tabs.css" />
