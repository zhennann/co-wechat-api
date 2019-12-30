'use strict';

const crypto = require('crypto');

/**
 * 加密数据解密
 * 详情请见：<https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#加密数据解密算法>
 * Examples:
 * ```
 * api.decryptMini(encryptedData, session_key, iv);
 * ```
 */
exports.decryptMini = async function (encryptedData, session_key, iv) {
  try{
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(session_key, 'base64'), Buffer.from(iv, 'base64'));
    let decoded = decipher.update(Buffer.from(encryptedData, 'base64'));
    decoded += decipher.final();
    const res = JSON.parse(decoded);
    if(res.watermark.appid!==this.appid) {return null;}
    return res;
  }catch(err){
    console.log(err);
    return null;
  }
};

/**
 * 登录凭证校验
 * 详情请见：<https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html>
 * Examples:
 * ```
 * api.code2Session();
 * ```
 */
exports.code2Session = async function (code) {
  // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  var url = `${this.snsPrefix}jscode2session?appid=${this.appid}&secret=${this.appsecret}&js_code=${code}&grant_type=authorization_code`;
  return this.request(url, {dataType: 'json'});
};


