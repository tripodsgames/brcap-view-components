import { NgModule, Component } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CapDateRangePickerComponent } from "./cap-dateRangePicker/cap-dateRangePicker.component";
import { AppComponent } from "./app.component";

export var routes: Routes = [{ path: "teste", component: AppComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
