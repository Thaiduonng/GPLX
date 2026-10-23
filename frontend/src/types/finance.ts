export type InvoiceStatus = 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';

export type PaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'INTERNAL_WALLET';

export interface FeeInvoice {
  id: number;
  invoiceCode: string;
  userId: number;
  studentName: string;
  categoryId: number;
  categoryCode: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
}

export interface CreateInvoiceRequest {
  studentId: number;
  categoryId: number;
  totalAmount: number;
  dueDate?: string;
}

export interface PaymentReceipt {
  id: number;
  receiptCode: string;
  invoiceId: number;
  invoiceCode: string;
  amount: number;
  paymentMethod: PaymentMethod;
  idempotencyKey: string;
  paidAt: string;
  cashierId?: number;
  cashierName: string;
  note?: string;
}

export interface RecordPaymentRequest {
  amount: number;
  paymentMethod: PaymentMethod;
  idempotencyKey: string;
  note?: string;
}
