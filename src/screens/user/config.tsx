import { ColumnsType } from 'antd/es/table';
import { UseDataHandlingProps, useDataHandling } from 'components/table/useDataHandling';
import { useSettings } from 'components/table/useSettings';
import { useValues } from 'components/table/useValues';
import Title from 'components/title/Title';
import { useAppDispatch } from 'store/hooks';
import { RootState } from 'store/store';
import { getUser } from 'store/user/middleware';
import { setFixeds, setHiddens, setPage, setPageSize, setSorters } from 'store/user/slice';
import { IFixed, ISorter, ITitleSettings } from 'types/types';
import { IUserItem } from 'types/user.type';

export const getColumns = (settings: ITitleSettings): ColumnsType<IUserItem> => [
  {
    key: 'name',
    width: 200,
    dataIndex: 'name',
    title: <Title text="Название" column="name" />,
  },
  {
    key: 'surname',
    width: 200,
    dataIndex: 'surname',
    title: <Title text="Фамилия" column="surname" />,
  },
  {
    key: 'patronymic',
    width: 200,
    dataIndex: 'patronymic',
    title: <Title text="Отчество" column="patronymic" />,
  },
  {
    key: 'email',
    width: 200,
    dataIndex: 'email',
    title: <Title text="E-mail" column="email" />,
  },
  {
    key: 'phone',
    width: 200,
    dataIndex: 'phone',
    title: <Title text="Телефон" column="phone" />,
  },
];

export const useUserDataHandling = (): UseDataHandlingProps => {
  const dispatch = useAppDispatch();

  const { getItems, resetFilters, handleRefresh, handlePageChange, handlePageSizeChange } =
    useDataHandling(() => dispatch(getUser()), {
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

export function useUserValues() {
  return useValues((state: RootState) => state.user);
}

export const useUserSettings = (sorters: ISorter[], hiddens: string[], fixeds: IFixed[]) => {
  return useSettings(sorters, hiddens, fixeds, {
    setSorters,
    setHiddens,
    setFixeds,
  });
};
