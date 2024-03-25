/// <reference types="react-scripts" />

declare module "react/jsx-runtime" {
  export default any;
}

declare module "*.module.less" {
  const classes: { readonly [key: string]: string};
  export default classes;
}

declare module "diagram-js-direct-editing" {
  export default any;
}