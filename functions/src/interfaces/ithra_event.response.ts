/* Defining the interface for the data that will be returned from the API. */
export interface IthraEvent {
  id: string
  title: string
  description: string
  startDateTime: string
  endDateTime: string
  featuredImageId: string
  departmenName: string
  departmentUrl: string
  admin: string
  city: string
  location: string
}
