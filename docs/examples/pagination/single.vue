<script setup lang="ts">
import { Pagination } from '@universe-ui/vue'
</script>

<template>
  <Pagination
    :page="1"
    :page-size="10"
    :total="8"
  />
</template>
