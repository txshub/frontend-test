<template src="./FiltersForm.html" />

<script>
import DatePicker from '../DatePicker'
import fieldMetadata from './fieldMetadata'
import moment from 'moment'

export default {
  name: 'FiltersForm',
  components: {
    DatePicker
  },
  data: () => {
    return {
      aggregationItems: ['all', 'any'],
      aggregationType: 'all',
      filterTypes: fieldMetadata().map(fm => ({ text: fm.displayText, value: fm.field })),
      filterOperators: [
        { text: 'is between', value: 'isBetween' },
        { text: 'is larger than', value: 'isLarger' },
        { text: 'is less than', value: 'isLess' },
        { text: 'is', value: 'is' }
      ],
      filters: [{}],
      selectFieldRules: [v => !!v || 'Field to filter by is required'],
      inputValueRules: [
        v => v != null && v !== "" || 'Value is required',
        v => v >= 0 || 'Value must be positive'
      ],
      selectValueRules: [v => v.length > 0 || 'At least one value is required']
    }
  },
  methods: {
    fieldChanged: function (index) {
      const metadata = fieldMetadata().find(fm => fm.field === this.filters[index].field)
      this.filters[index].type = metadata.type
      switch (metadata.type) {
        case 'number':
          Object.assign(this.filters[index], {
            operatorItems: this.filterOperators,
            operator: 'is',
            selector: metadata.selector,
            value1: 0,
            value2: 0
          })
          break
        case 'date':
          Object.assign(this.filters[index], {
            operatorItems: this.filterOperators,
            operator: 'is',
            selector: metadata.selector,
            value1: moment().format('YYYY-MM-DD'),
            value2: moment().format('YYYY-MM-DD')
          })
          break
        case 'multi':
          Object.assign(this.filters[index], {
            items: metadata.items,
            operatorItems: [{ text: 'is', value: 'is' }],
            operator: 'is',
            selector: metadata.selector,
            value1: []
          })
          break
      }
    },
    updateProp: function (index, prop, value) {
      this.filters.splice(index, 1, { ...this.filters[index], [prop]: value })
    },
    addFilter: function () {
      this.filters.push({})
    },
    removeFilter: function (index) {
      this.filters.length > 1 && this.filters.splice(index, 1)
    },
    submitForm: function () {
      if (this.$refs.form.validate()) {
        this.$emit('createSegment', { aggregationType: this.aggregationType, filters: this.filters })
      }
    }
  }
}
</script>

<style scoped src="./FiltersForm.css" />
