import { Bpmn } from "./components/bpmn/Bpmn";
import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.app}>
      <div style={{ fontSize: "30px" }}>测试</div>
      <Bpmn></Bpmn>
    </div>
  );
}

export default App;
