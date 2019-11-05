// eslint-disable-next-line require-jsdoc
function tunggu() {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log('terlewati!');
      resolve();
    }, 2000);
  });
}

// eslint-disable-next-line require-jsdoc
async function run() {
  await tunggu();
  await tunggu();
  await tunggu();
  console.log('test 123');
}

run();
