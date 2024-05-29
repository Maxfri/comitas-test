//types
import type { ResizeCallbackData } from 'react-resizable';
import { ColumnsType } from 'antd/es/table';
import { IFixed } from 'types/types';

//dependencies
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';
import { Table as AntdTable } from 'antd';

//constants
import { TABLE_MIN_HEIGHT } from 'utils/constants';

//styles
import style from './Table.module.scss';

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void;
    width: number;
  },
) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th className={style.table__th} {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      minConstraints={[100, 100]}
      maxConstraints={[300, 300]}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th className={style.table__th} {...restProps} />
    </Resizable>
  );
};

const Table: React.FC<{
  rowKey: any;
  loading?: boolean;
  dataSource: any;
  initColumns: ColumnsType<any>;
  pagination?: ReactNode;
  settings?: { hiddens: string[]; fixeds: IFixed[] };
}> = ({ rowKey, loading, dataSource, initColumns, settings, pagination }) => {
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  const [height, setHeight] = useState('0px');

  const onResize =
    (index: number) =>
    (e: React.SyntheticEvent<Element, Event>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns];

      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };

      setColumns(newColumns);
    };

  const resizedColumns: ColumnsType<any> = columns.map((col, index) => {
    const fixedId = settings?.fixeds.findIndex((el) => el.key === col.key);
    const isFixed = fixedId !== undefined && fixedId !== -1;

    return {
      ...col,
      hidden: settings?.hiddens.includes(col.key as string),
      fixed: isFixed ? settings?.fixeds[fixedId].fixed : false,
      onHeaderCell: (column: ColumnsType<any>[number]) => ({
        width: column.width,
        onResize: onResize(index) as React.ReactEventHandler<any>,
      }),
    };
  });

  const calculateTableHeight = useCallback(() => {
    const table = document.querySelector('.ant-table')?.getBoundingClientRect();
    const height = document.body.offsetHeight;
    if (table !== undefined) {
      const tableHeight = height - table.top - 120;
      return tableHeight < TABLE_MIN_HEIGHT ? `${TABLE_MIN_HEIGHT}px` : `${tableHeight}px`;
    }
    return `${TABLE_MIN_HEIGHT}px`;
  }, []);

  useEffect(() => {
    setHeight(calculateTableHeight);
  }, [calculateTableHeight]);

  useEffect(() => {
    setColumns(initColumns);
  }, [initColumns]);

  return (
    <div className={style.wrapper}>
      <AntdTable
        bordered
        showHeader
        rowKey={rowKey}
        loading={loading}
        pagination={false}
        dataSource={dataSource}
        columns={resizedColumns}
        className={style.table}
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        scroll={{
          x: 'calc(100vw - 300px)',
          y: `calc(${height} - 64px)`,
        }}
        style={{ height, minHeight: TABLE_MIN_HEIGHT + 'px' }}
      />
      {pagination}
    </div>
  );
};

export default Table;
