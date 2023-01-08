

export interface IMRDataResponse {
    MRData: IDriverTable;
}
 export interface IDriverTable {
    DriverTable?: IDriverTable;
    RaceTable?: RaceTable;
    StandingsTable?: StandingsLists;
 }

 export interface StandingsLists {
   StandingsLists: DriverStandings[];
 }

 export interface DriverStandings {
    DriverStandings?: Driver[];
 }

 export interface Driver {
    position: string;
    points: string;
    wins: string;
    Driver?: any;
 }

 export interface RaceTable {
    Races: Results[];
 }

 export interface Results {
    Results: any[];
    QualifyingResults: any[];
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
