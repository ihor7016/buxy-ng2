import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private router: Router, private _firebaseAuth: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._firebaseAuth.authState.map(item => {
      if (item) {
        return true;
      } else {
        this.router.navigate([""]);
        return false;
      }
    });
  }
}
