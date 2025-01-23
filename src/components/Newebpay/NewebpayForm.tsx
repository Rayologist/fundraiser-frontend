import { useEffect, useRef } from 'react';
import { NewebpayData } from '@/services/payment/types';

export function PaymentForm(props: {
  data: NewebpayData | null;
  ref: React.RefObject<HTMLFormElement>;
}) {
  const { data, ref } = props;

  if (!data) {
    return null;
  }

  return (
    <form id="newebpay" action={data.URL} method="POST" ref={ref} style={{ display: 'none' }}>
      <input
        type="hidden"
        name="MerchantID"
        value={data.MerchantID}
        readOnly
        style={{ display: 'none' }}
      />
      <input
        type="hidden"
        name="TradeInfo"
        value={data.TradeInfo}
        readOnly
        style={{ display: 'none' }}
      />
      <input
        type="hidden"
        name="TradeSha"
        value={data.TradeSha}
        readOnly
        style={{ display: 'none' }}
      />
      <input
        type="hidden"
        name="Version"
        value={data.Version}
        readOnly
        style={{ display: 'none' }}
      />
      <button type="submit" hidden>
        Submit
      </button>
    </form>
  );
}
