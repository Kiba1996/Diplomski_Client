import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { AddChangeLinesComponent } from './components/add-change/add-change-lines/add-change-lines.component';

import { AddChangeStationsComponent } from './components/add-change/add-change-stations/add-change-stations.component';
import { AddChangeVehicleComponent } from './components/add-change/add-change-vehicle/add-change-vehicle.component';
import { AddChangeTimetableComponent } from './components/add-change/add-change-timetable/add-change-timetable.component';
import { BusmapsComponent } from './components/busmaps/busmaps.component';
import { BusLocationComponent } from './components/busmaps/bus-location/bus-location.component';
import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { RegAdminContComponent } from './components/register/reg-admin-cont/reg-admin-cont.component';
import { ShowTicketsComponent } from './components/show-tickets/show-tickets.component';
import { TicketValidationComponent } from './components/ticket-validation/ticket-validation.component';
import { UserNotSignedInGuard } from './guard/notSignedIn-guard';
import { UserSignedInGuard } from './guard/userSignedIn-guar';
import { CanActivateViaAuthGuard } from './guard/auth-guard';
import { CanActivateUser } from './guard/user-guard';
import { CanActivateNotification } from './guard/notification-guard';
import { ControlorGuard } from './guard/controler-guard';
import { AddChangePricelistComponent } from './components/add-change/add-change-pricelist/add-change-pricelist.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgxPayPalModule } from 'ngx-paypal';


const routes: Routes = [
  {
    path:'', 
    component:HomeComponent
  },
  {
    path:'home', 
    component:HomeComponent
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate:[UserNotSignedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[UserNotSignedInGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserSignedInGuard],
    //runGuardsAndResolvers: 'always',
    children: [
      {
        path:'edit',
        component: EditProfileComponent,
        canActivate: [UserSignedInGuard]
      }],
  },
  {
    path: "timetable",
    component: TimetableComponent
  },
  {
    path: "busmaps",
    component: BusmapsComponent
  },
  {
    path: "getLocation",
    component: BusLocationComponent
  },
  {
    path: "pricelist",
    component: PricelistComponent
  },
 
 
  {
    path: "regAdminController",
    component: RegAdminContComponent,
    canActivate:[UserNotSignedInGuard]
    
  },
  
 
  {
    path: "add_change_lines",
    component: AddChangeLinesComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "add_change_stations",
    component: AddChangeStationsComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "add_change_timetable",
    component: AddChangeTimetableComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "add_change_pricelist",
    component: AddChangePricelistComponent ,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "buy_a_ticket",
    component: BuyATicketComponent,
    canActivate: [CanActivateUser]
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [CanActivateNotification]
  },
  {
    path: "validateTicket",
    component: TicketValidationComponent,
    canActivate: [ControlorGuard]
  },
  {
    path: "add_change_vehicle",
    component: AddChangeVehicleComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "show_tickets",
    component: ShowTicketsComponent,
    canActivate: [UserSignedInGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    MenubarComponent,
    TimetableComponent,
    EditProfileComponent,
    AddChangeLinesComponent,
    AddChangeStationsComponent,
    AddChangeVehicleComponent,
    AddChangePricelistComponent,
    AddChangeTimetableComponent,
    BusmapsComponent,
    BusLocationComponent,
    BuyATicketComponent,
    NotificationsComponent,
    PricelistComponent,
    RegAdminContComponent,
    ShowTicketsComponent,
    TicketValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgmDirectionModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
    }),
    NgxPayPalModule,
  ],
  providers: [ CanActivateViaAuthGuard,
    CanActivateUser,
    UserSignedInGuard,
    CanActivateNotification,
    UserNotSignedInGuard,
    ControlorGuard,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
   // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
