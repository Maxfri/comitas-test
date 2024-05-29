//styles
import style from 'style/Wrapper.module.scss';

//components
import Table from 'components/table/Table';
import { RefreshButton } from 'components/refreshButton';
import Pagination from 'components/pagination/Pagination';

//config
import { getColumns, useUserDataHandling, useUserSettings, useUserValues } from './config';

const User: React.FC = () => {
  const {
    loading,
    data,
    pagination: { page, pageSize, total },
    hiddens,
    fixeds,
    sorters,
  } = useUserValues();
  const settings = useUserSettings(sorters, hiddens, fixeds);
  const { handleRefresh, handlePageChange, handlePageSizeChange } = useUserDataHandling();

  const columns = getColumns(settings);

  return (
    <div className={style.wrapper__table}>
      <RefreshButton handleRefresh={handleRefresh} />
      <Table
        rowKey="id"
        loading={loading}
        dataSource={data}
        initColumns={columns}
        settings={{ hiddens, fixeds }}
        pagination={
          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onChangePage={handlePageChange}
            onChangePageSize={handlePageSizeChange}
          />
        }
      />
    </div>
  );
};

export default User;
