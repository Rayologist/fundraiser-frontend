import { IconAlertTriangleFilled, IconCircleCheckFilled, IconProgress } from '@tabler/icons-react';
import { Chip, rem } from '@mantine/core';
import { PaymentStatus as Status } from '@/libs/entities/payment.entity';

export function PaymentStatus(props: { status: Status }) {
  const { status } = props;

  if (status === Status.PENDING) {
    return (
      <Chip
        color="gray"
        variant="outline"
        icon={<IconProgress style={{ width: rem(14), height: rem(14) }} />}
        checked
      >
        處理中
      </Chip>
    );
  }

  if (status === Status.PAID) {
    return (
      <Chip
        color="teal"
        variant="outline"
        icon={
          <IconCircleCheckFilled
            style={{ width: rem(14), height: rem(14) }}
            color="var(--mantine-color-teal-9)"
          />
        }
        checked
      >
        付款成功
      </Chip>
    );
  }

  if (status === Status.FAILED) {
    return (
      <Chip
        variant="outline"
        color="red"
        icon={
          <IconAlertTriangleFilled
            style={{ width: rem(14), height: rem(14) }}
            color="var(--mantine-color-red-9)"
          />
        }
        checked
      >
        付款失敗
      </Chip>
    );
  }

  return null;
}
