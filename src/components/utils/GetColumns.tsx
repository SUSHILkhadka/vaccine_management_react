import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import image from '../../assets/github.png';
import '../styles/Table.css';
import { GetColumnSearchProps } from './GetColumnSearchProps';
import React from 'react';
import { IVaccine } from '../../interface/IVaccine';

export const GetColumns = (
  handleFavouriteChange: (Obj: IVaccine) => void,
  handleEdit: (Obj: IVaccine) => void,
  handleDelete: (id: number) => void
) => {
  const width = '10%';
  const columns: ColumnsType<IVaccine> = [
    {
      title: 'Photograph',
      dataIndex: 'photograph',
      key: 'photograph',
      width: width,
      render: (url: string) => {
        return Boolean(url) ? (
          <img className='img-avatar-table' src={url} alt='Loading' />
        ) : (
          <img className='img-avatar-table' src={image} alt='loading' />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: width,
      render: (text) => <a>{text}</a>,
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'Number of Doses',
      dataIndex: 'numberOfDoses',
      key: 'numberOfDoses',
      width: width,
      render: (text) => <a>{text}</a>,
      ...GetColumnSearchProps('numberOfDoses'),
    },
    {
      title: 'Release Data',
      dataIndex: 'releaseData',
      key: 'releaseData',
      width: width,
      ...GetColumnSearchProps('releaseData'),
    },

    {
      title: 'Favourite',
      dataIndex: 'favourite',
      key: 'favourite',
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
