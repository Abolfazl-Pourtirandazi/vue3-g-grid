<template>
  <th
    scope="col"
    :class="[column.columnClassName, { sortable: hasSortable }]"
    :style="{
      minWidth: column.width,
      maxWidth: column.width
    }"
    @click="sortColumn"
  >
    <div class="gg--column">
      <span class="gg--column-title">
        <slot :name="column.columnCell" v-bind="{ column }">
          {{ column.title }}
        </slot>
      </span>

      <template v-if="currentSort">
        <div class="gg--sort-info">
          <g-icon class="gg--sort-icon" :icon="sortInfo.icon" />
          <span class="gg--sort-priority">{{ sortInfo.priority }}</span>
        </div>
      </template>
    </div>
  </th>
</template>

<script lang="ts" setup>
import { type PropType, computed } from "vue";
import type { GridColumn, GridSort, SortInfo } from "../../types/grid";
import GIcon from "../icon/GIcon.vue";

const emit = defineEmits(["column:sort"]);

const props = defineProps({
  column: {
    type: Object as PropType<GridColumn>,
    required: true
  },
  sort: {
    type: Array as PropType<GridSort[]>,
    required: true
  }
});

/* Srot Index */
const sortIndex = computed((): number => props.sort.findIndex((item) => item.field === props.column.field) ?? -1);

/* Current Sort */
const currentSort = computed((): GridSort | undefined => {
  return sortIndex.value >= 0 ? props.sort[sortIndex.value] : undefined;
});

/* Sort Info */
const sortInfo = computed((): SortInfo => {
  const data: SortInfo = { icon: "mdi mdi-arrow-up-thin", priority: "" };

  if (currentSort.value?.type === 1) {
    data.icon = "mdi mdi-arrow-down-thin";
  }

  if (props.sort.length > 1) {
    data.priority = sortIndex.value + 1;
  }

  return data;
});

/* Has Sortable Column */
const hasSortable = computed((): boolean => props.column.sortable ?? false);

/* Sort Column */
const sortColumn = (): void => {
  if (!hasSortable.value) return;

  emit("column:sort", props.column);
};
</script>

<style lang="scss" scoped>
@import "./gGrid.scss";
</style>
