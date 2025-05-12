import { yupResolver } from '@hookform/resolvers/yup';
import { Button, message } from 'antd';
import ExpensesApi from 'apis/expenses.api';
import FormProvider, { RHFTextField } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { expensesSchema } from 'schemas/expenses.schema';

type FormValuesProps = {
  id?: number | string;
  date: any;
  type: string;
  value?: number;
  amount?: number;
  note?: string;
};

interface ExpensesFormProps {
  setModalVisible: (data: boolean) => void;
  getListExpenses: () => void;
  editingItem?: FormValuesProps | null;
}

export default function ExpensesForm({
  setModalVisible,
  editingItem,
  getListExpenses,
}: ExpensesFormProps) {
  const defaultValues = {
    date: null,
    type: '',
    value: 0,
    amount: undefined,
    note: undefined,
  };
  console.log(editingItem);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(expensesSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    };
    try {
      if (editingItem && editingItem.id) {
        const payloadEdit = {
          ...payload,
          id: editingItem.id,
        };
        await ExpensesApi.put(editingItem.id, payloadEdit);
        message.success('Cập nhật thành công');
      } else {
        await ExpensesApi.post(payload);
        message.success('Thêm mới thành công');
      }
      setModalVisible(false);
      await getListExpenses();
    } catch {
      message.error('Lỗi khi lưu dữ liệu');
    }
  };
  useEffect(() => {
    if (!editingItem) {
      reset(defaultValues);
      return;
    }
    reset({
      ...editingItem,
      date: dayjs(editingItem.date),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingItem]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFDatePicker name="date" label="Ngày chi" isRequired />
      <RHFTextField name="type" label="Loại chi phí" isRequired />
      <RHFTextField name="value" label="Số tiền" isRequired />
      <RHFTextField name="amount" label="Số lượng" />
      <RHFTextField name="note" label="Ghi chú" />
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Button
          color="default"
          variant="outlined"
          onClick={() => {
            setModalVisible(false);
            reset(defaultValues);
          }}
        >
          Hủy
        </Button>
        <Button color="primary" variant="solid" htmlType="submit">
          Lưu
        </Button>
      </div>
    </FormProvider>
  );
}
