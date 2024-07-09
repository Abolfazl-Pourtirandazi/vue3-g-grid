<template>
  <i :class="`g-icon ${icon}`" :style="{ transform: `rotate(${rotation}deg)` }" v-bind="$attrs"></i>
</template>

<script lang="ts" setup>
import type { IconProps } from "../../types/icon";

defineOptions({ name: "GIcon", inheritAttrs: false });

withDefaults(defineProps<IconProps>(), {
  rotation: 0
});
</script>
