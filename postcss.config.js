module.exports = {
  plugins: {
    // autoprefixer: {
    //配置兼容的浏览器环境 在这里设置会报错 因为在Vue-cli中统一配置在.Browserslistrc中
    //vue在内部已经配置了autoprefixer
    //browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    'postcss-pxtorem': {
      //基准值 根据设计稿件比例设置
      //375宽 375/10=37.5
      //vant样式是基于 逻辑像素375写的 若设计物理像素不是375 则需要按比例设置宽度。
      rootValue: 37.5,
      propList: ['*'], //配置需要转换的css属性
    },
  },
};
