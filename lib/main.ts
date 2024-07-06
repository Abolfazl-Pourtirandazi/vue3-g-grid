import { GGridPlugin, type GGridOptions } from "./plugin";
import GGrid from "./components/grid/GGrid.vue";
import type {
  GridProps,
  GridColumn,
  GridType,
  GridAggregates,
  GridAggregateType,
  GridSort,
  SortOptions,
  SortType
} from "./types/grid";

export type {
  GGridOptions,
  GridProps,
  GridColumn,
  GridType,
  GridAggregates,
  GridAggregateType,
  GridSort,
  SortOptions,
  SortType
};

export { GGrid };

export default GGridPlugin;
