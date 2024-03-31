import { useEffect, useRef, useState } from "react";
import styles from "./Bpmn.module.less";
import BpmnModeler from "bpmn-js/lib/Modeler";
import BaseViewer from "bpmn-js/lib/BaseViewer";
import { DIAGRAM_XML, ELEMENT_TYPE } from "./constants";
import { Button } from "antd";
import { UserTaskPropertiesPanel } from "./properties-panel/UserTaskPropertiesPanel";

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

export function Bpmn() {
  const modelerRef = useRef<BaseViewer>();
  const [selectedElement, setSelectedElement] = useState<any>();

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

      modeler.on("selection.changed", (event: Record<string, any>) => {
        const newElement = event.newSelection[0];

        setSelectedElement(newElement);
      });
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

  const download = (
    type: "xml" | "svg",
    data: string
  ) => {
    let fileName = "";
    const aEle = document.createElement("a");
    switch (type) {
      case "xml":
        fileName = "bpmn20.xml";
        break;
      case "svg":
        fileName = "svg";
        break;
    }

    fileName = `diagram.${fileName}`;
    aEle.setAttribute(
      "href",
      `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
    );
    aEle.setAttribute("target", "_blank");
    aEle.setAttribute("download", fileName);

    document.body.appendChild(aEle);
    aEle.click();
    document.body.removeChild(aEle);
  };

  // 下载 XML 格式
  const downloadXml = () => {
    modelerRef?.current?.saveXML({ format: true }).then(({ xml }) => {
      download("xml", xml as string);
    });
  };

  // 下载 SVG 格式
  const downloadSvg = () => {
    modelerRef?.current?.saveSVG().then(({ svg }) => {
      download("svg", svg as string);
    });
  };

  // 更新XML
  const updateProperties = (properties: Record<string, any>): void => {
    if (modelerRef?.current) {
      const modeling = modelerRef.current.get("modeling") as any;
      modeling.updateProperties(selectedElement, properties);
    }
  };
  

  const renderPropertiesPanel = (): React.ReactElement => {
    switch (selectedElement?.type) {
      case ELEMENT_TYPE.Task:
        return (
          <UserTaskPropertiesPanel />
        );
    }

    return <></>;
  };

  return (
    <div className={styles.bpmnContainer}>
      <div>
        <Button onClick={downloadXml}>下载XML</Button>
        <Button onClick={downloadSvg}>下载SVG</Button>
      </div>
      <div className={styles.bpmnWrapper}>
        <div className={styles.canvas} id="canvas"></div>
        {renderPropertiesPanel()}
      </div>
    </div>
  );
}
