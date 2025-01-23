import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { useShallow } from 'zustand/shallow';
import { Checkbox, Input, Stack, TextInput, useMatches } from '@mantine/core';
import { Form, useForm } from '@/components/Form';
import { useCheckoutStore } from '@/stores/checkout.store';
import { useUserStore } from '@/stores/user.store';

const schema = z
  .object({
    fullName: z.string().min(1, '必填'),
    email: z.string().email().min(1, '必填'),
    isGILMember: z.string().min(1, '必填'),
    receiptRequest: z.string().min(1, '必填'),
    receiptName: z.string(),
    taxId: z.string(),
    phoneNumber: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.receiptRequest !== 'y') {
      return;
    }

    if (!data.receiptName) {
      ctx.addIssue({
        code: 'custom',
        message: '必填',
        path: ['receiptName'],
      });
    }

    if (!data.taxId) {
      ctx.addIssue({
        code: 'custom',
        message: '必填',
        path: ['taxId'],
      });
    }
  });

export type DonorInfo = z.infer<typeof schema>;

export function useCreateForm() {
  const user = useUserStore((state) => state.user);

  const { setDonorInfo } = useCheckoutStore(
    useShallow((state) => ({ setDonorInfo: state.setDonorInfo }))
  );

  const router = useRouter();

  const w = useMatches({
    sm: '100%',
    md: '40%',
  });

  const form = useForm<DonorInfo>({
    defaultValues: {
      fullName: '',
      email: user?.email ?? '',
      isGILMember: '',
      receiptRequest: '',
      receiptName: '',
      taxId: '',
      phoneNumber: '',
    },
    schema,
    controllers: {
      fullName: {
        control: 'text-input',
        label: '姓名或機構名稱',
        withAsterisk: true,
        w,
      },
      email: {
        control: 'text-input',
        label: '電子郵件地址',
        description: '捐款通知或收據將寄送至此電子郵件地址',
        withAsterisk: true,
        w,
      },
      isGILMember: {
        control: 'radio-group',
        label: '是否為語言所所友',
        options: [
          { label: '是', value: 'y' },
          { label: '否', value: 'n' },
        ],
        withAsterisk: true,
        w,
      },
      receiptRequest: {
        control: 'radio-group',
        withAsterisk: true,
        label: '是否需要捐款收據',
        options: [
          { label: '是', value: 'y' },
          { label: '否', value: 'n' },
        ],
        w,
      },
      receiptName: {
        control: 'custom-field',
        Component: (props) => {
          const { field, error } = props;
          const [checked, setChecked] = useState(false);
          const ctx = useFormContext();

          if (ctx.watch('receiptRequest') === 'n' || ctx.watch('receiptRequest') === '') {
            return null;
          }

          return (
            <Input.Wrapper
              label="收據抬頭"
              withAsterisk
              description="若捐款收據需開立給機構，請填寫機構名稱"
              // error={error}
              w={w}
            >
              <Stack gap={5} mt={10}>
                <Checkbox
                  label="同上姓名或機構名稱"
                  checked={checked}
                  onChange={(e) => {
                    if (checked) {
                      ctx.setValue('receiptName', '');
                      setChecked(false);
                      return;
                    }

                    const fullName = ctx.getValues('fullName');
                    ctx.setValue('receiptName', fullName);

                    setChecked(true);
                  }}
                />
                <TextInput
                  {...field}
                  error={error}
                  onChange={(e) => {
                    field.onChange(e);

                    if (checked) {
                      setChecked(false);
                      return;
                    }

                    if (ctx.getValues('receiptName') === ctx.getValues('fullName')) {
                      setChecked(true);
                    }
                  }}
                />
              </Stack>
            </Input.Wrapper>
          );
        },
      },
      taxId: {
        control: 'text-input',
        label: '身分證字號或統一編號',
        withAsterisk: true,
        description: '如果需要報稅，此欄位需詳實填寫',
        Field: (props) => {
          const { watch } = props.ctx;

          if (watch('receiptRequest') === 'n' || watch('receiptRequest') === '') {
            return null;
          }

          return props.fieldComponent;
        },
        w,
      },
      phoneNumber: {
        control: 'text-input',
        label: '聯絡電話',
        description: '如有任何問題，我們將透過此電話與您聯絡',
        Field: (props) => {
          const { watch } = props.ctx;

          if (watch('receiptRequest') === 'n' || watch('receiptRequest') === '') {
            return null;
          }

          return props.fieldComponent;
        },
        w,
      },
    },
    onSubmit: async ({ data }) => {
      setDonorInfo({
        fullName: data.fullName,
        email: data.email,
        isGILMember: data.isGILMember === 'y',
        receiptRequest: data.receiptRequest === 'y',
        receiptName: data.receiptName,
        taxId: data.taxId,
        phoneNumber: data.phoneNumber,
      });
      router.push('/checkout/review');
    },
  });

  return form;
}

export function CreateDonorInfoForm(props: { id: string }) {
  const form = useCreateForm();

  return <Form form={form} id={props.id} />;
}
