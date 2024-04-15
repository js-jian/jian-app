import { ProfileOutlined } from "@ant-design/icons";
import { Collapse, Form, Input, Tabs, Tooltip } from "antd";
import { PROPERTIES_PANEL_TAB_KEY } from "../constants";
import styles from "./UserTaskPropertiesPanel.module.less";

export function UserTaskPropertiesPanel(): React.ReactElement {

  const renderTabNode = (tabKey: string) => {
    let icon;
    let title;
    switch (tabKey) {
      case PROPERTIES_PANEL_TAB_KEY.BASIC:
        icon = <ProfileOutlined />;
        title = "基本信息";
        break;
    }

    return (
      <Tooltip title={title} placement="left">
        {icon}
      </Tooltip>
    );
  };
  
  const renderBasicTabChildren = () => {
    return (
      <Form>
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入必填字段【基本信息-节点名称】",
            },
          ]}
        >
          <Input />
        </Form.Item>   
      </Form>
    )
  };

  const tabItems = [
    {
      key: "1",
      label: renderTabNode(PROPERTIES_PANEL_TAB_KEY.BASIC),
      children: renderBasicTabChildren()
    }
  ];

  return (
    <div className={styles.panel}>
      {/* <Tabs items={tabItems} tabPosition="left" /> */}
    </div>
  )
};
