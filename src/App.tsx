import { Bpmn } from "./components/bpmn/Bpmn";
import { VirtualTable } from "./components/virtualTable/VirtualTable";
import { VirtualTableExample } from "./components/virtualTable/test";
import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.app}>
      <div style={{ fontSize: "30px" }}>测试</div>
      {/* <Bpmn/> */}
      <VirtualTableExample />
    </div>
  );
}

export default App;
