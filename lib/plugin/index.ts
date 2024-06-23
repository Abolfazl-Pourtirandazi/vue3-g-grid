import type { App } from "vue";
import GGrid from "../components/grid/GGrid.vue";
import "../assets/scss/style.scss";

export interface GGridOptions {
  componentName: string | undefined;
}

export const GGridPlugin = {
  install: (app: App, options: GGridOptions | undefined = undefined) => {
    const name: string = options?.componentName || (GGrid.name as string);

    app.component(name, GGrid);
  }
};
