// See db/schema.ts, these should be updated at some point
export interface MeasurementCaptures {
  captureId: number;
  resolution: string;
  duration: number;
  analyzed?: boolean;
  timeStamp?: Date;
}

export interface Measurements {
  avgRed: number;
  avgGreen: number;
  avgBlue: number;
  ms: number;
}

export interface MeasurementsFourier {
  captureId: number;
  id: number;
  red: number;
  green: number;
  blue: number;
  ms: number;
}
