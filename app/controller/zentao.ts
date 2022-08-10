
import { Post, Prefix } from 'egg-shell-decorators';
import BaseController from './base';


@Prefix('zentao')
export default class Zentao extends BaseController {

  @Post('/login') // 登录
  public async login() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    console.log(body);
    const response = await ctx.service.zentao.login(body.account, body.password);
    const oldapi = await ctx.service.zentao.getOldToken(body.account, body.password);
    const res = Object.assign({}, response, { oldapi });
    this.success(res);
  }

  @Post('/bugList') // bug列表
  public async bugList() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    try {
      const response = await ctx.service.zentao.bugList(body);
      this.success(response);
    } catch (error) {
      this.success(error, true);
    }
  }

  @Post('/userList') // 用户列表
  public async userList() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    try {
      const response = await ctx.service.zentao.userList(body);
      this.success(response);
    } catch (error) {
      this.success(error, true);
    }
  }

  @Post('/bugAssign') // bug分配
  public async bugAssign() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    try {
      const response = await ctx.service.zentao.bugAssign(body);
      this.success(response);
    } catch (error) {
      this.success(error, true);
    }
  }

  @Post('/bugDetail') // bug分配
  public async bugDetail() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    try {
      const response = await ctx.service.zentao.bugDetail(body);
      this.success(response);
    } catch (error) {
      this.success(error, true);
    }
  }
}
