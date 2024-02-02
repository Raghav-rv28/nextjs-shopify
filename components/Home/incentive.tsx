import { CreditCardIcon, HelpCircleIcon, PlaneIcon, ShoppingCart } from 'lucide-react';

export default function Incentive() {
  return (
    <div className="my-10 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <PlaneIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Discounted Shipp</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white">
              use coupons to get discounts over orders of $2000
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <HelpCircleIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Support 24/7</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white">Support 24 hours a day</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCardIcon className="text-gray-900dark:text-white h-6 w-6" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">100% Payment Secure</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white">We ensure secure payment</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShoppingCart className="text-gray-900dark:text-white h-6 w-6" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Fast Shopping Cart</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white">
              Securely checkout using saved user details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
