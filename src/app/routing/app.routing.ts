import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsagetipsComponent } from './../components/usagetips/usagetips.component';
import { TroubleshootingComponent } from './../components/troubleshooting/troubleshooting.component';


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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
