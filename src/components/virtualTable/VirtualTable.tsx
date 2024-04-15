import { Table } from "antd";
import type { TableProps } from 'antd';
import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { cloneDeep, divide, isNil, isNumber, throttle, toPath } from "lodash";
import styles from "./VirtualTable.module.less";
import React from "react";

function VWrapper(props: any) {
  const {
    itemHeight = 60,
    visibleHeight = 600,
    children,
    className
  } = props;

  const [range, setRange] = useState([0, 10]);
  const [offset, setOffset] = useState([0, 0]); // 存在问题：滚动条太小
  const [dataLenght, setDataLenght] = useState(props.children?.[1] || 0);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    setDataLenght(props.children?.[1]?.length || 0);
  }, [props.children]);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const scrollTop = (e?.target as any)?.scrollTop;
      const start = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(visibleHeight / itemHeight);
      const end = start + visibleCount;

      setRange([start, end]);
      setOffset([start * itemHeight, (dataLenght - end) * itemHeight])
    };
    if (tbodyRef.current?.parentNode?.parentNode) {
      tbodyRef.current.parentNode.parentNode.addEventListener("scroll", onScroll);
    }

    return () => {
      if (tbodyRef.current?.parentNode?.parentNode) {
        tbodyRef.current.parentNode.parentNode.removeEventListener("scroll", onScroll);
      }
    }
  }, [props.children]);
  
  return (
    <tbody className={className} ref={tbodyRef}>
      {children?.[0]}
      <tr style={{ height: offset[0] }} />
      {children?.[1]?.slice(range[0], range[1] + 1)}
      <tr style={{ height: offset[1] }} />
    </tbody>
  )
}


export function VirtualTable(props: any) {
  const {
    columns,
    dataSource,
    rowKey,
  } = props;

  const initData = useMemo(() => {
    return (
      dataSource &&
      (rowKey
        ? dataSource
        : dataSource.map((item: any, index: number) =>
          isNil(item.key) ? { ...item, key: index } : item
        ))
    );
  }, [dataSource, rowKey]);

  const [data, setData] = useState(initData);

  useEffect(() => {
    setData(initData);
  }, [initData]);

  const customColumns = useMemo(() => {
    return (columns || []).map((column: any) => {
      if (typeof column.dataIndex === "string") {
        column.dataIndex = toPath(column.dataIndex);
      }

      return column;
    });
  }, [columns, rowKey]);

  return (
    <Table
      dataSource={data}
      columns={customColumns}
      rowKey={rowKey}
      pagination={false}
      scroll={{ y: 600 }}
      components={{
        body: {
          wrapper: VWrapper,
        },
      }}
    />
  );
}
