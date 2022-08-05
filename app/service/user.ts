
import { Service } from 'egg';
import { APP_KEY, APP_SECRET } from '../config/default.config';

import dingtalkoauth2_1_0, * as $dingtalkoauth2_1_0 from '@alicloud/dingtalk/dist/oauth2_1_0/client';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import * as $tea from '@alicloud/tea-typescript';

class Client {
  public accessToken: string | undefined;
  public appKey: string;
  public appSecret: string;

  constructor(appKey: string = APP_KEY, appSecret: string = APP_SECRET) {
    this.accessToken = '';
    this.appKey = appKey;
    this.appSecret = appSecret;
  }
  /**
   * 使用 Token 初始化账号Client
   * @return Client
   * @throws Exception
   */
  static createClient(): dingtalkoauth2_1_0 {
    const config = new $OpenApi.Config({ });
    config.protocol = 'https';
    config.regionId = 'central';
    return new dingtalkoauth2_1_0(config);
  }

  async main(args: string[]): Promise<void> {
    const client = Client.createClient();
    const getAccessTokenRequest = new $dingtalkoauth2_1_0.GetAccessTokenRequest({
      appKey: this.appKey,
      appSecret: this.appSecret,
    });
    try {
      const token = await client.getAccessToken(getAccessTokenRequest);
      console.log(token.body.accessToken);
      this.accessToken = token.body.accessToken;
    } catch (err) {
      console.log(err);

    }
  }
}
export default class User extends Service {
  /**
   * @author: saiyanjing
   * @description: 获取accessToken
   */
  public async getAccessToken() {
    const tokenClient = new Client();
    await tokenClient.main([]);
    return tokenClient.accessToken;
  }
}
