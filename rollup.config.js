import terser from '@rollup/plugin-terser';
export default {
  input:'./lib/index.js',//入口文件
  output:{
    file:'./dist/index.js',//打包后的存放文件
    format:'es',//输出格式 amd es6 iife umd cjs
  },
  plugins: [terser()]
}
