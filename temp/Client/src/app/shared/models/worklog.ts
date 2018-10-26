import { WorkLogItemType } from '../enums/work-log-item-type.enum';

export interface IWorklog {
  id?: string;
  work?: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  categoryColorClass?: string;
  workLogDetails?: any[];
  enableEditWork?: boolean;
  enableEditDescription?: boolean;
  totalSpent?: number;
  internalCategoryId?: string;
  internalCategoryName?: string;
  workItem?: any;
  synergyDetail?: any;
  workLogItemType: WorkLogItemType;
  workLogItemClass?: any;
  level?: any;
}
