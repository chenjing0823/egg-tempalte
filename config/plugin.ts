import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  helper: {
    enable: true,
    package: 'egg-helper',
  },
};

export default plugin;
