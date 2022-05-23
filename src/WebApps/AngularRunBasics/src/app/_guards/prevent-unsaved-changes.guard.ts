import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(/*private confirmService: ConfirmService*/) { }
  canDeactivate(component: any): Observable<boolean> | boolean {
    if (component.editForm?.dirty) {
      return confirm("Are?");
      //return this.confirmService.confirm();// because we are at a route garud it will automaticlly subsceribe
    }
    return true;
  }
  
}
