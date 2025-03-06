export interface Patient {
    id: string;
    internalId?: string;
    iin: string;
    firstName: string;
    secondName: string;
    lastName?: string;
    birthDay: string;
    sex: string;
    numDoc: string;
  }
  
  export interface City {
    id: string;
    name: string;
  }
  
  export interface CityOffice {
    id: string;
    city: City;
    name: string;
    version?: number;
    updatedAt?: string;
    createdAt: string;
  }
  
  export enum OrderStatus {
    ORDERED = 'ORDERED',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
  }
  
  export interface Order {
    id: string;
    internalId: string;
    patient: Patient;
    totalPrice: number;
    totalCount: number,
    status: OrderStatus;
    city: City;
    cityOffice: CityOffice;
    version?: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GetAllDto {
    content: Order[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface GetAllOrdersDto {
    patientId: string;
    page: number;
    size: number;
  }