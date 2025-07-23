import { bootstrap } from '@angular-architects/module-federation-tools';
import { AppModule } from './app/app.module';
import { register } from 'swiper/element/bundle';

register(); // register Swiper custom elements

bootstrap(AppModule, {
  appType: 'microfrontend',
  production: false,
  ngZoneSharing: true,
  platformSharing: true,
}).catch((err) => console.error(err));
