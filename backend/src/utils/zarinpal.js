import ZarinpalPayment from 'zarinpal-pay';
import { getConfig } from '../config/config.js';
import logger from '../config/logger.js';

export const ZarinpalService = {
    async createPaymentRequest(amount, description, callbackUrl) {
        try {
            const config = await getConfig();
            const zarinpal = new ZarinpalPayment(
                config.paymentMethods.bankGateway.zarinpal.merchantId,
                { isSandbox: config.paymentMethods.bankGateway.zarinpal.sandbox }
            );

            const paymentRequest = await zarinpal.create({
                amount: amount,
                callback_url: callbackUrl,
                description: description,
            });

            if (paymentRequest.data.code === 100) {
                return {
                    success: true,
                    paymentUrl: paymentRequest.data.link,
                    authority: paymentRequest.data.authority
                };
            } else {
                throw new Error(`Payment request failed: ${paymentRequest.data.message}`);
            }
        } catch (error) {
            logger.error('Error creating payment request:', error);
            throw error;
        }
    },

    async verifyPayment(authority, amount) {
        try {
            const config = await getConfig();
            const zarinpal = new ZarinpalPayment(
                config.paymentMethods.bankGateway.zarinpal.merchantId,
                { isSandbox: config.paymentMethods.bankGateway.zarinpal.sandbox }
            );

            const verification = await zarinpal.verify({
                authority: authority,
                amount: amount,
            });

            if (verification.data.code === 100 || verification.data.code === 101) {
                return {
                    success: true,
                    refID: verification.data.ref_id
                };
            } else {
                throw new Error(`Payment verification failed: ${verification.data.message}`);
            }
        } catch (error) {
            logger.error('Error verifying payment:', error);
            throw error;
        }
    }
}; 