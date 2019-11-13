import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './auth/token.interceptor';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot(),
    PostsModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
