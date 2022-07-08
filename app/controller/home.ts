import { Controller } from 'egg';
import { Post, Prefix } from 'egg-shell-decorators';

@Prefix('/home') // 添加网关，方便路由识别
export default class HomeController extends Controller {

  @Post('/')
  public async index() {
    const { ctx } = this;
    // ctx.body = await ctx.service.test.sayHi('egg');
    ctx.body = `Hello ${ctx.helper.util.hello()}!`;
  }
}
