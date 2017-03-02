/**
 * Created by TinySymphony on 2016-12-26.
 * index
 * @export Grading Component
 */

import React, {
  Component,
  PropTypes
} from 'react';
import {
  ART,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import GradingModal from './GradingModal';
import styles from './GradingStyle';
import {COLOR, MODE, SVG} from './GradingConstants';

const {ACTIVE_COLOR, DEFAULT_COLOR, FONT_COLOR, UNDERLAY_COLOR, DISABLE_COLOR} = COLOR;
const {BOARD, SMILES, ARCS, STARS} = MODE;

const {
  Shape,
  Group,
  Surface
} = ART;

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees + 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY - (radius * Math.sin(angleInRadians))
  };
}

// generate d attribute value for ART <Shape>
function generateArcPath (x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, startAngle);
  var end = polarToCartesian(x, y, radius, endAngle);
  var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(' ');
}

class Grading extends Component {
  constructor(props) {
    super(props);
    this.noop = this.noop.bind(this);
    this.renderArcs = this.renderArcs.bind(this);
    this.renderStars = this.renderStars.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.renderSmiles = this.renderSmiles.bind(this);
    this.openGradingModal = this.openGradingModal.bind(this);
  }
  noop () { }
  drawSmile(options) {
    const {
      like,
      active,
      scale = 1,
      activeColor = ACTIVE_COLOR,
      defaultColor = DEFAULT_COLOR,
      enable = true
    } = options || {};
    let fill = !active ? defaultColor : !enable ? DISABLE_COLOR : activeColor;
    return (
      <Surface width={50 * scale} height={50 * scale}>
        <Group x={5 * scale} y={5 * scale}>
          <Shape
            scale={40 / 1024 * scale}
            fill={fill}
            d={like ? SVG.HAPPY : SVG.SAD}/>
        </Group>
      </Surface>
    );
  }
  drawArc(options) {
    let {
      mode,
      activeColor = ACTIVE_COLOR,
      scoreBase = 10,
      scale = 1,
      score,
      fontColor = FONT_COLOR,
      name = '',
      enable,
      isPercentage
    } = options || {};
    isPercentage = mode === ARCS && isPercentage;
    if (isPercentage) {scoreBase = 100;}
    const angle = score / scoreBase * 360;
    let fontStyle = {
      fontSize: 20 * scale,
      lineHeight: 20 * scale,
      marginTop: -44 * scale,
      color: fontColor
    };
    let nameStyle = {
      fontSize: 16 * scale,
      marginTop: 24 * scale,
      color: fontColor
    };
    activeColor = !enable ? DISABLE_COLOR : activeColor;
    return (
      <View style={[styles.arcContainer]}>
        <View style={[styles.arc]}>
          <Surface width={68 * scale} height={68 * scale}>
            <Group x={0} y={0}>
              <Shape
                scale={scale}
                stroke={DEFAULT_COLOR}
                strokeWidth={4}
                d={generateArcPath(34, 34, 30, 0.01, 360)}
                />
              {angle ?
                <Shape
                  scale={scale}
                  stroke={activeColor}
                  strokeWidth={4}
                  d={generateArcPath(34, 34, 30, 0, angle)}
                  /> : undefined
              }
            </Group>
          </Surface>
        </View>
        <Text style={[styles.arcGrading, fontStyle]}>{isPercentage ? score + '%' : score.toFixed(1)}</Text>
        <Text style={nameStyle}>{name}</Text>
      </View>
    );
  }
  drawStar(options) {
    const {
      color = ACTIVE_COLOR,
      scale = 1,
      key,
      onGrading = this.noop
    } = options || {};
    return (
      <TouchableHighlight
        key={key}
        underlayColor="transparent"
        onPress={() => onGrading(key)}
        >
        <View>
          <Surface width={40 * scale} height={40 * scale}>
            <Group x={20 * scale} y={20 * scale}>
              <Shape
                fill={color}
                scale={scale}
                d={SVG.STAR}
                />
            </Group>
          </Surface>
        </View>
      </TouchableHighlight>
    );
  }
  parseNumber(num) {
    num = ~~num;
    let arr = [];
    while (num > 0) {
      arr.unshift(num % 1000);
      num = ~~(num / 1000);
    }
    return arr.join();
  }
  openGradingModal () {
    const {readOnly, enable} = this.props;
    if (readOnly || !enable) {return;}
    this.refs.modal.openModal();
  }
  renderArcs () {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.openGradingModal}>
        <View style={styles.arcs}>
          {this.drawArc({...this.props})}
          {<GradingModal
            ref="modal"
            {...this.props}
            scored={false}
          />}
        </View>
      </TouchableHighlight>
    );
  }
  renderStars() {
    let {
      score,
      scoreBase,
      scale,
      activeColor,
      defaultColor,
      onGrading,
      enable,
      readOnly
    } = this.props;
    let arr = [];
    activeColor = !enable ? DISABLE_COLOR : activeColor;
    defaultColor = !enable ? DEFAULT_COLOR : defaultColor;
    onGrading = enable && !readOnly ? onGrading : this.noop;
    while (scoreBase--) { arr.push(1); }
    return (
      <View style={styles.stars}>
        {arr.map((item, index) =>
          score >= index + 1 ?
          this.drawStar({scale: 0.3 * scale,
            color: activeColor,
            key: index + 1,
            onGrading
          }) : this.drawStar({scale: 0.3 * scale,
            color: defaultColor,
            key: index + 1,
            onGrading
          })
        )}
      </View>
    );
  }
  renderSmiles() {
    const {
      isLike,
      onGrading,
      enable,
      readOnly
    } = this.props;
    let onPress = enable && !readOnly ? onGrading : this.noop;
    return (
      <View style={styles.smiles}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => onPress(true)}>
          <View>
            {this.drawSmile({...this.props, active: isLike, like: true})}
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => onPress(false)}>
          <View>
            {this.drawSmile({...this.props, active: !isLike, like: false})}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  renderBoard() {
    const {
      score,
      num,
      activeColor,
      defaultColor,
      fontColor,
      enable
    } = this.props;
    let mainColor = !enable ? DISABLE_COLOR : activeColor;
    let font = !enable ? FONT_COLOR : fontColor;
    const BASE = 5;
    let arr = [1, 1, 1, 1, 1];
    return (
      <TouchableHighlight
        underlayColor={UNDERLAY_COLOR}
        onPress={this.openGradingModal}>
        <View style={styles.board}>
          <View style={styles.boardGradingWp}>
            <Text style={[styles.boardGrading, {color: mainColor}]}>{(score % BASE).toFixed(1)}</Text>
          </View>
          <Text style={[styles.boardNum, {color: font}]}>
            {num < 100000 ? this.parseNumber(num)
              : num > Math.pow(10, 7) ? '999w+'
              : this.parseNumber(num / 10000) + 'w+'}
          </Text>
          <View style={styles.boardStars}>
            {arr.map((item, index) =>
              score >= index + 1 ?
              this.drawStar({scale: 0.3, color: mainColor, key: index + 1})
              : this.drawStar({scale: 0.3, color: defaultColor, key: index + 1})
            )}
          </View>
          {<GradingModal
            ref="modal"
            {...this.props}
            scoreBase={BASE}
            scored={false}
          />}
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    const {
      mode
    } = this.props;
    let rankingView = <Text>Rendering</Text>;
    if (mode === BOARD) {
      rankingView = this.renderBoard();
    } else if (mode === ARCS) {
      rankingView = this.renderArcs();
    } else if (mode === STARS){
      rankingView = this.renderStars();
    } else if (mode === SMILES){
      rankingView = this.renderSmiles();
    }
    return (
      <TouchableHighlight>
        {rankingView}
      </TouchableHighlight>
    );
  }
}

Grading.defaultProps = {
  mode: 'board',
  enable: true,
  readOnly: false,
  num: 0,
  score: 0,
  scoreBase: 5,
  scale: 1,
  onGrading: () => {},
  name: '',
  isLike: true,
  activeColor: ACTIVE_COLOR,
  defaultColor: DEFAULT_COLOR,
  fontColor: FONT_COLOR,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  isPercentage: false
};

Grading.propTypes = {
  mode: PropTypes.oneOf([BOARD, ARCS, SMILES, STARS]),
  enable: PropTypes.bool,
  readOnly: PropTypes.bool,
  isLike: PropTypes.bool,
  scale: PropTypes.number,
  score: PropTypes.number,
  scoreBase: PropTypes.number,
  onGrading: PropTypes.func,
  num: PropTypes.number,
  name: PropTypes.string,
  isPercentage: PropTypes.bool,
  activeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  fontColor: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelTextStyle: PropTypes.object,
  confirmTextStyle: PropTypes.object,
  cancelButtonStyle: PropTypes.object,
  confirmButtonStyle: PropTypes.object
};

export default Grading;
