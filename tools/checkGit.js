/* eslint-disable */
const cp = require('child_process');
const fs = require('fs');

// start
cp.exec('git config user.email', function (err, stdout, stderr) {
  if(err || stderr) {
    console.log('\x1b[31m%s\x1b[1m', '获取git账号名失败');
    process.exit(1);
  }
  var email = stdout.trim();
  if(!email || email.split('@')[1] === 'meituan.com') {
    console.log('\x1b[31m%s\x1b[1m', '请勿使用公司邮箱提交');
    process.exit(1);
  }
});
