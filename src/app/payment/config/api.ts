import {environment} from '../../../environments/environment';


export const base_url = environment.production ? 'http://localhost:3500/api' : 'http://localhost:3800/api';


export const preparePhoneIdUrl      = base_url + '/public-api/preparePhone/';
export const initiatePaymentUrl     = base_url + '/public-api/paynow';
