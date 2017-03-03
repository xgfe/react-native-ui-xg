const BackgroundColors = {

  //背景颜色
  default: '#06C1AE',
  orange: '#FF9900',
  blue: '#06C1AE',
  red: '#EC5330',
  gray: '#D2D2D2'
};

const ActiveColor = {
  orangeActive: '#D66500',
  defaultActive: '#049387',
  blueActive: '#049387',
  redActive: '#C23E1A',
  grayActive: '#8E8E8E'
};

const DisableColor = {
  orangeDisable: '#FFD084',
  blueDisable: '#96E4DA',
  defaultDisable: '#96E4DA',
  redDisable: '#FDC1B5',
  grayDisable: '#E5E5E5'
};

const FontColors = {
  //字体颜色
  fontWhite: '#FFFFFF',
  fontBlue: BackgroundColors.blue, //价格，文字链接
  fontGreen: '#6CDB03', //提示信息
  fontOrange: BackgroundColors.orange, //强提示，标签内容
  fontRed: BackgroundColors.red, //警示信息
  fontGraylevel1: '#CCCCCC', //内容不可用，文本框内引导文字
  fontGraylevel2: '#999999', //次要辅助信息
  fontGraylevel3: '#666666', //次要信息
  fontGraylevel4: '#333333' //列表，正文标题
};

//react中的单位是pt pt=px*(3/4) 四舍五入
const FontSize = {
  fontlevel1: 13,
  fontlevel2: 17
};

export {
  BackgroundColors as BackgroundColors,
  FontColors as FontColors,
  FontSize as FontSize,
  ActiveColor as ActiveColor,
  DisableColor as DisableColor
};
