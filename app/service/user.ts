
import { Service } from 'egg';
import Client from '../public/client';

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
    return response.body;
  }

  /**
   * @author: saiyanjing
   * @description: 获取用户列表
   */
  public async getUserList(token) {
    const response = await this.ctx.curl('https://oapi.dingtalk.com/topapi/user/listsimple', {
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        access_token: token,
        dept_id: 1,
        cursor: 0,
        size: 100,
      },
    });
    return response.data.result;

  }

}
