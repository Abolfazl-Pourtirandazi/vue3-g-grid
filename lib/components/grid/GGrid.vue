<script lang="ts" setup>
import useGrid from "../../composables/useGrid";
import GIcon from "../icon/GIcon.vue";
import GSpinner from "../spinner/GSpinner.vue";
import type { GridColumn, GridProps } from "../../types/grid";

defineOptions({ name: "GGrid" });

const props = withDefaults(defineProps<Partial<GridProps>>(), {
  columns: () => [] as GridColumn[],
  rows: () => [] as object[],
  currentPage: 1,
  perPage: 10,
  pageRangeDisplayed: 4,
  footer: false,
  loading: false,
  serverSide: false,
  height: 110,
  rtl: false,
  dark: false
});

const {
  gGrid,
  currentPage,
  getTotalRows,
  startIndex,
  endIndex,
  getColumns,
  getRows,
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
    <div ref="gGrid" class="gg--content">
      <div class="gg--table-responsive" :style="{ minHeight: height + 'px' }">
        <table>
          <!-- Columns -->
          <thead>
            <tr>
              <th scope="col">#</th>
              <template v-for="(column, index) in getColumns" :key="index">
                <th
                  scope="col"
                  :class="column.columnClassName"
                  :style="{
                    minWidth: width(column) + 'px',
                    maxWidth: width(column) + 'px'
                  }"
                  @click="sortColumn(column)"
                >
                  <slot :name="column.columnCell" v-bind="{ column }">
                    {{ column.title }}
                  </slot>
                </th>
              </template>
            </tr>
          </thead>

          <!-- Loading -->
          <div class="gg--loading" v-show="loading">
            <slot name="loading">
              <g-spinner />
            </slot>
          </div>

          <template v-if="getRows.length">
            <!-- Rows -->
            <tbody>
              <template v-for="(row, index) in getRows" :key="index">
                <tr
                  :class="{
                    'gg--even': index % 2,
                    'gg--border-none': getRows.length - 1 === index
                  }"
                >
                  <th scope="row">{{ index + 1 + startIndex }}</th>
                  <template v-for="(column, cIndex) in columns" :key="cIndex">
                    <td
                      :class="column.rowClassName"
                      :style="{
                        minWidth: width(column) + 'px',
                        maxWidth: width(column) + 'px'
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

            <!-- Footer -->
            <tfoot v-if="footer">
              <tr>
                <th scope="row" colspan="1"></th>
                <template v-for="(column, cIndex) in columns" :key="cIndex">
                  <th colspan="1" :style="{ minWidth: width(column) + 'px' }">
                    <slot :name="column.footerCell" v-bind="{ column, aggregates: getAggregates }">
                      {{ column.footer }}
                    </slot>
                  </th>
                </template>
              </tr>
            </tfoot>
          </template>

          <!-- Empty -->
          <template v-if="!getRows.length && !loading">
            <div class="gg--empty">No Data Availaible</div>
          </template>
        </table>
      </div>

      <!-- Pagination -->
      <div class="gg--pagination">
        <div class="gg-description">
          Showing {{ endIndex >= 1 ? startIndex + 1 : 0 }} to {{ endIndex }} of {{ getTotalRows }} entries
        </div>

        <div class="gg--button-groups">
          <div class="gg--first-page gg--button" :class="{ 'gg--disabled': !hasPreviousPage }" @click="firstPage">
            <g-icon icon="mdi mdi-chevron-double-left" :rotation="rtl ? 180 : 0" />
          </div>
          <div class="gg--previous-page gg--button" :class="{ 'gg--disabled': !hasPreviousPage }" @click="previousPage">
            <g-icon icon="mdi mdi-chevron-left" :rotation="rtl ? 180 : 0" />
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
            <g-icon icon="mdi mdi-chevron-right" :rotation="rtl ? 180 : 0" />
          </div>
          <div class="gg--last-page gg--button" :class="{ 'gg--disabled': !hasNextPage }" @click="lastPage">
            <g-icon icon="mdi mdi-chevron-double-right" :rotation="rtl ? 180 : 0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./gGrid.scss";
</style>
