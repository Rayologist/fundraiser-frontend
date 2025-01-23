import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  return redirect('/checkout/cart');
}
