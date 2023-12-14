const modules = {
  zp: require('./zp/zp.module.js'),
};

const initialize = () => {
  Object.keys(modules).forEach((module) => {
    console.log(`Starting module: ${module}`)
    modules[module]();
  });
};

initialize();
