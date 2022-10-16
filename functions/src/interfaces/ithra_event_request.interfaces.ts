/* Defining the interface for the request object. */
export interface IthraEventRequest {
  pageNo: number
  pageSize: number
  searchText: string
  sortOrder: "Asc"
}
