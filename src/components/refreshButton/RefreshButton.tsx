import { RedoOutlined } from '@ant-design/icons';
import { Space, Tooltip, Button } from 'antd';
import React from 'react';
import { BUTTON_TYPE, BUTTON_SIZE } from 'utils/constants';

export const RefreshButton = ({ handleRefresh }: { handleRefresh: () => void }) => {
  return (
    <Space>
      <Tooltip title="Обновить">
        <Button
          type={BUTTON_TYPE}
          size={BUTTON_SIZE}
          icon={<RedoOutlined />}
          onClick={handleRefresh}
        />
      </Tooltip>
    </Space>
  );
};
