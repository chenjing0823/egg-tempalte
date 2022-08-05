
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
    return response;
  }

}
