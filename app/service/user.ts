
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
  public async sendDingMessage(request) {
    let { token, userIds, msg, title = 'bug提醒', diy = false } = request;
    if (diy) {
      msg = `收到新指派的bug: ${msg}`;
    }
    const response = await Client.mainMessage([ token ], userIds, msg, title);
    return response.body;
  }

  /**
   * @author: saiyanjing
   * @description: 获取用户列表
   */
  public async getUserList(request) {
    const { token, id = 1 } = request;
    const response = await this.ctx.curl('https://oapi.dingtalk.com/topapi/user/listsimple', {
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        access_token: token,
        dept_id: id,
        cursor: 0,
        size: 100,
      },
    });
    return response.data.result;

  }

  /**
   * @author: saiyanjing
   * @description: 获取部门列表
   */
  public async getDepartmentrList(request) {
    const { token, id = 1 } = request;
    const response = await this.ctx.curl('https://oapi.dingtalk.com/topapi/v2/department/listsub', {
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        access_token: token,
        dept_id: id,
      },
    });
    return response.data.result;

  }

}
