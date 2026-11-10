<script setup lang="ts">
import { Pagination } from '@universe-ui/vue'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <Pagination
    v-model:page="page"
    size="sm"
    :total="87"
    :page-size="10"
  />
</template>
