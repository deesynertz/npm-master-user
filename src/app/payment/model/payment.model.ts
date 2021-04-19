
export interface defaultResponse {
  success:boolean;
  object:any;
  status: number;
}


export interface defaultModel {
  success: false;
  object: '';
  status: 500;
}

export interface preparePhoneModel {
  code: string,
  phoneNo: string
  name: string,
  ID: number
}
