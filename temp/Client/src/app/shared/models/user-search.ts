export interface IUserSearch {
  page: number;
  pageSize: number;
  searchText?: string;
  sortBy?: string;
  orderByAscending?: boolean;
  isExternalUser?: boolean;
}
