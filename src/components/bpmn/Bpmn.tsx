import { useEffect, useRef } from "react";
import styles from "./Bpmn.module.less";
import BpmnModeler from "bpmn-js/lib/Modeler";
import BaseViewer from "bpmn-js/lib/BaseViewer";
import { DIAGRAM_XML } from "./constants";

// 添加完以下4个样式后，左侧会出现默认工具
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

// 选中节点后节点旁的操作module
import customContextPadModule from "./context-pad";

// 自定义左侧工具
import customPaletteModule from "./palette";

// 自定义国际化
import customTranslate from "./i18n/customTranslate";
const customTranslateModule = { translate: ["value", customTranslate] };

function Bpmn() {
  const modelerRef = useRef<BaseViewer>();
  useEffect(() => {
    if (!modelerRef.current) {
      const modeler = new BpmnModeler({
        container: "#canvas",
        additionalModules: [
          customTranslateModule,
          customContextPadModule, // 选中节点后节点旁的操作module
          customPaletteModule, // 左边工具module
        ]
      });

      createNewDiagram(modeler, DIAGRAM_XML);

      modelerRef.current = modeler;
    }
  }, []);

  const createNewDiagram = async (modeler: BaseViewer, xmlStr: string) => {
    try {
      await modeler.importXML(xmlStr);

      // 将流程图调整显示在正中间
      (modeler.get("canvas") as any).zoom("fit-viewport", "auto");
    } catch (err) {
      console.log('error rendering', err);
    }
  };

  return (
    <div className={styles.bpmnWrapper}>
      <div className={styles.canvas} id="canvas"></div>
    </div>
  );
}

export default Bpmn;