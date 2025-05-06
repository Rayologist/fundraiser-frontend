const config = {
  dev: {
    // serverUrl: 'https://adhoc.ioltw.org/api',
    serverUrl: 'http://localhost/api',
    internalUrl: 'http://backend:3000',
  },
  production: {
    serverUrl: 'https://fund.langcute.org/api',
    internalUrl: 'http://backend:3000',
  },
};

let env = config.dev;

if (process.env.NODE_ENV === 'production') {
  env = config.production;
}

export default env;
