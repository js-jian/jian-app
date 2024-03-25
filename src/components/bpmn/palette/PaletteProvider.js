import { assign } from 'min-dash';

/**
 * 从bpmn-js源码复制过来 (https://github.com/bpmn-io/bpmn-js/blob/develop/lib/features/palette/PaletteProvider.js)
 * PaletteProvider.bk文件为没有更改的源代码
 * 
 * 
 * 
 * A palette provider for BPMN 2.0 elements.
 *
 * @param {Palette} palette
 * @param {Create} create
 * @param {ElementFactory} elementFactory
 * @param {SpaceTool} spaceTool
 * @param {LassoTool} lassoTool
 * @param {HandTool} handTool
 * @param {GlobalConnect} globalConnect
 * @param {Translate} translate
 */
export default function PaletteProvider(
  palette,
  create,
  elementFactory,
  spaceTool,
  lassoTool,
  handTool,
  globalConnect,
  translate
) {

this._palette = palette;
this._create = create;
this._elementFactory = elementFactory;
this._spaceTool = spaceTool;
this._lassoTool = lassoTool;
this._handTool = handTool;
this._globalConnect = globalConnect;
this._translate = translate;

palette.registerProvider(this);
}

PaletteProvider.$inject = [
'palette',
'create',
'elementFactory',
'spaceTool',
'lassoTool',
'handTool',
'globalConnect',
'translate'
];

/**
* @return {PaletteEntries}
*/
PaletteProvider.prototype.getPaletteEntries = function() {

var actions = {},
    create = this._create,
    elementFactory = this._elementFactory,
    spaceTool = this._spaceTool,
    lassoTool = this._lassoTool,
    handTool = this._handTool,
    globalConnect = this._globalConnect,
    translate = this._translate;

function createAction(type, group, className, title, options) {
  function createListener(event) {
    var shape = elementFactory.createShape(assign({ type: type }, options));
    create.start(event, shape);
  }

  let shortType = type.replace(/^bpmn:/, "");

  return {
    group: group,
    className: className,
    title: title || translate("Create {type}", { type: shortType }),
    action: {
      dragstart: createListener,
      click: createListener
    }
  };
}

function createSubprocess(event) {
  var subProcess = elementFactory.createShape({
    type: 'bpmn:SubProcess',
    x: 0,
    y: 0,
    isExpanded: true
  });

  var startEvent = elementFactory.createShape({
    type: 'bpmn:StartEvent',
    x: 40,
    y: 82,
    parent: subProcess
  });

  create.start(event, [ subProcess, startEvent ], {
    hints: {
      autoSelect: [ subProcess ]
    }
  });
}

function createParticipant(event) {
  create.start(event, elementFactory.createParticipantShape());
}

assign(actions, {
  // 抓手工具
  'hand-tool': {
    group: 'tools',
    className: 'bpmn-icon-hand-tool',
    title: translate('Activate hand tool'),
    action: {
      click: function(event) {
        handTool.activateHand(event);
      }
    }
  },
  // 连接工具
  'global-connect-tool': {
    group: 'tools',
    className: 'bpmn-icon-connection-multi',
    title: translate('Activate global connect tool'),
    action: {
      click: function(event) {
        globalConnect.start(event);
      }
    }
  },
  // 开始节点
  'create.start-event': createAction(
    'bpmn:StartEvent',
    'event',
    'bpmn-icon-start-event-none',
    ""
  ),
  // 结束节点
  'create.end-event': createAction(
    'bpmn:EndEvent',
    'event',
    'bpmn-icon-end-event-none',
    "结束"
  ),
  // 排他网关
  'create.exclusive-gateway': createAction(
    'bpmn:ExclusiveGateway',
    'gateway',
    'bpmn-icon-gateway-none',
    "创建排他网关"
  ),
  // 包容网关
  "create.inclusive-gateway": createAction(
    "bpmn:InclusiveGateway",
    "gateway",
    "bpmn-icon-gateway-or",
    "创建包容网关"
  ),
  // 并行网关
  "create.parallel-gateway": createAction(
    "bpmn:ParallelGateway",
    "gateway",
    "bpmn-icon-gateway-parallel",
    "创建并行网关"
  ),
  // 任务节点
  'create.task': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task',
    "创建流程任务"
  ),
  // 子流程节点
  'create.subprocess-expanded': {
    group: 'activity',
    className: 'bpmn-icon-subprocess-expanded',
    title: translate('Create expanded sub-process'),
    action: {
      dragstart: createSubprocess,
      click: createSubprocess
    }
  },
});

return actions;
};