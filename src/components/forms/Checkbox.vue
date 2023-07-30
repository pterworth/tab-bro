<script setup>
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Checkbox'
  },
  checked: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits({
  onChange: {
    type: 'change',
    default: () => {}
  }
});

const changeState = () => {
  emit('onChange', props.id);
};
</script>

<template>
  <label :for="'settingCheckbox' + id">
    <input
      type="checkbox"
      :disabled="disabled"
      :id="'settingCheckbox' + id"
      :value="value"
      :checked="checked"
      @change="changeState"
    />
    <slot>{{ label }}</slot>
  </label>
</template>

<style lang="scss" scoped></style>
