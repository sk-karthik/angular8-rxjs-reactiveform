import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: 'page-not-found', component: ErrorComponent },
    { path: '**', redirectTo: 'page-not-found' }
];

export const appRoutingModule = RouterModule.forRoot(routes);