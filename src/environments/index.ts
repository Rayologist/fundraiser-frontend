const config = {
  dev: {
    serverUrl: 'https://adhoc.ioltw.org/api',
    // serverUrl: 'http://localhost/api',
    internalUrl: 'http://backend',
  },
  production: {
    serverUrl: 'https://fund.langcute.org/api',
    internalUrl: 'https://backend/api',
  },
};

let env = config.dev;

if (process.env.NODE_ENV === 'production') {
  env = config.dev;
}

export default env;
