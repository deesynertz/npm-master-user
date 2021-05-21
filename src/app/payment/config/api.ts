import {environment} from '../../../environments/environment';

export const baseUrl = environment.production ? 'http://localhost:3500/api' : 'http://localhost:3800/api';

export const preparePhoneIdUrl      = baseUrl + '/public-api/preparePhone/';
export const initiatePaymentUrl     = baseUrl + '/public-api/pay-now';
