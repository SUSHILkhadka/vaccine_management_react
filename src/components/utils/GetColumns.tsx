import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { imageURL } from '../../constants/common';
import { IVaccine } from '../../interface/IVaccine';
import { GetColumnSearchProps } from './GetColumnSearchProps';
import "../../styles/Image.scss"
export const GetColumns = (
  handleFavouriteChange: (Obj: IVaccine) => void,
  handleEdit: (Obj: IVaccine) => void,
  handleDelete: (id: number) => void
) => {
  const width = '40%';
  const columns: ColumnsType<IVaccine> = [
    {
      title: 'Photograph',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      width: width,
      render: (url: string) => {
        return Boolean(url) ? (
          <img className='img-avatar-table' src={url} alt='Loading' />
        ) : (
          <img className='img-avatar-table' src={imageURL} alt='loading' />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: width,
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'Number of Doses',
      dataIndex: 'numberOfDoses',
      key: 'numberOfDoses',
      width: width,
      // ...GetColumnSearchProps('numberOfDoses'),
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      render: (text) => {
        const newDatestring = text.split('T')[0];
        console.log(text, newDatestring);
        return <a>{newDatestring}</a>;
      },
      width: width,
      ...GetColumnSearchProps('releaseDate'),
    },

    {
      title: 'Mandator',
      dataIndex: 'isMandatory',
      key: 'isMandatory',
      width: width,
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
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            placement='top'
            title={'Are you sure?'}
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button className='deleteBtn'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return columns;
};
