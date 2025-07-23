// src/utils/mockRazorpayApi.js

/**
 * Mocks a backend API call to create a Razorpay order.
 * This is for FRONTEND TESTING ONLY to get the Razorpay UI to open.
 * In a real application, this call MUST go to your secure backend.
 *
 * @param {number} amount - The total amount in the smallest currency unit (e.g., paise for INR).
 * @param {string} currency - The currency code (e.g., 'INR').
 * @returns {Promise<{razorpayOrder: {id: string, amount: number, currency: string}}>} A promise resolving with a mock Razorpay order.
 */
export const createMockRazorpayOrder = async (amount, currency) => {
  console.log('MOCK BACKEND: Simulating order creation...');
  return new Promise(resolve => {
    setTimeout(() => {
      // Generate a plausible-looking mock order ID
      // Razorpay order IDs start with 'order_' and are followed by 14 alphanumeric characters.
      const generateRandomId = () => {
        const chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 14; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `order_${result}`;
      };

      const mockOrderId = generateRandomId();

      resolve({
        razorpayOrder: {
          id: mockOrderId,
          amount: amount, // Use the amount passed in
          currency: currency,
          status: 'created', // Mimic Razorpay order status
        },
      });
    }, 1000); // Simulate network delay
  });
};

/**
 * Mocks a backend API call to verify a Razorpay payment.
 * This is for FRONTEND TESTING ONLY.
 * In a real application, this call MUST go to your secure backend for signature verification.
 *
 * @param {string} orderId - The Razorpay order ID.
 * @param {string} paymentId - The Razorpay payment ID.
 * @param {string} signature - The Razorpay signature.
 * @returns {Promise<{success: boolean, message: string}>} A promise resolving with a mock verification result.
 */
export const verifyMockRazorpayPayment = async (
  orderId,
  paymentId,
  signature,
) => {
  console.log('MOCK BACKEND: Simulating payment verification...');
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real backend, you'd perform a cryptographic signature verification here.
      // For this mock, we'll always return success.
      console.log('MOCK VERIFICATION DETAILS:', {
        orderId,
        paymentId,
        signature,
      });
      resolve({
        success: true,
        message: 'Payment verified successfully (mocked)!',
      });
    }, 1500); // Simulate network delay
  });
};
