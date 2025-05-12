// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Input } from 'antd';

// ----------------------------------------------------------------------

interface Props {
  name: string;
  helperText?: React.ReactNode;
  label?: string ,
  isRequired?: boolean,
  [key: string]: any;
}

export default function RHFTextField({ name, helperText,label,isRequired, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
        {label && <div>{label} {isRequired && <span className='required'>*</span>}</div>}
          <Input
            ref={ref}
            {...field}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            status={error ? 'error' : ''}
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
