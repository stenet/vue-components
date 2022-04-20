<script lang="ts" setup>
import { validateRules } from "@/services/validation-rules";
import type { ValueChangedEvent } from "devextreme/ui/text_box";
import type { ValidationCallbackData } from "devextreme/ui/validation_rules";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { getDateTimeFormatterParser } from "@/plugins/globalization";

const i18n = useI18n();

const props = withDefaults(defineProps<{
  type?: any;
  label?: string;
  modelValue: any;
  rules?: Record<string, any>;
  required?: boolean;
  format?: any;
  others?: any;
}>(), {
  type: "DxTextBox"
});

const emit = defineEmits<{
  (e: "update:modelValue", v: any): void
}>();

const formItemClass = computed(() => {
  const r: string[] = [];

  if (!props.label) {
    r.push("base-form-item--no-label");
  }

  return r;
});

const others = computed(() => {
  const r: Record<string, any> = {
    ...(props.others || {})
  };
  
  if (props.type == "DxDateBox" && props.format) {
    r.displayFormat = props.format;
  } else if (props.type == "DxNumberBox" && props.format) {
    r.format = props.format;
  }
  
  return r;
});

function onValueChanged(ev: ValueChangedEvent) {
  if (!ev.event) {
    return;
  }

  emit("update:modelValue", ev.value);
}
function onValidate(ev: ValidationCallbackData) {
  const updateMessage = () => {
    if (!props.label) {
      return;
    }
    
    ev.rule.message = `${props.label}: ${ev.rule.message}`;
  }
  
  if (props.required) {
    if (!validateRules(i18n,{ required: true }, ev)) {
      updateMessage();
      return false;
    }
  }

  if (props.rules) {
    if (!validateRules(i18n, props.rules, ev)) {
      updateMessage();
      return false;
    }
  }

  return true;
}
</script>

<template>
  <div
      class="base-form-item"
      :class="formItemClass">
    <div>{{ props.label }}</div>
    <div>
      <component
          :is="props.type"
          :value="props.modelValue"
          v-bind="others"
          @valueChanged="onValueChanged($event)">
        <dx-validator>
          <dx-custom-rule
              type="custom"
              :reevaluate="true"
              :validation-callback="onValidate"/>
        </dx-validator>
      </component>
    </div>
  </div>
</template>

<style lang="less">
.base-form-item {
@apply grid items-center;
  grid-template-columns: minmax(150px, auto) 1fr;
}

@media (max-width: 575px) {
  .base-form-item {
    grid-template-columns: 1fr;
  }
}

.base-form-item--no-label {
  grid-template-columns: 1fr;
}
</style>