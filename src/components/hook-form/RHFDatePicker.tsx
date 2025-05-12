// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { DatePicker, Input } from 'antd';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

interface Props {
  name: string;
  helperText?: React.ReactNode;
  label?: string ;
  isRequired?: boolean;
  [key: string]: any;
}

export default function RHFDatePicker({ name, helperText, label, isRequired, ...other }: Props) {
  const { control } = useFormContext();

  return (
   <Controller
  name={name}
  control={control}
  render={({ field: { ref, value, onChange, ...field }, fieldState: { error } }) => (
    <>
      {label ? <div>{label} {isRequired && <span className='required'>*</span>} </div> : null}
      <DatePicker
        {...field}
        ref={ref}
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date ? date.toISOString() : null)}
        status={error ? 'error' : ''}
        style={{width:"100%"}}
        {...other}
      />
      {error?.message || helperText ? (
        <div style={{ color: error ? '#ff4d4f' : '#8c8c8c', fontSize: 12, marginTop: 4 }}>
          {error?.message || helperText}
        </div>
      ) : null}
    </>
  )}
/>
  );
}
