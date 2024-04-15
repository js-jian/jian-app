import { Table } from "antd";
import { VirtualTable } from "./VirtualTable";

const mockList = new Array(1000).fill(0).map((_, index) => {
  const id = "ID_" + index;
  return {
    id,
    label: index === 1? "" + Math.random() + Math.random() + Math.random() : Math.random(),
    prop: id,
    prop2: id,
    prop3: id,
    prop4: id,
    prop5: id,
    prop6: id,
    obj: {
      temp: id + "_temp"
    },
    ext: [
      {
        dataIndex: "id",
        title: "id",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "label",
        title: "label",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "id",
        title: "ID",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "obj.temp",
        title: "obj.temp",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      }
    ],
    ext2: [
      {
        dataIndex: "id",
        title: "id",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "label",
        title: "label",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "id",
        title: "ID",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "obj.temp",
        title: "obj.temp",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      }
    ],
    ext3: [
      {
        dataIndex: "id",
        title: "id",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "label",
        title: "label",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "id",
        title: "ID",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "obj.temp",
        title: "obj.temp",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      }
    ],
    ext4: [
      {
        dataIndex: "id",
        title: "id",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "label",
        title: "label",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "id",
        title: "ID",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      },
      {
        dataIndex: "obj.temp",
        title: "obj.temp",
        render: (text: string, record: any, index: number) => {
          return <span>{text}</span>;
        }
      }
    ],
  };
}) as any;

export function VirtualTableExample() {
  const columns = [
    {
      dataIndex: "id",
      title: "id",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "label",
      title: "label",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "id",
      title: "ID",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "obj.temp",
      title: "obj.temp",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "prop",
      title: "prop",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "prop2",
      title: "prop2",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "prop3",
      title: "prop3",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "prop4",
      title: "prop4",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "prop5",
      title: "prop5",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    },
    {
      dataIndex: "prop6",
      title: "prop6",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      }
    }
  ] as any;

  // "antd": "4.12.3",
  return (
    <>
      <VirtualTable
        rowKey="id"
        columns={columns}
        dataSource={mockList}
      />
      {/* <Table
        rowKey="id"
        columns={columns}
        dataSource={mockList}
        pagination={false}
        virtual
        scroll={{ y: 600 }}
      /> */}
    </>
  )

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={mockList}
      pagination={false}
    />
  )
}

