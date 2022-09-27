import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { imageURL } from '../../constants/common';
import { IVaccine } from '../../interface/IVaccine';
import '../../styles/Image.scss';
import { GetColumnSearchProps } from './GetColumnSearchProps';
export const GetColumns = (
  handleFavouriteChange: (Obj: IVaccine) => void,
  handleEdit: (Obj: IVaccine) => void,
  handleDelete: (id: number) => void
) => {
  const width = 20;
  const widthPer = '20%';
  const columns: ColumnsType<IVaccine> = [
    {
      title: 'Photograph',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      align: 'center',
      width: 20,
      render: (url: string) => {
        return (
          <img
            className='img-avatar-table'
            src={Boolean(url) ? url : imageURL}
            alt='Loading'
          />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: widthPer,
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'No. of Doses',
      dataIndex: 'numberOfDoses',
      key: 'numberOfDoses',
      align: 'center',
      width: widthPer,
      ...GetColumnSearchProps('numberOfDoses'),
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      align: 'center',
      width: widthPer,
      ...GetColumnSearchProps('releaseDate'),
      render: (text) => {
        const newDatestring = text.split('T')[0];
        return <div>{newDatestring}</div>;
      },

    },

    {
      title: 'Mandatory',
      dataIndex: 'isMandatory',
      key: 'isMandatory',
      align: 'center',
      width: widthPer,
      render: (text: boolean, contact) => {
        return (
          <div
            className='table-favourite'
            onClick={() => handleFavouriteChange(contact)}
          >
            {!text ? (
              <StarOutlined />
            ) : (
              <StarFilled style={{ color: 'firebrick' }} />
            )}
          </div>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      width: widthPer,
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            className='button button--edit'
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            placement='top'
            title={'Are you sure?'}
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button className='button button--delete'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return columns;
};
