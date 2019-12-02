import { Injectable, ComponentFactoryResolver, } from '@angular/core';

import { BranchComponent } from '../branch/branch.component';

@Injectable({
  providedIn: 'root'
})
export class BranchFactoryService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  public getFactory() {
    return this.componentFactoryResolver.resolveComponentFactory(BranchComponent);
  }
}
