
export interface DefaultResponse {
  success: boolean;
  object: any;
  status: number;
}


export interface DefaultModel {
  success: false;
  object: '';
  status: 500;
}

export interface PreparePhoneModel {
  code: string;
  phoneNo: string;
  name: string;
  service: string;
  logo: string;
  ID: number;
}
