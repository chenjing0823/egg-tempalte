
import { Post, Prefix, Get } from 'egg-shell-decorators';
import BaseController from './base';


@Prefix('user')
export default class UserController extends BaseController {

  @Get('/accessToken')
  public async accessToken(params) {
    const { ctx } = this;

    // console.log(ctx.request.body);
    // console.log(params);

    const accessToken = await ctx.service.user.getAccessToken();
    this.success({
      token: accessToken,
    });
  }

  @Post('/sendMessage')
  public async sendMessage(params) {
    const { ctx } = this;
    const { request: { body } } = ctx;

    // const accessToken = await ctx.service.user.getAccessToken();
    const response = await ctx.service.user.sendDingMessage(body.token);
    this.success(response);
  }
}
