# To run the app: 
	:~/chat-webapp$ live-server --open=app

# Chat Webapp 

This is a simple chat web application. I started this as a hackathon project and using it for mostly learning purpose.

### What is the UX?

Below is a snaphot of the Chat WebApp.

<br/>

![chat-webapp-1.0](https://s3-eu-west-1.amazonaws.com/uploads-eu.hipchat.com/122816/1382585/1GSENuZKZ2uYB8U/upload.png)

![chat-webapp-1.0](https://s3-eu-west-1.amazonaws.com/uploads-eu.hipchat.com/122816/1382585/djTjxNERIKQvH26/upload.png)


<br/>

This Starter app demonstrates how:

*  Angular Material `layout` and `flex` options can easily configure HTML containers
*  Angular Material components `<md-toolbar>`, `<md-sidenav>`, `<md-icon>` can be quickly used
*  Custom controllers can use and show `<md-bottomsheet>` with HTML templates
*  Custom controller can easily, programmatically open & close the SideNav component.
*  Responsive breakpoints and `$mdMedia` are used
*  Theming can be altered/configured using `$mdThemingProvider`
*  ARIA features are supported by Angular Material and warnings can be used to improve accessibility.

### Tutorials

The repository contains both ES5 and ES6 versions of the application. Traditional development with ES5 standards and solutions are presented here by default. Tutorials are included: step-by-step instructions that clearly demonstrate how the Starter application can be created in minutes. 

> These tutorials will be presented live, on-stage at **ng-conf 2015, Utah**.

Developers should checkout the following repository branches for:

* Branch [**Starter - ES5 Tutorials**](https://github.com/angular/material-start/tree/es5-tutorial): for  ES5 Tutorial steps & development process.
* Branch [**Starter - ES6 Tutorials**](https://github.com/angular/material-start/tree/es6-tutorial): for  ES6 Tutorial steps & development process.
* Branch [**Starter - ES6**](https://github.com/angular/material-start/tree/es6): for example implementation of Angular Material 1.x (and Angular 1.x) within an ES6 application.

> The **README** for the ES6 branches will provide all details showing how easy, <u>more simplifed</u>, and <u>more manageable</u> it is to develop ES6 applications with Angular Material 1.x.<br/><br/>

## Getting Started

#### Prerequisites

You will need **git** to clone the chat-webapp repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test material-start. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

#### Clone chat-webapp

To get you started you can simply clone `master` branch from the [Chat-Webapp](https://github.com/Sauravvaidya/chat-webapp) repository and install the dependencies:

> NOTE: The `master` branch contains the traditional, ES5 implementation familiar to Angular developers.

Clone the chat-webapp repository using [git][git]:

```
git clone https://github.com/Sauravvaidya/chat-webapp.git
cd chat-webapp
```

If you just want to start a new project without the material-start commit history then you can do:

```bash
git clone --depth=1 https://github.com/Sauravvaidya/chat-webapp.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

#### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
material-start changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

## Directory Layout

```
app/ ---------------------> all of the source files for the application
  assets/app.css ---------> default stylesheet
  src/ -------------------> all app specific modules
     users/ --------------> .js files as modules of the app (contains controllers, configs etc)
     users/view ----------> all the templates pf the app (contains html files)
  index.html -------------> app layout file (the main html template file of the app)
karma.conf.js ------------> config file for running unit tests with Karma
e2e-tests/ ---------------> end-to-end tests
  protractor-conf.js -----> Protractor config file
  scenarios.js -----------> end-to-end scenarios to be run by Protractor
```

## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Serving the Application Files

While angular is client-side-only technology and it's possible to create angular webapps that
don't require a backend server at all, we recommend serving the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`.

### Running the App during Development

The angular-seed project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can install http-server globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by running:

```
cd app
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.


## Contact

For more information on AngularJS please check out http://angularjs.org/
For more information on Angular Material, check out https://material.angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
