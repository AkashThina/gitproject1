import { Component } from '@angular/core';
import { ProductService } from './services/sample.service';
import { FormsModule } from '@angular/forms';
import {  NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstPipe } from './Pipes/capitalize-first.pipe';


@Component({
  selector: 'app-root',
  imports: [FormsModule,RouterLink,RouterOutlet,CommonModule,CapitalizeFirstPipe], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers:[]
})
export class AppComponent {
  message : boolean | string = true 
  isLoggedIn: boolean = false; 
  userName: any = '';
  
  endURL: string = '';

  // stopmessage(){
  //   debugger
  //   this.message = false
  // }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.endURL = event.urlAfterRedirects;
      }
    });
  }
  // stopMessage(){
  //   this.message != this.message
  // }

  constructor(public cartService: ProductService,private router: Router) {}

  

  logout() {
    const isLogout=confirm("Are You Sure Want to Log out")
    if(isLogout == true){
      this.cartService.logout();
      this.router.navigate([''])
    }
  }
  deleteAccount() {
    const isDelete = confirm("Are You Sure Want to Delete Account")
    if(isDelete == true){
      const loginUser = JSON.parse(localStorage.getItem('Loginuser') || 'null'); 
      let users = JSON.parse(localStorage.getItem('users') || '[]'); 
  
      if (loginUser && users.length > 0) {
          const userIndex = users.findIndex((user: any) => user.email === loginUser.email);
          if (userIndex !== -1) {
              users.splice(userIndex, 1);
              if (users.length > 0) {
                  localStorage.setItem('users', JSON.stringify(users));
              } else {
                  localStorage.removeItem('users');
              }
              localStorage.removeItem('Loginuser');
              alert('Your account has been deleted.');
              this.cartService.isLogin = false; 
              this.userName = '';
              this.router.navigate(['']);
          } 
          else {
              alert('User not found in stored users.');
          }
      } else {
          alert('No logged-in user found.');
      }
    }
  }
  // // updateLanguage(event: Event) {
  // //   const inputElement = event.target as HTMLInputElement; // ✅ Explicitly cast the target
  // //   const lang = inputElement.value;

  // //   if (lang.length >= 2) {
  // //     (window as any).changeLanguage(lang); // ✅ Calls Google Translate function
  // //   }
  // }
  // loadGoogleTranslate() {
  //   const scriptId = 'google-translate-script';

  //   // ✅ Prevent multiple script loads
  //   if (document.getElementById(scriptId)) {
  //     this.initGoogleTranslate();
  //     return;
  //   }

  //   const script = document.createElement('script');
  //   script.id = scriptId;
  //   script.type = 'text/javascript';
  //   script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);

  //   // ✅ Explicitly define `window.googleTranslateElementInit`
  //   (window as any).googleTranslateElementInit = () => {
  //     this.initGoogleTranslate();
  //   };
  // }

  // initGoogleTranslate() {
  //   if (typeof google !== 'undefined' && google.translate) {
  //     new google.translate.TranslateElement(
  //       { pageLanguage: 'en', autoDisplay: false },
  //       'google_translate_element'
  //     );
  //   }
  // }

  // changeLanguage(lang: string) {
  //   setTimeout(() => {
  //     const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  //     if (select) {
  //       select.value = lang;
  //       select.dispatchEvent(new Event('change'));
  //     }
  //   }, 1000);
  // }
}





