import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Table } from 'antd';
import ExpensesApi from 'apis/expenses.api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { fCurrency } from 'utils/formatNumber';

import ModalCustom from 'components/modal/ModalCustom';
import ExpensesForm from 'sections/home/TableExpenses';
import { IExpenses } from '../@types/expenses';
// ----------------------------------------------------------------------

export default function HomePage() {
  const [data, setData] = useState<IExpenses[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<IExpenses | null>(null);

  const handleDelete = async (id: number | string) => {
    console.log(id);
    await ExpensesApi.delete(id);
    message.success('Xóa thành công');
    getListExpenses();
  };

  const handleEdit = async (record: IExpenses) => {
    setModalVisible(true);
    setEditingItem(record);
  };
  const columns = [
    {
      title: 'Ngày Chi (DD/MM/YYYY)',
      dataIndex: 'date',
      render: (text: any) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Loại Chi Phí',
      dataIndex: 'type',
    },
    {
      title: 'Số Tiền (vnđ)',
      dataIndex: 'value',
      render: (text: number) => fCurrency(text),
    },
    {
      title: 'Số Lượng',
      dataIndex: 'amount',
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'note',
    },
    {
      title: 'Hành Động',
      render: (_: any, record: IExpenses) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              color="primary"
              variant="text"
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              color="danger"
              variant="text"
            />
          </Space>
        );
      },
    },
  ];
  const getListExpenses = async () => {
    const { data: dataValue } = await ExpensesApi.getList();
    setData(dataValue);
    return dataValue;
  };
  useEffect(() => {
    getListExpenses();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Chi phí</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setModalVisible(true);
            setEditingItem(null);
          }}
        >
          Thêm Chi Phí
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <ModalCustom
        title={editingItem ? 'Cập nhật Chi Phí' : 'Thêm Chi Phí'}
        open={modalVisible}
        footer={null}
      >
        <ExpensesForm
          setModalVisible={setModalVisible}
          editingItem={editingItem}
          getListExpenses={getListExpenses}
        />
      </ModalCustom>
    </>
  );
}
