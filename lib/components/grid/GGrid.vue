<script lang="ts" setup>
import useGrid from "../../composables/useGrid";
import GIcon from "../icons/GIcon.vue";
import GSpinner from "../spinner/GSpinner.vue";
import type { GridColumn, GridProps, SortOptions } from "../../types/grid";
import Column from "./Column.vue";

defineOptions({ name: "GGrid" });

const props = withDefaults(defineProps<Partial<GridProps>>(), {
  columns: () => [] as GridColumn[],
  rows: () => [] as object[],
  currentPage: 1,
  perPage: 10,
  pageRangeDisplayed: 4,
  sortOptions: (): SortOptions => {
    return {
      multiple: false
    };
  },
  footer: false,
  loading: false,
  serverSide: false,
  height: 110,
  rtl: false,
  dark: false
});

const {
  gGrid,
  sort,
  currentPage,
  getTotalRows,
  startIndex,
  endIndex,
  columnsToDisplay,
  rowsToDisplay,
  hasNextPage,
  hasPreviousPage,
  getAggregates,
  pagesToDisplay,
  getRowValue,
  sortColumn,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  handleChangePage,
  width
} = useGrid(props);
</script>

<template>
  <div class="g-grid" :class="{ rtl: rtl, dark: dark }">
    <div ref="gGrid" class="gg--container">
      <div class="gg--table-responsive" :style="{ minHeight: height + 'px' }">
        <table class="gg--table-wrapper" role="table">
          <!-- Header Row -->
          <thead class="gg--thead" role="rowgroup">
            <tr class="gg--header-row" role="row">
              <th class="gg--header-cell" scope="col" role="columnheader">#</th>
              <template v-for="column in columnsToDisplay" :key="column.field">
                <Column :column="column" :sort="sort" @column:sort="sortColumn">
                  <template #[`${column.columnCell}`]>
                    <slot :name="column.columnCell" v-bind="{ column }"> </slot>
                  </template>
                </Column>
              </template>
            </tr>
          </thead>

          <!-- Loading -->
          <div class="gg--loading" v-show="loading">
            <slot name="loading">
              <g-spinner />
            </slot>
          </div>

          <!-- Body -->
          <template v-if="rowsToDisplay.length">
            <tbody class="gg--tbody" role="rowgroup">
              <template v-for="(row, index) in rowsToDisplay" :key="index">
                <tr
                  class="gg--row"
                  :class="[
                    index % 2 ? 'gg--row-even' : 'gg--row-odd',
                    {
                      'gg--border-none': rowsToDisplay.length - 1 === index
                    }
                  ]"
                  role="row"
                >
                  <td class="gg--row-cell" role="cell">{{ index + 1 + startIndex }}</td>
                  <template v-for="column in columnsToDisplay" :key="column.field">
                    <td
                      class="gg--row-cell"
                      :class="column.rowClassName"
                      role="cell"
                      :style="{
                        minWidth: width(column),
                        maxWidth: width(column)
                      }"
                    >
                      <slot :name="column.rowCell" v-bind="{ row, column }">
                        {{ getRowValue(row, column) }}
                      </slot>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>

            <!-- Footer Row -->
            <template v-if="footer">
              <tfoot class="gg--tfoot" role="rowgroup">
                <tr class="gg--footer-row" role="row">
                  <td class="gg--footer-cell" colspan="1" role="cell"></td>
                  <template v-for="column in columnsToDisplay" :key="column.field">
                    <td
                      class="gg--footer-cell"
                      colspan="1"
                      :style="{
                        minWidth: width(column),
                        maxWidth: width(column)
                      }"
                      role="cell"
                    >
                      <slot :name="column.footerCell" v-bind="{ column, aggregates: getAggregates }">
                        {{ column.footer }}
                      </slot>
                    </td>
                  </template>
                </tr>
              </tfoot>
            </template>
          </template>

          <!-- Empty -->
          <template v-if="!rowsToDisplay.length && !loading">
            <div class="gg--empty">
              <slot name="no-data"> No Data Availaible </slot>
            </div>
          </template>
        </table>
      </div>

      <!-- Pagination -->
      <div class="gg--pagination">
        <div class="gg--description">
          Showing {{ endIndex >= 1 ? startIndex + 1 : 0 }} to {{ endIndex }} of {{ getTotalRows }} entries
        </div>

        <div class="gg--button-groups">
          <div class="gg--first-page gg--button" :class="{ 'gg--disabled': !hasPreviousPage }" @click="firstPage">
            <g-icon icon="chevron-double-left" :rotation="rtl ? 180 : 0" />
          </div>
          <div class="gg--previous-page gg--button" :class="{ 'gg--disabled': !hasPreviousPage }" @click="previousPage">
            <g-icon icon="chevron-left" :rotation="rtl ? 180 : 0" />
          </div>

          <div class="gg--pages">
            <template v-for="page in pagesToDisplay" :key="page">
              <div
                class="gg--page gg--button"
                :class="{ 'gg--active': page === currentPage }"
                @click="handleChangePage(page)"
              >
                {{ page }}
              </div>
            </template>
          </div>

          <div class="gg--next-page gg--button" :class="{ 'gg--disabled': !hasNextPage }" @click="nextPage">
            <g-icon icon="chevron-right" :rotation="rtl ? 180 : 0" />
          </div>
          <div class="gg--last-page gg--button" :class="{ 'gg--disabled': !hasNextPage }" @click="lastPage">
            <g-icon icon="chevron-double-right" :rotation="rtl ? 180 : 0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
