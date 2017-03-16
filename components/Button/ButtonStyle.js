import StyleSheet from 'react-native-stylesheet-xg';
import {BackgroundColors, FontColors, FontSize, ActiveColor, DisableColor} from './ButtonInfo';
import {Color, RGB, HSL} from 'react-native-colortool';

// set The style base
StyleSheet.setBase(360);

export class BasicColor {
  constructor (theme, type, initDisableColor, initActiveColor, initLoadingColor) {
    this.theme = theme || '';
    this.type = type || '';
    this._initActiveColor = initActiveColor || '';
    this._initDisableColor = initDisableColor || '';
    this._initLoadingColor = initLoadingColor || '';
    this._themeColor = this.getBasicColor();
    this._typeColor = this.getTypeColor();
    this.themeColor = this._typeColor.themeColor;
    this.textColor = this._typeColor.textColor;
  }

  colorJoint (color) {
    return 'hsla(' + color.h + ', ' + color.s + '%, ' + color.l + '%, ' + color.a + ')';
  }
  colorResolve (color) {
    let newHSL = HSL.rgbToHsl(Color.format(color));
    return newHSL;
  }
  getBasicColor () {
    let themeMap = ['orange', 'blue', 'red', 'gray', 'default'];
    let themeColor;
    if (themeMap.indexOf(this.theme) === -1) {
      let newColor = HSL.rgbToHsl(Color.format(this.theme));
      let newColorDisable = this.colorJoint(newColor.lighten(0.3));
      let newColorActive = this.colorJoint(newColor.darken(0.3));
      themeColor = this.colorJoint(newColor);
      this.getActiveColor(newColorActive);
      this.getDisableColor(newColorDisable);
    } else {
      themeColor = BackgroundColors[this.theme];
      this.getActiveColor(ActiveColor[this.theme + 'Active']);
      this.getDisableColor(DisableColor[this.theme + 'Disable']);
    }
    return themeColor;
  }
  getActiveColor (color) {
    if (this._initActiveColor) {
      this.activeColor = this._initActiveColor;
    } else {this.activeColor = color;}
    if (this.type === 'surface') {
      this.activeColorCSS = {backgroundColor: this.activeColor, borderColor: this.activeColor};
    } else if (this.type === 'ghost') {
      this.activeColorCSS = {borderColor: this.activeColor};
      this.activeTextColorCSS = {color: this.activeColor};
    }
  }
  getLoadingColor (color) {
    if (this._initLoadingColor) {
      this.loadColor = this._initLoadingColor;
    } else {
      let beforeHSL = this.colorResolve(color);
      this.loadColor = this.colorJoint(beforeHSL.darken(0.4));
    }
  }
  getDisableColor (color) {
    if (this._initDisableColor) {
      this.disableColor = this._initDisableColor;
    } else {this.disableColor = color;}
    this.getLoadingColor(this.disableColor);
    if (this.type === 'surface') {
      this.disableColorCSS = {backgroundColor: this.disableColor, borderColor: this.disableColor};
    } else if (this.type === 'ghost') {
      this.disableColorCSS = {borderColor: this.disableColor};
      this.disableTextColorCSS = {color: this.disableColor};
    }
  }
  getTypeColor () {
    let ButtonThemeType;
    switch (this.type) {
      case 'surface':
        ButtonThemeType = StyleSheet.create({
          themeColor: {
            backgroundColor: this._themeColor,
            borderColor: this._themeColor
          },
          textColor: {
            color: FontColors.fontWhite
          }
        });
        return ButtonThemeType;
      default:
        ButtonThemeType = StyleSheet.create({
          themeColor: {
            borderColor: this._themeColor
          },
          textColor: {
            color: this._themeColor
          }
        });
        return ButtonThemeType;
    }
  }
}


export let ButtonType = StyleSheet.create({
  default: {
    fontSize: FontSize.fontlevel1
  },
  small: {
    fontSize: FontSize.fontlevel1
  },
  large: {
    fontSize: FontSize.fontlevel2
  }
});

export let ButtonOuter = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  small: {
    borderRadius: 3,
    borderWidth: 1,
    height: 25,
    paddingRight: 12,
    paddingLeft: 12
  },
  default: {
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    paddingRight: 12,
    paddingLeft: 12
  },
  large: {
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingRight: 20,
    paddingLeft: 20
  }
});
