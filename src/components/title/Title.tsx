//types
import { ISorter, TSorterOperator, TFixedOperator, ITitleSettings } from 'types/types';

//styles
import { WrapperStyled, TitleStyled } from './Title.style';

//dependencies
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';

const Title: React.FC<{
  text: string;
  column: string;
  settings?: ITitleSettings;
}> = ({ text, column, settings }) => {
  const [sort, setSort] = useState<ISorter>();
  //hiddens
  const onChangeHide = () => {
    if (!!settings?.hidden) {
      const newHiddens = [...settings.hidden.hiddens];
      const id = settings.hidden.hiddens.findIndex((el) => el === column);

      id !== -1 ? newHiddens.splice(id, 1) : newHiddens.push(column);

      settings.hidden.onChangeHiddens(newHiddens);
    }
  };

  //fixeds
  const onChangeFix = (operator: TFixedOperator = 'left') => {
    if (!!settings?.fixed) {
      const newFixeds = [...settings.fixed.fixeds];
      const id = settings.fixed.fixeds.findIndex((el) => el.key === column);

      id !== -1 ? newFixeds.splice(id, 1) : newFixeds.push({ key: column, fixed: operator });

      settings.fixed.onChangeFixeds(newFixeds);
    }
  };

  const items: MenuProps['items'] = [
    !!settings?.hidden && settings?.fixed?.fixeds.findIndex((el) => el.key === column) === -1
      ? {
          key: '1',
          label: 'Скрыть',
          onClick: onChangeHide,
        }
      : null,
    settings?.fixed?.fixeds.findIndex((el) => el.key === column) === -1
      ? {
          key: '2',
          label: 'Закрепить',
          children: [
            {
              key: '1-1',
              label: 'Слева',
              onClick: () => onChangeFix(),
            },
            {
              key: '1-2',
              label: 'Справа',
              onClick: () => onChangeFix('right'),
            },
          ],
        }
      : !!settings?.fixed
        ? {
            key: '3',
            label: 'Открепить',
            onClick: () => onChangeFix(),
          }
        : null,
  ];

  //sorters
  const onChangeSorter = (direction?: TSorterOperator) => {
    if (!!settings?.sorter) {
      const id = settings.sorter.sorters.findIndex((el) => el?.key === column);
      let newSort = [...settings.sorter.sorters];

      if (direction !== undefined) {
        sort !== undefined
          ? (newSort[id] = { ...sort, direction })
          : (newSort = [...settings.sorter.sorters, { key: column, direction }]);
      } else {
        sort !== undefined && newSort.splice(id, 1);
      }

      settings.sorter.onChangeSorters(newSort);
    }
  };

  const onClickTitle = () => {
    switch (sort?.direction) {
      case undefined:
        onChangeSorter('ASC');
        break;
      case 'ASC':
        onChangeSorter('DESC');
        break;
      case 'DESC':
        onChangeSorter(undefined);
        break;
      default:
        onChangeSorter(undefined);
        break;
    }
  };

  useEffect(() => {
    if (!!settings?.sorter) {
      setSort(
        settings.sorter.sorters[settings.sorter.sorters.findIndex((el) => el?.key === column)],
      );
    }
  }, [column, settings?.sorter]);

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <WrapperStyled>
        <TitleStyled
          className="filterTitle"
          onClick={onClickTitle}
          style={{ cursor: 'pointer', flexGrow: '1' }}
        >
          <div style={{ display: 'flex', gap: '5px' }}>
            {text}
            {!!settings?.sorter && sort?.direction === 'ASC' && <SortAscendingOutlined />}
            {!!settings?.sorter && sort?.direction === 'DESC' && <SortDescendingOutlined />}
          </div>
        </TitleStyled>
      </WrapperStyled>
    </Dropdown>
  );
};

export default Title;
