const cookie =
  'Lang=en; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRlYzkyYTQwYTI4ZDQzYjk3OTVhMGQiLCJ1c2VybmFtZSI6InF1b2NnaWEiLCJpYXQiOjE2OTIzMzQ3MzV9.jz6yrk6BSGUuoeg2EpfoQZQDpD8EiCBB4WMyu_8i_-I';

const tokenCookieString = cookie
  .split(';')
  .find((str) => str.includes('token='));
//.find((str) => str.startsWith('token='));

console.log('tokenCookieString: ', tokenCookieString);
