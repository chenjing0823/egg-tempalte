import { APP_KEY, APP_SECRET } from '../config/default.config';

import Util, * as $Util from '@alicloud/tea-util';
import dingtalkoauth2_1_0, * as $dingtalkoauth2_1_0 from '@alicloud/dingtalk/dist/oauth2_1_0/client';
import dingtalkrobot_1_0, * as $dingtalkrobot_1_0 from '@alicloud/dingtalk/dist/robot_1_0/client';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import * as $tea from '@alicloud/tea-typescript';

export default class Client {
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
  static async mainMessage(args: string[], userIds: string[], bugMsg: string, bugtitle: string): Promise<any> {
    const client = Client.createClientMessage();
    const batchSendOTOHeaders = new $dingtalkrobot_1_0.BatchSendOTOHeaders({ });
    batchSendOTOHeaders.xAcsDingtalkAccessToken = args[0];
    const batchSendOTORequest = new $dingtalkrobot_1_0.BatchSendOTORequest({
      robotCode: APP_KEY,
      userIds,
      msgKey: 'sampleMarkdown',
      msgParam: `{"text": "${bugMsg}","title": "${bugtitle}"}`,
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
