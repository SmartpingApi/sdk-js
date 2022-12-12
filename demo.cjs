const SmartpingNodeApi = require('./lib/node/smartping-api.cjs');

(async () => {
  const smartping = new SmartpingNodeApi('SW399', 'Sy2zMFb91P');
  const demo = await smartping.test();
  console.log(demo);
})();
