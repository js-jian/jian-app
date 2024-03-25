import Bpmn from "./components/bpmn/Bpmn";
import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.app}>
      <Bpmn></Bpmn>
    </div>
  );
}

export default App;
