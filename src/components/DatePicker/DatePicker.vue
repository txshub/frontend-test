<template src="./DatePicker.html" />

<script>
export default {
  data: () => ({
    menu: false,
  }),
  props: {
    date: String
  },
  model: {
    prop: "date",
    event: "change"
  },
  methods: {
    changeDate: function (newDate) {
      this.$emit('change', newDate)
      this.menu = false
    }
  }
}
</script>