
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
}
