import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsagetipsComponent } from './../components/usagetips/usagetips.component';
import { TroubleshootingComponent } from './../components/troubleshooting/troubleshooting.component';
import { AuthGuard } from './../auth-guard'; 
import { HomeComponent } from './../components/home/home.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/troubleshooting',
    pathMatch: 'full'
  },
  {
    path: 'usagetips',
    component: UsagetipsComponent
  }, 
  {
    path: 'troubleshooting',
    component: TroubleshootingComponent,
    data: {
        testData: "testData"
    }
    //canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
