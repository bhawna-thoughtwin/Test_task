export type SortDirection = "asc" | "desc";
 export type NavbarProps = {
  searchText: string;
  onSearch: (value: string) => void;
  onSortChange: (value: SortDirection) => void;
  sortDirection: SortDirection;
  totalUsers: number;
};