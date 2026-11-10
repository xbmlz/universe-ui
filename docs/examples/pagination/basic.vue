<script setup lang="ts">
import { Pagination } from '@universe-ui/vue'
import { ref } from 'vue'

const page = ref(1)
const pageSize = ref(10)
</script>

<template>
  <Pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :total="87"
  />
</template>
