<template>
  <component
    :is="component"
    :class="`g-icon ${icon}`"
    :style="{ transform: `rotate(${rotation}deg)` }"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { IconProps } from "../../types/icon";
import ArrowDownThin from "./ArrowDownThin.vue";
import ArrowUpThin from "./ArrowUpThin.vue";
import ChevronDoubleLeft from "./ChevronDoubleLeft.vue";
import ChevronDoubleRight from "./ChevronDoubleRight.vue";
import ChevronLeft from "./ChevronLeft.vue";
import ChevronRight from "./ChevronRight.vue";

defineOptions({ name: "GIcon", inheritAttrs: false });

const props = withDefaults(defineProps<IconProps>(), {
  rotation: 0
});

/* Icons List */
const icons: any = {
  "arrow-down-thin": ArrowDownThin,
  "arrow-up-thin": ArrowUpThin,
  "chevron-double-left": ChevronDoubleLeft,
  "chevron-double-right": ChevronDoubleRight,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight
};

/* Icon Component */
const component = computed((): HTMLElement => icons[props.icon]);
</script>
