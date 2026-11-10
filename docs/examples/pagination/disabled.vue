<script setup lang="ts">
import { Pagination } from '@universe-ui/vue'
</script>

<template>
  <Pagination
    :page="2"
    :page-size="10"
    :total="87"
    disabled
  />
</template>
