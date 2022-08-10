
import { Post, Prefix, Get } from 'egg-shell-decorators';
import BaseController from './base';


@Prefix('user')
export default class UserController extends BaseController {

  /**
   * @description 获取部门列表
   */
  @Post('/getDepartmentrList')
  public async getDepartmentrList() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    const response = await ctx.service.user.getDepartmentrList(body);
    this.success(response);
  }
  /**
   * @description 获取用户列表 拿到userid 用于发送消息
   */
  @Post('/getUserList')
  public async getUserList() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    const response = await ctx.service.user.getUserList(body);
    this.success(response);
  }

  /**
   * @description 获取accessToken
   */
  @Get('/accessToken')
  public async accessToken() {
    const { ctx } = this;

    // console.log(ctx.request.body);
    // console.log(params);

    const accessToken = await ctx.service.user.getAccessToken();
    this.success({
      token: accessToken,
    });
  }

  /**
   * @description 发送钉钉消息
   */
  @Post('/sendMessage')
  public async sendMessage() {
    const { ctx } = this;
    const { request: { body } } = ctx;

    // const accessToken = await ctx.service.user.getAccessToken();
    const response = await ctx.service.user.sendDingMessage(body);
    this.success(response);
  }
}
