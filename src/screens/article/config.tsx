// columns.js

import { Checkbox } from 'antd';
import Title from 'components/title/Title';
import type { ColumnsType } from 'antd/es/table';
import { IArticleItem } from 'types/article.type';

import { setArrayInTable, setDateInTable } from 'utils/formats';
import { IFixed, ISorter, ITitleSettings } from 'types/types';
import { UseDataHandlingProps, useDataHandling } from 'components/table/useDataHandling';
import { setFixeds, setHiddens, setPage, setPageSize, setSorters } from 'store/article/slice';
import { getArticle } from 'store/article/middleware';
import { useAppDispatch } from 'store/hooks';
import { useSettings } from 'components/table/useSettings';
import { useValues } from 'components/table/useValues';
import { RootState } from 'store/store';

export const getColumns = (settings: ITitleSettings): ColumnsType<IArticleItem> => [
  {
    key: 'number',
    width: 200,
    dataIndex: 'number',
    title: <Title text="Номер" column="number" settings={settings} />,
  },
  {
    key: 'name',
    width: 200,
    dataIndex: 'name',
    title: <Title text="Название" column="name" settings={settings} />,
  },
  {
    key: 'expirationTime',
    width: 200,
    dataIndex: 'expirationTime',
    title: <Title text="Срок годности" column="expirationTime" settings={settings} />,
  },
  {
    key: 'gtin',
    width: 200,
    dataIndex: 'gtin',
    title: <Title text="GTIN" column="gtin" settings={settings} />,
  },
  {
    key: 'groups',
    width: 200,
    dataIndex: 'groups',
    title: <Title text="Артикульные группы" column="groups" settings={settings} />,
    render: setArrayInTable,
  },
  {
    key: 'unitOfMeasure',
    width: 200,
    dataIndex: 'unitOfMeasure',
    title: <Title text="Единица измерения" column="unitOfMeasure" settings={settings} />,
  },
  {
    key: 'owner',
    width: 200,
    dataIndex: 'owner',
    title: <Title text="Владелец" column="owner" settings={settings} />,
  },
  {
    key: 'length',
    width: 200,
    dataIndex: 'dimension',
    title: <Title text="Длина" column="length" settings={settings} />,
    render: (data) => data.length,
  },
  {
    key: 'width',
    width: 200,
    dataIndex: 'dimension',
    title: <Title text="Ширина" column="width" settings={settings} />,
    render: (data) => data.width,
  },
  {
    key: 'height',
    width: 200,
    dataIndex: 'dimension',
    title: <Title text="Высота" column="height" settings={settings} />,
    render: (data) => data.height,
  },
  {
    key: 'accountingBySeries',
    width: 200,
    align: 'center',
    dataIndex: 'accountingBySeries',
    title: <Title text="Cерийный номер" column="accountingBySeries" settings={settings} />,
    render: (data) => <Checkbox checked={data} />,
  },
  {
    key: 'accountingByQuantLot',
    width: 200,
    align: 'center',
    dataIndex: 'accountingByQuantLot',
    title: <Title text="Партия" column="accountingByQuantLot" settings={settings} />,
    render: (data) => <Checkbox checked={data} />,
  },
  {
    key: 'createDate',
    width: 200,
    dataIndex: 'createDate',
    title: <Title text="Дата создания" column="createDate" settings={settings} />,
    render: setDateInTable,
  },
  {
    key: 'updateDate',
    width: 200,
    dataIndex: 'updateDate',
    title: <Title text="Дата изменения" column="updateDate" settings={settings} />,
    render: setDateInTable,
  },
];

export const useArticleSettings = (sorters: ISorter[], hiddens: string[], fixeds: IFixed[]) => {
  return useSettings(sorters, hiddens, fixeds, {
    setSorters,
    setHiddens,
    setFixeds,
  });
};

export function useArticleValues() {
  return useValues((state: RootState) => state.article);
}

export const useArticleDataHandling = (): UseDataHandlingProps<IArticleItem> => {
  const dispatch = useAppDispatch();

  const { getItems, resetFilters, handleRefresh, handlePageChange, handlePageSizeChange } =
    useDataHandling<IArticleItem>(() => dispatch(getArticle()), {
      setSorters,
      setHiddens,
      setFixeds,
      setPage,
      setPageSize,
    });

  return {
    getItems,
    resetFilters,
    handleRefresh,
    handlePageChange,
    handlePageSizeChange,
  };
};
