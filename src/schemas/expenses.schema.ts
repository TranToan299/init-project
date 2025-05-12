import * as yup from 'yup';

export const expensesSchema = yup.object().shape({
  date: yup.date()
    .typeError('Vui lòng chọn ngày hợp lệ')
    .required('Ngày chi là bắt buộc'),

  type: yup.string()
    .required('Loại chi phí là bắt buộc'),

  value: yup
    .number()
    .typeError('Số tiền phải là số')
    .required('Số tiền là bắt buộc')
    .positive('Số tiền phải lớn hơn 0'),

  amount: yup
    .number()
    .typeError('Số lượng phải là số')
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
    )
    .positive('Số lượng phải lớn hơn 0')
    .notRequired(),

  note: yup.string().notRequired(),
});
