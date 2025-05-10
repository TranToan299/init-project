import { Button, DatePicker, Form, Input, InputNumber, message, Modal, Space, Table } from 'antd';
import ExpensesApi from 'apis/expenses.api';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { fCurrency, fNumber } from 'utils/formatNumber';
import { IExpenses } from '../@types/expenses';
// ----------------------------------------------------------------------
export default function HomePage() {
  const [data, setData] = useState<IExpenses[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form] = Form.useForm();
  const onFinish = async (values: IExpenses) => {
    try {
      const payload = {
        ...values,
        id: values.id,
        date: values.date.format('YYYY-MM-DD'),
      };
      console.log(values.id);
      if (editingId) {
        await ExpensesApi.put(editingId, payload);
        message.success('Cập nhật thành công');
      } else {
        await ExpensesApi.post(payload);
        message.success('Thêm mới thành công');
      }
      setModalVisible(false);
      form.resetFields();
      getListExpenses();
      setEditingId(null);
    } catch {
      message.error('Lỗi khi lưu dữ liệu');
    }
  };

  const handleDelete = async (id: number | string) => {
    await ExpensesApi.delete(id);
    message.success('Xóa thành công');
    getListExpenses();
  };

  const handleEdit = async (record: IExpenses) => {
    setModalVisible(true);
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
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
  async function getListExpenses() {
    const { data: dataValue } = await ExpensesApi.getList();
    console.log(dataValue);
    setData(dataValue);
    return dataValue;
  }
  useEffect(() => {
    getListExpenses();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Chi phí</h1>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
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
      <Modal
        title={editingId ? 'Cập nhật Chi Phí' : 'Thêm Chi Phí'}
        open={modalVisible}
        onCancel={() => {
          setEditingId(null);
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="date"
            label="Ngày Chi"
            rules={[{ required: true, message: 'Vui lòng nhập ngày chi' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại Chi Phí"
            rules={[{ required: true, message: 'Vui lòng nhập chi phí' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="Số Tiền (vnđ)"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="amount" label="Số Lượng">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="note" label="Ghi Chú">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
