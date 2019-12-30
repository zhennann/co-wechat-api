'use strict';

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
