export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED';

export type TransmissionType = 'MANUAL' | 'AUTOMATIC';

export interface Vehicle {
  id: number;
  plateNumber: string;
  model: string;
  categoryId: number;
  categoryCode: string;
  transmission: TransmissionType;
  status: VehicleStatus;
  inspectionExpiryDate: string;
  isInspectionValid: boolean;
  createdAt: string;
}

export interface CreateVehicleRequest {
  plateNumber: string;
  model: string;
  categoryId: number;
  transmission: TransmissionType;
  inspectionExpiryDate: string;
}

export interface VehicleMaintenance {
  id: number;
  vehicleId: number;
  plateNumber: string;
  maintenanceDate: string;
  description: string;
  cost: number;
  performedBy?: string;
  createdAt: string;
}

export interface LogMaintenanceRequest {
  maintenanceDate: string;
  description: string;
  cost: number;
  performedBy?: string;
}
