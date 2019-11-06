# MyNotes Angular Material Client

Basic Angular Material REST API client.

Backend service for this project: [MyNotes SpringBoot Service](https://github.com/alexshavlovsky/mynotes-springboot-service).

<p align="center">
  <img src="screenshots/01_login-page.png?raw=true" width="360"/>
  <img src="screenshots/02_sign-up-page-with-validation.png?raw=true" width="360"/>  
</p>

## Technology Stack
Component            | Technology
---                  | ---
Package manager      | NPM
JS framework         | Angular 8
Styles and templates | Angular Material 8 / Angular Flex Layout
Forms                | Angular Reactive Forms
Authentication       | JWT role based
JWT parser           | [@auth0/angular-jwt](https://github.com/auth0/angular2-jwt)
State management     | NgRx 8 (store, effects, entity)
Production packaging | Docker Engine Container, Alpine Linux, Nginx (SSL, HTTP2, API proxy)

## Build and run instructions

With Docker:
```
git clone https://github.com/alexshavlovsky/mynotes-material-client.git
cd mynotes-material-client
npm install
npm run buildprod
 
docker build --build-arg key_store_pass=spring -t mynotes-front .
&& docker run
-p 80:80 -p 443:443
--name mynotes_front
mynotes-front
```

## Screenshots

<p align="center">
  <img src="screenshots/03_notebooks-list.png?raw=true" width="280"/>
  <img src="screenshots/04_notes-list.png?raw=true" width="280"/>
  <img src="screenshots/05_note-card.png?raw=true" width="280"/>  
</p>

<p align="center">
  <img src="screenshots/06_full-text-search.png?raw=true" width="280"/>
  <img src="screenshots/09_note-menu.png?raw=true" width="280"/>
  <img src="screenshots/08_notebook-menu.png?raw=true" width="280"/>    
</p>

<p align="center">
  <img src="screenshots/07_notebook-dialog.png?raw=true" width="280"/>
  <img src="screenshots/10_note-dialog.png?raw=true" width="280"/>
  <img src="screenshots/11_confirmation_dialog.png?raw=true" width="280"/>
</p>
