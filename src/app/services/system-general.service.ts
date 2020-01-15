

import {Injectable, EventEmitter} from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs/Rx';

import {RestService} from './rest.service';
import {WebSocketService} from './ws.service';

@Injectable({ providedIn: 'root'})
export class SystemGeneralService {

  protected certificateList: string = 'certificate.query';
  protected caList: string = 'certificateauthority.query';

  constructor(protected rest: RestService, protected ws: WebSocketService) {};

  getCA() { return this.ws.call(this.caList, []); }

  getCertificates() { return this.ws.call(this.certificateList); }

  getUnsignedCertificates() {
	  return this.ws.call(this.certificateList, [[["CSR", "!=", null]]]);
  }

  getUnsignedCAs() {
    return this.ws.call(this.caList, [[["privatekey", "!=", null]]]);
  }

  getIPChoices() {
    return this.ws.call('notifier.choices', [ 'IPChoices', [ true, false ] ]);
  }

  getSysInfo() {
    return this.ws.call('system.info', []);
  }

  ipChoicesv4() {
    return this.ws.call("system.general.ui_address_choices", []).pipe(
      map(response =>
        Object.keys(response || {}).map(key => ({
          label: response[key],
          value: response[key]
        }))
      )
    );
  }

  ipChoicesv6() {
    return this.ws.call("system.general.ui_v6address_choices", []).pipe(
      map(response =>
        Object.keys(response || {}).map(key => ({
          label: response[key],
          value: response[key]
        }))
      )
    );
  }

  updateRunning = new EventEmitter<string>();
  updateRunningNoticeSent = new EventEmitter<string>();
}
