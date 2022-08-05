import { Controller } from 'egg';
import HttpExceptions from '../exceptions/http_exceptions';

export default class BaseController extends Controller {

  /**
   * @author saiyanjing
   * @description 成功回调
   */
  success(data, error?: boolean) {
    this.ctx.body = {
      code: !error ? 0 : 1,
      data,
    };
  }

  /**
   * @author saiyanjing
   * @description 根据业务返回不同的错误 code，提供给前端做业务判断处理
   */
  error({ msg = '服务器异常', code = 1, httpCode = 400 }) {
    throw new HttpExceptions({
      code,
      httpCode,
      msg,
    });
  }
}
