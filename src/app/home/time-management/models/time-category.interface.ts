export interface TimeCategory {
  id?: string;
  name: string;
  description: string;
  isBillable: boolean;
  isActive?: boolean;
  regionId: string;
}
