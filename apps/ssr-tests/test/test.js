'use strict';

// Treat warnings as failures.
console.warn = message => {
  throw new Error(message);
};

// Configure load-themed-styles to avoid registering styles.
let themeLoader = require('@microsoft/load-themed-styles');
themeLoader.configureLoadStyles(styles => {
  // noop
});

// Set ssr mode to true, and rtl to false.
let library = require('office-ui-fabric-react/lib/Utilities');
library.setSSR(true);
library.setRTL(false);

// Assume a large screen.
let responsiveLib = require('office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode');
responsiveLib.setResponsiveMode(responsiveLib.ResponsiveMode.large);

// Initialize icons.
const { initializeIcons } = require('office-ui-fabric-react/lib/Icons');
initializeIcons('dist/');

let React = require('react');
let ReactDOMServer = require('react-dom/server');
let AppDefinition = require('@uifabric/demo/lib/AppDefinition').AppDefinition;

describe('Fabric components', () => {
  for (let i = 0; i < AppDefinition.examplePages.length; i++) {
    let links = AppDefinition.examplePages[i].links;
    for (let j = 0; j < links.length; j++) {
      let { key, component } = links[j];

      testRender(key, component);
    }
  }
});

function testRender(componentName, component) {
  it(`${componentName} can render in a server environment`, done => {
    let elem = React.createElement(component);

    try {
      ReactDOMServer.renderToString(elem);
      done();
    } catch (e) {
      done(new Error(e));
    }
  });
}
