<template>
  <th
    scope="col"
    :class="column.columnClassName"
    :style="{
      minWidth: column.width + 'px',
      maxWidth: column.width + 'px'
    }"
    @click="sortColumn"
  >
    <slot :name="column.columnCell" v-bind="{ column }">
      {{ column.title }}
    </slot>
  </th>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import type { GridColumn } from "../../types/grid";

const emit = defineEmits(["column:sort"]);

const props = defineProps({
  column: {
    type: Object as PropType<GridColumn>,
    required: true
  }
});

/* Sort Column */
const sortColumn = (): void => {
  emit("column:sort", props.column);
};
</script>
