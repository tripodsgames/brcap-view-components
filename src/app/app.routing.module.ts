import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { CapLoginComponent } from "./cap-login/cap-login.component";
import { CapLoginAdComponent } from "./cap-login-ad/cap-login-ad.component";

export const routes: Routes = [
  { path: "teste", component: AppComponent },
  { path: "login", component: CapLoginComponent },
  { path: "login-ad", component: CapLoginAdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
