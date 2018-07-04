declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  datepicker(options?: any, callback?: Function): any;
  selectpicker(options?: any, callback?: Function): any;
  mask(options?: any, callback?: Function): any;
}
