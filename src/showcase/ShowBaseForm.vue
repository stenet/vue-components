<script lang="ts" setup>
import BaseForm from "@/components/BaseForm.vue";
import type BaseFormExpose from "@/components/BaseFormExpose";
import BaseFormItem from "@/components/BaseFormItem.vue";
import { ref } from "vue";

const data = ref<{
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  mail?: string;
  salary?: number;
}>({});

const baseForm = ref<BaseFormExpose>();

function onValidateData() {
  baseForm.value?.validate();
}
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-form and base-form-item
    </h2>
    <div class="flex flex-col gap-4">
      <base-form ref="baseForm">
        <div class="grid grid-cols-2 gap-4">
          <base-form-item
            :label="$t('first-name')"
            v-model="data.firstName"
            :required="true"
            :rules="{ stringLength: { min: 3, max: 20 }}">
          </base-form-item>

          <base-form-item
            :label="$t('last-name')"
            v-model="data.lastName"
            :required="true">
          </base-form-item>

          <base-form-item
            :label="$t('birthday')"
            type="DxDateBox"
            v-model="data.birthday"
            format="d"
            :required="true"
            :rules="{ dateInPast: true }">
          </base-form-item>

          <base-form-item
            :label="$t('mail')"
            v-model="data.mail"
            :required="true"
            :rules="{ email: true }">
          </base-form-item>

          <base-form-item
            :label="$t('salary')"
            type="DxNumberBox"
            format="n2"
            v-model="data.salary"
            :required="true">
          </base-form-item>
        </div>
      </base-form>
      
      <div>
        <dx-button
          text="Validate data"
          @click="onValidateData()"></dx-button>
      </div>

      <div>
        First name: {{ data.firstName }}
      </div>
      <div>
        Last name: {{ data.lastName }}
      </div>
      <div>
        Birthday: {{ data.birthday ? $d(data.birthday, "d") : "" }}
      </div>
      <div>
        Mail: {{ data.mail }}
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>