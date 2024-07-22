<template>
  <div class="container mx-auto p-4 pt-12">
    <ProductList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductList from './components/ProductList.vue'

export default defineComponent({
  components: {
    ProductList
  }
})
</script>

<style scoped></style>
