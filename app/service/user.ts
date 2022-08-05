
import { Service } from 'egg';
import { APP_KEY, APP_SECRET } from '../config/default.config';

import Util, * as $Util from '@alicloud/tea-util';
import dingtalkoauth2_1_0, * as $dingtalkoauth2_1_0 from '@alicloud/dingtalk/dist/oauth2_1_0/client';
import dingtalkrobot_1_0, * as $dingtalkrobot_1_0 from '@alicloud/dingtalk/dist/robot_1_0/client';
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
   * @description token 配置
   */
  static createClientToken(): dingtalkoauth2_1_0 {
    const config = new $OpenApi.Config({ });
    config.protocol = 'https';
    config.regionId = 'central';
    return new dingtalkoauth2_1_0(config);
  }
  /**
   * @description message 配置
   */
  static createClientMessage(): dingtalkrobot_1_0 {
    const config = new $OpenApi.Config({ });
    config.protocol = 'https';
    config.regionId = 'central';
    return new dingtalkrobot_1_0(config);
  }
  /**
   * @description 发送dingtalk message
   */
  static async mainMessage(args: string[]): Promise<any> {
    const client = Client.createClientMessage();
    const batchSendOTOHeaders = new $dingtalkrobot_1_0.BatchSendOTOHeaders({ });
    batchSendOTOHeaders.xAcsDingtalkAccessToken = args[0];
    const batchSendOTORequest = new $dingtalkrobot_1_0.BatchSendOTORequest({
      robotCode: APP_KEY,
      userIds: [
        '15345508021231374',
      ],
      msgKey: 'sampleMarkdown',
      msgParam: '{"text": "你有未确认的bug","title": "bug提醒"}',
    });
    try {
      const response = await client.batchSendOTOWithOptions(batchSendOTORequest, batchSendOTOHeaders, new $Util.RuntimeOptions({ }));
      return response;
    } catch (err) {

      console.log(err);

    }
  }

  async mainToken(args: string[]): Promise<void> {
    const client = Client.createClientToken();
    const getAccessTokenRequest = new $dingtalkoauth2_1_0.GetAccessTokenRequest({
      appKey: this.appKey,
      appSecret: this.appSecret,
    });
    try {
      const token = await client.getAccessToken(getAccessTokenRequest);
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
    await tokenClient.mainToken([]);
    return tokenClient.accessToken;
  }

  /**
   * @author: saiyanjing
   * @description: 发送 message
   */
  public async sendDingMessage(token) {
    const response = await Client.mainMessage([ token ]);
    return response;
  }

}
