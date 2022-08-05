
import { Post, Prefix, Get } from 'egg-shell-decorators';
import BaseController from './base';


@Prefix('user')
export default class UserController extends BaseController {

  @Post('/getUserList')
  public async getUserList() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    const response = await ctx.service.user.getUserList(body.token);
    this.success(response);
  }

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

  @Post('/sendMessage')
  public async sendMessage() {
    const { ctx } = this;
    const { request: { body } } = ctx;

    // const accessToken = await ctx.service.user.getAccessToken();
    const response = await ctx.service.user.sendDingMessage(body.token);
    this.success(response);
  }
}
