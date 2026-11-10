<script setup lang="ts">
import { Pagination } from '@universe-ui/vue'
import { ref } from 'vue'

const page = ref(3)
</script>

<template>
  <Pagination
    v-model:page="page"
    :total="240"
    :page-size="10"
    :show-sizes="false"
    show-jumper
  />
</template>
