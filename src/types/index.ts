interface VehicleMedia {
  name?: string;
  url?: string;
}

export interface Vehicle {
  id?: string;
  modelYear?: string;
  apiUrl?: string;
  media?: VehicleMedia[];
}

interface VehicleEmissions {
  template?: string;
  value?: number;
}

interface VehicleMeta {
  passengers?: number;
  drivetrain?: string[];
  bodystyles?: string[];
  emissions?: VehicleEmissions;
}

export interface VehicleDetails {
  description?: string;
  price?: string;
  meta?: VehicleMeta;
}

export type CombinedVehicleData = Vehicle & Partial<VehicleDetails>;


export interface VehicleState {
  vehicles: CombinedVehicleData[];
  loading: boolean;
  error: string | null;
}

export interface ModalState {
  isOpen: boolean;
  vehicleData: CombinedVehicleData | null; 
}

export interface RootState {
  vehicle: VehicleState;
  modal: ModalState;
}