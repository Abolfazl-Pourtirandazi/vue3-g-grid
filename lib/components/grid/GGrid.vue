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
  footer: false,
  loading: false,
  serverSide: false,
  height: 110
});

const {
  gGrid,
  currentPage,
  totalPages,
  getItems,
  hasNextPage,
  hasPreviousPage,
  getAggregates,
  startIndex,
  endIndex,
  getTotalRows,
  paginate,
  getRowData,
  width,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  handleChangePage
} = useGrid(props);
</script>

<template>
  <div class="g-grid">
    <div ref="gGrid" class="gg--content">
      <div class="gg--table-responsive" :style="{ minHeight: height + 'px' }">
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

          <template v-if="getItems.length">
            <!-- Rows -->
            <tbody>
              <template v-for="(row, index) in getItems" :key="index">
                <tr
                  :class="{
                    'gg--even': index % 2,
                    'gg--border-none': getItems.length - 1 === index
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
                      {{ getRowData(row, column) }}
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
          <template v-if="!getItems.length && !loading">
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
            <g-icon icon="mdi mdi-chevron-double-left" />
          </div>
          <div class="gg--previous-page gg--button" :class="{ 'gg--disabled': !hasPreviousPage }" @click="previousPage">
            <g-icon icon="mdi mdi-chevron-left" />
          </div>

          <div class="gg--pages">
            <template v-for="number in paginate" :key="number">
              <div
                class="gg--page gg--button"
                :class="{ 'gg--active': Number(number) + 1 === currentPage }"
                @click="handleChangePage(Number(number) + 1)"
              >
                {{ Number(number) + 1 }}
              </div>
            </template>
          </div>

          <div class="gg--next-page gg--button" :class="{ 'gg--disabled': !hasNextPage }" @click="nextPage">
            <g-icon icon="mdi mdi-chevron-right" />
          </div>
          <div class="gg--last-page gg--button" :class="{ 'gg--disabled': !hasNextPage }" @click="lastPage">
            <g-icon icon="mdi mdi-chevron-double-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./gGrid.scss";
</style>
