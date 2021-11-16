# AdministratorApp

+ always use camelCase
+ ES6, ES7 Javascript standards
+ check [angular style](https://angular.io/guide/styleguide) guide if you want more details
+ all code must be in english! just path of routes and another stuff in spanish (you will recieve instructions)

### Information Important

1. [Project structure](#projectstructure)
2. [Routing](#routing)
3. [LazyLoad](#lazyload)
4. [Services](#services)
5. [Componentes](#components)
6. [Interfaces](#interfaces)
7. [Directives](#directives)
8. [Pipes](#pipes)
9. [Internationalization - I18n](#i18n)
10. [Enviroments for building process](#enviroments)
11. [Style](#style)
12. [Assets](#assets)
13. [Interceptor](#interceptor)
14. [Mock data](#mockdata)
15. [ngrx structure](#ngrxstructure)
16. [testing ngrx](#ngrxtesting)

## Project Structure
<a name="projectstructure"/>

The structure of this project defined by folders with specific purpose

```
├── ...                  
├── src                      # angular application
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss 
│         ├── _mixins.scss      # mixing scss 
│         ├── _variable.sccs    # global variables for styles     
│      ├── jest-config          # testing configuration for jest 
│   └── ...                     # etc.
└──...
```

## Routing
<a name="routing"/>
We normally use 2 lvls of routing, the firts one is at the same lvl of `app.module.ts`, this is our main routing and inside we delegate routing to views module using lazyload approach.

```javascript
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [LogedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    /* canActivate: [LogedGuard] */
  },
  {
    path: 'example-route',
    loadChildren: () => import('./route/name.module').then(m => m.NameModule),
    data: { title: 'title module', resource: 'control', type: 'control' },
    /* canActivate: [LoginGuard] */
  },
  .
  .
  .
  .
  .
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];
```

the most important about this is the way we make the lazyload and stuff we send into each view.
```javascript
{
    path: 'opciones',
    loadChildren: () => import('./route/name.module').then(m => m.NameModule),
    data: { title: 'Opciones', resource: 'options', type: 'options', url: 'base' },
    /* canActivate: [LoginGuard] */
}
```

+ **path** is full route of the view.
+ **loadChildren** with full path, do not use relative.
+ **data** title is basic the name of the view, resource and type are used for interaction inside components, templates and services operations and url is data for ` breadcrumb component ` (use this url for construct the route for final users).

Inside each view existing in the application we define a secondary route handle for child rutes, just follow the path define in loadChildren parameter. Remenber check `_nav.ts` because is related to this file.

## LazyLoad
<a name="lazyload"/>

We use 2 lvls of routing, for this example we are going to use `centro-control`view 

```javascript
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [LogedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    /* canActivate: [LogedGuard] */
  },
  {
    path: 'example-route',
    loadChildren: () => import('./route/name.module').then(m => m.NameModule)
    data: { title: 'Centro de control', resource: 'control', type: 'control' },
    /* canActivate: [LoginGuard] */
  },
  .
  .
  .
  .
  .
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];
```
now we need to go inside view folder with `center-control` with this structure

```
├── view                                    
│  ├── component-example               # view folder with route 'centro-control'
│     ├── component-exmaple             
│         ├── html                      # html file of specific component 
│         ├── spec                      # spec file of specific component
│         ├── scss                      # scss file of specific component
│         ├── ts                        # ts file of specific component
│      ├── component-children-route     # Main files of ang app
│         ├── html                      # html file of specific component 
│         ├── spec                      # spec file of specific component
│         ├── scss                      # scss file of specific component
│         ├── ts                        # ts file of specific component
├── routing.module.ts                   # here we handle the lazyload and all routes of this view
├── .module.ts                          # the module for import routing, components or another modules we are going to use
│   └── ...                            # etc.
└──...
```

the sctruture of routing inside is

```javascript
const routes: Routes = [
  {
    path: '',
    component: SomeComponentBase
  },
  {
    path: ':id/detalles',
    component: SomeChildComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterControlRoutingModule { }
```
+ base path is always is empty
+ the rest of the routes use the base route in main `app-routing.module.ts` with new routes inside child

## Services
<a name="services"/>

The most important here is make the request to API without apply map or another methods based in js

```
├── ...
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│           ├── serviceFolder   # view defined into routing module
│             ├── <name>.service.ts
│             ├── <name>.service.spec.ts
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss 
│      ├── jest-config          # jest configuration files
│   └── ...                     # etc.
└──...
```
Use observables! we don't apply map or another high order functions inside the service, we manipulate data inside view, components, etc

```javascript
public getExemple( id: number, resource: string ): Observable<any> {
    return this.http.get(`${environment.url}/${resource}/${id}`)
               .pipe(catchError(this.handleError));
  }
```
+ checkout about behaviors from rxjs!

## Components
<a name="components"/>

The most import for creation of componentes is:
+ the always have some inputs,output or boths (depends on the solution).
+ subscribe method direct from service.
+ Apply javascript high order function for handle data (map, foreach, filter, reduce, rxjs operators, etc).
+ the style of component always is using .scss combine angular material and clases define into style folder or into `style.sccs`.
+ the name of the component must be descriptive and neutral.
+ each component should be the most dynamic possible.
+ Use flexbox, css grid and another stuff into .scss
+ Avoid use inline css into html file
+ the methods inside component must be verbose enought and easy to understand

## Interfaces
<a name="interfaces"/>

We define interfaces for more control into application and we always create a folder for each interface use the `export` statement. if this folder doesn't exist create one

```
├── ...
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│           ├── <name>   
│             ├── <name>.interface.ts
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

one example of interface is: 

```javascript
export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    minlength?: number;
    required?: boolean;
    disabled?: boolean;
    typeAttribute?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
}
```

## Directives
<a name="directives"/>

We define a `directives.module.ts` for import all directives and reuse in any place. if this folder doesn't exist create one

```
├── ...
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│           ├── <name>   
│             ├── <name>.directive.ts
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

## Pipes
<a name="pipes"/>

We define a `pipes.module.ts` for import all directives and reuse in any place. if this folder doesn't exist create one

```
├── ...
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│           ├── <name>   
│             ├── <name>.pipe.ts
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

## Internazionalization - I18n
<a name="i18n"/>

```
├── ...
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json
│           ├── i18n   
│             ├── es.json       # support all spanish texts, labels, etc
│             ├── en.json       # support all english texts, labels, etc
│      └── ...                     # etc.
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

if you add a new view into module you must add the requirements for use internationalization with [ngx-traslate](https://github.com/ngx-translate/core)

Remenber imports necessary stuff, and add this into imports array in this way:
```javascript
TranslateModule.forChild({
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    },
      isolate: false
  }),
```

and at this one at the end of the module, after export class statement

```javascript
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
```

## Enviroments
<a name="enviroments"/>

We define 3 files for this: production, qa and development

 Production for build you are going to use this file `npm run build-prod`

```javascript
export const environment = {
  production: true,
  url: 'http://x.x.x.x:5000/api/',
};
```

qa for build you are going to use this file `npm run build-qa`

```javascript
export const environment = {
    production: false,
    environmentName: 'qa',
    url: 'http://x.x.x.x:5000/api/',
};
```

development for build you are going to use this file `npm run build-development`

```javascript
export const environment = {
    production: false,
    environmentName: 'development',
    url: 'http://x.x.x.x:5000/api/',
};
```


## Style
<a name="style"/>

+ Define clear css, scss or sass implementation.
+ create verbose clases, ids, selectors.
+ Remenber use flexbox, css grid, or both.
+ avoid to use position:  absolute property (just necesary cases).
+ remenber use mixin based on flexbox, and if u need create new one go head.
+ text better setup usin em units.
+ use viewport units for layaouts (vw, vh, vhmax, vwmax).
+ use colors just in hexadecimal representation
+ check flexlayout implementation used into main content on our application. [Documentation](https://github.com/angular/flex-layout)

## Assets
<a name="assets"/>

Inside this folder exist imgs, icons, js and another files
+ Try to use png, or svg insted jpg or another format
+ use dynamic routes for apply or use all assets

## Interceptor
<a name="interceptor"/>

This is triggered just for all request and is combinend with loading component. check it, if you need get more deep

## mock data
<a name="mockdata"/>

this exist into `_mock-datas.ts`, if you need use or check some formats this is the file!!

## Ngrx Structure
<a name="ngrxstructure"/>

The structure of ngrx elements in this project defined by folders with specific purpose and each file (action, reducer, selector, effects) should have .spect file for testing it

```
├── ...                  
├── src                      # angular application
│      ├── app                   
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│           ├── viewName        # view name module
│             ├── store         # folder from ngrx boilerplate
│               ├── actions     # folder from ngrx actions
│               ├── reducers    # folder from ngrx reducer
│               ├── selectors   # folder from ngrx reducer
│               ├── facade      # facade software pattern
│               ├── effects     # folder from ngrx boilerplate
│         ├── _mock-datas.ts    # all definitions of data mock is here  
│      ├── jest-config          # testing configuration for jest 
│   └── ...                     # etc.
└──...
```

You can have this folder structure callend store in whatever place you needed, if you need to use ngrx elements just use it just remenber be clean!

## Testing Ngrx
<a name="ngrxtesting"/>

In this section you should have some advices for test actions, reducers,selectors and effects from ngrx. Remenber you always can create your own logic in your test just be clear when you wrote those tests. 

You can read those articles for check some logic or flow for create all ngrx tests:
- [testing using karma](https://christianlydemann.com/the-complete-guide-to-ngrx-testing/)
- [testing using jest](https://itnext.io/ngrx-store-testing-cheat-sheet-59e069eb47c)

# Testing actions

  Try to focus on just test each action separately, some advices from  [testing actions ngrx](https://ultimatecourses.com/blog/ngrx-store-testing-actions), the examples here are made with old ngrx version so just focus on tests.

  more info on this examples in `customers.actions.spec.ts`

```javascript
it('should return an action for loadCustomersSuccess', () => {
  // load data from actions 
  const payloadCustomers: Customer[] = customers;

  // call you actions with params define in your specif state, remenber on you store
  const action = fromCustomersActions.loadCustomersSuccess({ customers: payloadCustomers});

  // we know each action have a type, so we can check if the type we are going to process in this case is sucess loadCustomersSuccess
  expect(action.type).toBe(fromCustomersActions.CustomersActions.loadCustomersSuccess);
});
```

# Testing reducer

  Try to focus on just test each reducer function separately, some advices from [testing reducers ngrx](https://ultimatecourses.com/blog/ngrx-store-testing-reducers), the examples here are made with old ngrx version so just focus on tests.

  more info on this examples in `customers.reducer.spec.ts`. Notice in this approach we use expect and done together.

```javascript
it('should apply reducer loadCustomersSuccess into state', (done) => {
  // create initialCustomerState, this info is in your own reducer file or should be
  const actionInitial = {} as any;
  const initialCustomerState = fromCustomerReducer.CustomerAppReducer(fromCustomerReducer.initialState, actionInitial);
  
  // define payload for action you are going to test
  const payloadCustomers: Customer[] = customers;

  // now you must remenber you need add new actionn to pass into reducer for change state!
  const newAction = fromCustomersActions.loadCustomersSuccess({ customers: payloadCustomers});
  const newState = fromCustomerReducer.customerReducer(initialCustomerState, newAction);

  // finally whe must have something new in our state if actions finish successfully
  expect(newState.customers).toEqual(payloadCustomers);
  done();
});
```

# Testing selectors

  Try to focus on just test each selector separately, some advices from [testing selectors ngrx](https://timdeschryver.dev/blog/how-i-test-my-ngrx-selectors), the examples here are made with old ngrx version so just focus on tests.

  more info on this examples in `customers.selectors.spec.ts`. Notice in this approach we use expect and done together.

```javascript
const createCustomerAppState = ({
  customers = [
    {
      id: 1,
      name: 'Admin Chile',
      country: 'CHL',
      taxInternationalIdentifier: '26260462-4',
      address: 'Santiago',
      legalRepresentative: 'Yamil Ferreira',
      email: 'contactoadminchile@gmail.com',
      primaryPhone: '56945454544',
      secondaryPhone: '569454554',
      areas: [
          ''
      ],
      configurationId: 1,
      configuration: {
          id: 1,
          modules: {},
          logo: 'https://domain-test.com',
          logoMobile: 'https://domain-test.com',
          language: 'ES',
          mainColor: '#FFFFFF',
          secondaryColor: '#000000',
          slogan: 'Slogan Test'
      }
  },
  {
      id: 2,
      name: 'customer test 1',
      country: 'chl',
      taxInternationalIdentifier: '111111111',
      address: 'address',
      legalRepresentative: 'test',
      email: 'customearTest1@gmail.com',
      primaryPhone: '56993167551',
      secondaryPhone: '43434',
      areas: [
          'retail'
      ],
      configurationId: 2,
      configuration: {
          id: 2,
          modules: {
              adm: 'administration',
              customers: 'customers'
          },
          logo: 'https://www.test.com',
          logoMobile: 'https://www.test-mobile.com',
          language: 'es',
          mainColor: '211',
          secondaryColor: '2112',
          slogan: 'slong customer test 1'
      }
  }]
} = {} ) => ({
  customers: {
    customers,
    error: undefined
  }
});

it('should select all customers from Store', () => {
  // focus on factory function approach for recreate state
  const fakeStore = createCustomerAppState();

  // apply your specific selector from yours imports
  const selector = fromCustomerSelectors.selectCustomers(fakeStore);

  // check if you have slice of store you expect to have
  expect(selector).toEqual(fakeStore.customers.customers);
});
```

For test selectors you have severals approach you must check the articles.

# Testing reducer

  Try to focus on just test each reducer function separately, some advices from [testing reducers ngrx](https://ultimatecourses.com/blog/ngrx-store-testing-reducers), the examples here are made with old ngrx version so just focus on tests.

  more info on this examples in `customers.reducer.spec.ts`. Notice in this approach we use expect and done together.

```javascript
it('should apply reducer loadCustomersSuccess into state', (done) => {
  // create initialCustomerState, this info is in your own reducer file or should be
  const actionInitial = {} as any;
  const initialCustomerState = fromCustomerReducer.CustomerAppReducer(fromCustomerReducer.initialState, actionInitial);
  
  // define payload for action you are going to test
  const payloadCustomers: Customer[] = customers;

  // now you must remenber you need add new actionn to pass into reducer for change state!
  const newAction = fromCustomersActions.loadCustomersSuccess({ customers: payloadCustomers});
  const newState = fromCustomerReducer.customerReducer(initialCustomerState, newAction);

  // finally whe must have something new in our state if actions finish successfully
  expect(newState.customers).toEqual(payloadCustomers);
  done();
});
```

# Testing effects

  Try to focus on just test each effect separately, some advices from:
  + [five forms or more to test ngrx effectsfive forms or more to test](ngrx effects](https://dev.to/jdpearce/how-to-test-five-common-ngrx-effect-patterns-26cb)
  + [ngrx testing ng conf zurich](https://www.youtube.com/watch?v=AYBHKoiozhg)
  + [testing effects](https://medium.com/@inceptiondeveloper/ngrx-effects-and-testing-them-using-jest-a7120c9bca4f)

  more info on this examples in `customer.effects.spec.ts`. the must recomended way to test effects is using marbles (rxjx marbles, jest-marbles or yasmine-marbles) but that depends on you.

  in this example you are going to see observable approach, maybe for this time is clean but in another cases is more hard.

```javascript
it('should call when getAllCustomers and it works call loadCustomersSuccess', () => {
  // trigger your firts actions
  const action = fromCustomerActions.loadCustomers();
  
  // focus on the service and function is going to execute 
  jest.spyOn(customerService, 'getAllCustomers');

  // create observable with your specif action type
  actions$ = of({ type: action });

  // you are starting to subscribe into effect funnction and check action type because you expect 
  // after success or failure request apply specific actions.
  // you can check if the spy function is call as well 
  // (if you have doubth about spy check jest documentation or key concepts are spy, jest.fn, mock   functionn for testing, etc)
  customerEffects.loadCustomers$.subscribe( () => {
    expect(action.type).toBe(fromCustomerActions.loadCustomersSuccess);
    expect(customerService.getAllCustomers).toHaveBeenCalled();
  });
});
```

For test effects you have severals approach you must check the articles.
