//styles
import style from 'style/Wrapper.module.scss';

//components
import Table from 'components/table/Table';
import { RefreshButton } from 'components/refreshButton';

//config
import { getColumns, useArticleDataHandling, useArticleSettings, useArticleValues } from './config';

const Article: React.FC = () => {
  const {
    loading,
    data,
    pagination: { page, pageSize, total },
    hiddens,
    fixeds,
    sorters,
  } = useArticleValues();
  const settings = useArticleSettings(sorters, hiddens, fixeds);
  const { handleRefresh, handlePageChange, handlePageSizeChange } = useArticleDataHandling();

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
        pagination={{
          total,
          page,
          pageSize,
          onChangePage: handlePageChange,
          onChangePageSize: handlePageSizeChange,
        }}
      />
    </div>
  );
};

export default Article;
