

export interface IMRDataResponse {
    MRData: IDriverTable;
}
 export interface IDriverTable {
    DriverTable: IDriverTable;
 }
  
export interface IDriverTable {
    Drivers: IDrivers[];
    season: string;
}
  
export  interface IDrivers {
    code: string
    dateOfBirth: string;
    driverId: string;
    familyName: string;
    givenName: string;
    nationality : string;
    permanentNumber: string;
    url: string;
    year?: number;
}
