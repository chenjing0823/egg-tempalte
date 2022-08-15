
import { Service } from 'egg';
import axios from 'axios';

export default class Zentao extends Service {
  /**
   * @author: saiyanjing
   * @description: 登录
   */
  public async login(account, password) {
    // const response = await this.ctx.curl('http://z.xbongbong.com/www/api.php/v1/tokens', {
    //   method: 'POST',
    //   dataType: 'json',
    //   contentType: 'application/json',
    //   data: {
    //     account,
    //     password,
    //   },
    // });
    // console.log(response);
    const response = await axios({
      method: 'post',
      url: 'http://z.xbongbong.com/www/api.php/v1/tokens',
      data: {
        account,
        password,
      },
    });
    return response.data;
  }

  /**
   * @description 获取老版本api token
   */
  public async getOldToken(account, password) {
    const oblapi = await this.ctx.curl('http://z.xbongbong.com/www/index.php?m=api&f=getSessionID&t=json', {
      method: 'GET',
    });
    const aldapiRes = JSON.parse(oblapi.data.toString());
    const sessionID = JSON.parse(aldapiRes.data).sessionID;
    const response = await this.ctx.curl(
      `http://z.xbongbong.com/www/index.php?m=user&f=login&t=json&account=${account}&password=${password}&zentaosid=${sessionID}`,
      {
        method: 'GET',
      },
    );
    const res = JSON.parse(response.data.toString());
    return res.user;
  }

  /**
   * @description bug列表
   */
  public async bugList(request) {
    const { token, page = 1, limit = 20, id = 11 } = request;
    const response = await axios({
      method: 'get',
      headers: {
        Token: token,
      },
      url: `http://z.xbongbong.com/www/api.php/v1/products/${id}/bugs`,
      params: {
        page,
        limit,
      },
    });
    return response.data;
  }

  /**
   * @description 用户列表
   */
  public async userList(request) {
    const { token, limit = 200 } = request;
    const response = await axios({
      method: 'get',
      headers: {
        Token: token,
      },
      url: 'http://z.xbongbong.com/www/api.php/v1/users',
      params: {
        limit,
      },
    });
    return response.data;
  }

  /**
   * @description bug详情
   */
  public async bugDetail(request) {
    const { token, id } = request;
    const response = await axios({
      method: 'get',
      headers: {
        Token: token,
      },
      url: `http://z.xbongbong.com/www/api.php/v1/bugs/${id}`,
    });
    return response.data;
  }

  /**
   * @description 指派bug
   */
  public async bugAssign(request) {
    const { zentaosid, assignedTo, status = 'active', id, comment = '' } = request;

    // const response = await this.ctx.curl(
    //   `http://z.xbongbong.com/www/index.php?m=bug&f=assignTo&bugID=${id}&onlybody=yes&zentaosid=${zentaosid}`,
    //   {
    //     method: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     data: {
    //       assignedTo,
    //       status,
    //     },
    //   },
    // );
    // return response;
    this.ctx.curl(
      `http://z.xbongbong.com/www/index.php?m=bug&f=assignTo&bugID=${id}&onlybody=yes&zentaosid=${zentaosid}`,
      {
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: {
          assignedTo,
          status,
          comment,
        },
      },
    ).then(res => {
      console.log('res', res);
    }).catch(err => {
      console.log('err', err);
    });
    return {
      msg: '指派成功',
    };
  }
}
