import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import { FeeInvoice, CreateInvoiceRequest, PaymentReceipt, RecordPaymentRequest, InvoiceStatus } from '../types/finance';

export const financeService = {
  getMyInvoices: async (): Promise<FeeInvoice[]> => {
    const response = await apiClient.get<ApiResponse<FeeInvoice[]>>('/api/v1/finance/invoices/my');
    return response.data.data;
  },

  getAllInvoices: async (status?: InvoiceStatus): Promise<FeeInvoice[]> => {
    const params = status ? { status } : {};
    const response = await apiClient.get<ApiResponse<FeeInvoice[]>>('/api/v1/finance/invoices', { params });
    return response.data.data;
  },

  getInvoiceById: async (id: number): Promise<FeeInvoice> => {
    const response = await apiClient.get<ApiResponse<FeeInvoice>>(`/api/v1/finance/invoices/${id}`);
    return response.data.data;
  },

  createInvoice: async (request: CreateInvoiceRequest): Promise<FeeInvoice> => {
    const response = await apiClient.post<ApiResponse<FeeInvoice>>('/api/v1/finance/invoices', request);
    return response.data.data;
  },

  payInvoice: async (invoiceId: number, request: RecordPaymentRequest): Promise<PaymentReceipt> => {
    const response = await apiClient.post<ApiResponse<PaymentReceipt>>(`/api/v1/finance/invoices/${invoiceId}/pay`, request);
    return response.data.data;
  },

  getReceiptsByInvoice: async (invoiceId: number): Promise<PaymentReceipt[]> => {
    const response = await apiClient.get<ApiResponse<PaymentReceipt[]>>(`/api/v1/finance/invoices/${invoiceId}/receipts`);
    return response.data.data;
  }
};
