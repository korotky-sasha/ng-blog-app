import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './core/http-interceptors';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TreeViewModule } from './tree-view/tree-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    FontAwesomeModule, // Class FontAwesomeModule is not an Angular module
    AuthModule.forRoot(),
    //
    PostsModule,
    TreeViewModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
