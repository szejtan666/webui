import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import {RestService} from '../../../../services/rest.service';

import {EntityTableComponent} from './entity-table.component';
import { interval } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector : 'app-entity-table-actions',
  styleUrls: ['./entity-table-actions.component.scss'], 
  templateUrl : './entity-table-actions.component.html'
})
export class EntityTableActionsComponent implements OnInit, OnChanges {

  @Input('entity') entity: EntityTableComponent & { conf: any };
  @Input('row') row: any;
  @Input('icon_name') icon_name = "more_vert";
  @Input('action') action: any;
  @Input('groups') groups = false;
  @Input('triggerType') triggerType: string = "icon";
  @Input('buttonLabel') buttonLabel: string = "Actions";


  public actions: any[];
  public showMenu = true;
  public key_prop: string;

  constructor(protected translate: TranslateService) { }

  menuActionVisible(id: string) {
    if (id === 'edit' || id === 'delete') {
      return false;
    }
    return true;
  }

  ngOnInit() {
    if (this.entity.conf.config && this.entity.conf.config.deleteMsg) {
      this.key_prop = this.entity.conf.config.deleteMsg.key_props[0];
    } else if (this.entity.filterColumns) {
      this.key_prop = this.entity.filterColumns[0].prop;
    }
    this.getActions()
  }

  ngOnChanges() {
    this.getActions()
  }
 
  getActions() {
    this.actions = this.entity.getActions(this.row);
  }
}
