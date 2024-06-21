<script lang="ts" setup>
import useGrid from "@/composables/useGrid";
import type { GridColumn, GridProps } from "@/@types/grid";

defineOptions({ name: "GGrid" });

withDefaults(defineProps<GridProps>(), {
  columns: () => [] as GridColumn[],
  rows: () => [] as object[]
});

const { gGrid, getRowData, width } = useGrid();
</script>

<template>
  <div class="g-grid">
    <div ref="gGrid" class="content">
      <div class="g-table-responsive">
        <table>
          <!-- Columns -->
          <thead>
            <tr>
              <th scope="col">#</th>
              <template v-for="(column, index) in columns" :key="index">
                <th
                  scope="col"
                  :class="column.columnClassName"
                  :style="{
                    minWidth: width(column) + 'px',
                    maxWidth: width(column) + 'px'
                  }"
                >
                  {{ column.title }}
                </th>
              </template>
            </tr>
          </thead>

          <!-- Rows -->
          <tbody>
            <template v-for="(row, index) in rows" :key="index">
              <tr
                :class="{
                  even: index % 2,
                  'border-none': rows.length - 1 === index
                }"
              >
                <th scope="row">{{ index + 1 }}</th>
                <template v-for="(column, cIndex) in columns" :key="cIndex">
                  <td
                    :class="column.rowClassName"
                    :style="{
                      minWidth: width(column) + 'px',
                      maxWidth: width(column) + 'px'
                    }"
                  >
                    {{ getRowData(row, column) }}
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./gGrid.scss";
</style>
