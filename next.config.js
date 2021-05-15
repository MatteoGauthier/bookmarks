module.exports = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        require('./scripts/generate-sitemap');
      }
  
      return config;
    },
    future: {
      webpack5: true,
    },
  };