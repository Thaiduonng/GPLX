import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import { Vehicle, CreateVehicleRequest, VehicleMaintenance, LogMaintenanceRequest, VehicleStatus } from '../types/fleet';

export const fleetService = {
  getAvailableVehicles: async (categoryId?: number): Promise<Vehicle[]> => {
    const params = categoryId ? { categoryId } : {};
    const response = await apiClient.get<ApiResponse<Vehicle[]>>('/api/v1/fleet/available', { params });
    return response.data.data;
  },

  getAllVehicles: async (categoryId?: number, status?: VehicleStatus): Promise<Vehicle[]> => {
    const params: Record<string, string | number> = {};
    if (categoryId) params.categoryId = categoryId;
    if (status) params.status = status;

    const response = await apiClient.get<ApiResponse<Vehicle[]>>('/api/v1/fleet', { params });
    return response.data.data;
  },

  getVehicleById: async (id: number): Promise<Vehicle> => {
    const response = await apiClient.get<ApiResponse<Vehicle>>(`/api/v1/fleet/${id}`);
    return response.data.data;
  },

  addVehicle: async (request: CreateVehicleRequest): Promise<Vehicle> => {
    const response = await apiClient.post<ApiResponse<Vehicle>>('/api/v1/fleet', request);
    return response.data.data;
  },

  updateStatus: async (id: number, status: VehicleStatus): Promise<Vehicle> => {
    const response = await apiClient.patch<ApiResponse<Vehicle>>(`/api/v1/fleet/${id}/status`, null, {
      params: { status }
    });
    return response.data.data;
  },

  logMaintenance: async (vehicleId: number, request: LogMaintenanceRequest): Promise<VehicleMaintenance> => {
    const response = await apiClient.post<ApiResponse<VehicleMaintenance>>(`/api/v1/fleet/${vehicleId}/maintenances`, request);
    return response.data.data;
  },

  getMaintenances: async (vehicleId: number): Promise<VehicleMaintenance[]> => {
    const response = await apiClient.get<ApiResponse<VehicleMaintenance[]>>(`/api/v1/fleet/${vehicleId}/maintenances`);
    return response.data.data;
  }
};
