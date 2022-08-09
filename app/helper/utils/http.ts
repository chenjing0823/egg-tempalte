import { ZENTAO_URL_OLD, ZENTAO_URL_NEW } from '../../config/default.config';

// const qs = require('qs');


export default app => {
  return {
    /**
     * @author: saiyanjing
     * @description: 老版本禅道 get
     */
    async ovGet({ url, params = {} }) {
      const sendUrl = `${ZENTAO_URL_OLD}?${url}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: 'json',
          method: 'GET',
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
    /**
     * @author: saiyanjing
     * @description: 老版本禅道 POST
     */
    async ovPost({ url, params = {} }) {
      const sendUrl = `${ZENTAO_URL_OLD}?${url}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: 'json',
          method: 'POST',
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
    /**
     * @author: saiyanjing
     * @description: 新版本禅道 get
     */
    async nvGet({ url, params = {} }) {
      const sendUrl = `${ZENTAO_URL_NEW}v1/${url}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: 'json',
          method: 'POST',
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
    /**
     * @author: saiyanjing
     * @description: 新版本禅道 POST
     */
    async nvPost({ url, params = {} }) {
      const sendUrl = `${ZENTAO_URL_NEW}v1/${url}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: 'json',
          method: 'POST',
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
  };
};
