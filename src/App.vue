<template>
  <v-app>
    <div class="app-container">
      <MarketingLists />
    </div>
  </v-app>
</template>

<script>
import MarketingLists from './components/MarketingLists';

export default {
  name: 'App',

  components: {
    MarketingLists,
  },

  data: () => ({
  }),
};
</script>

<style scoped>
  .app-container {
    margin: 50px;
  }
</style>
