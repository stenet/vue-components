<script lang="ts" setup>
import BaseFormItem from "@/components/BaseFormItem.vue";
import { ref } from "vue";

const data = ref<{
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  mail?: string;
}>({});

</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-form-item
    </h2>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <base-form-item
          label="First name"
          v-model="data.firstName"
          :required="true"
          :rules="{ stringLength: { min: 3, max: 20 }}">
        </base-form-item>

        <base-form-item
          label="Last name"
          v-model="data.lastName">
        </base-form-item>

        <base-form-item
          label="Birthday"
          type="DxDateBox"
          v-model="data.birthday"
          :rules="{ dateInPast: true }">
        </base-form-item>

        <base-form-item
          label="Mail"
          v-model="data.mail"
          :rules="{ email: true }">
        </base-form-item>
      </div>

      <div>
        First name: {{ data.firstName }}
      </div>
      <div>
        Last name: {{ data.lastName }}
      </div>
      <div>
        Birthday: {{ $globalization.format(data.birthday, "d") }}
      </div>
      <div>
        Mail: {{ data.mail }}
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>