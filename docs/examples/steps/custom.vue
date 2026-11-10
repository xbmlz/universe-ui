<script setup lang="ts">
import { Local, PayCodeOne, Success, Truck } from '@icon-park/vue-next'
import { Steps, StepsItem } from '@universe-ui/vue'
import { ref } from 'vue'

const active = ref(1)
</script>

<template>
  <Steps v-model="active">
    <StepsItem title="选择地址">
      <template #icon>
        <Local
          theme="filled"
          :size="16"
        />
      </template>
    </StepsItem>
    <StepsItem title="支付">
      <template #icon>
        <PayCodeOne
          theme="filled"
          :size="16"
        />
      </template>
    </StepsItem>
    <StepsItem title="配送">
      <template #icon>
        <Truck
          theme="filled"
          :size="16"
        />
      </template>
    </StepsItem>
    <StepsItem title="完成">
      <template #icon>
        <Success
          theme="filled"
          :size="16"
        />
      </template>
    </StepsItem>
  </Steps>
</template>
