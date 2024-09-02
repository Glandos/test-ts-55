import Vue, { VNode } from 'vue'

declare global {
  /**
   * Are we running in production?
   * 
   * Defined in vue.config.js with webpack.DefinePlugin
   */
  const PRODUCTION: boolean
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }

  /**
   * Used for triggering loading logo before app is loaded.
   */
  const initLoader: ReturnType<Window['setTimeout']>
}
