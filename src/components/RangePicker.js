import React, {useEffect} from 'react';
import {StyleSheet, View, PanResponder, Animated, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import CONSTANTS from '../utils/constants';

export default function RangePicker(props) {
  // ------------------ OPTIONS ------------------------ //
  // (Use props._VALUE_ in this section if needed)
  const name = 'Price';
  const icon = 'location-on';
  const minBoundary = props.startingValue;
  const maxBoundary = props.endingValue;
  const initVal = props.startingValue;
  const colorHighlight = props.enabled
    ? CONSTANTS.COLORS.BLACK
    : CONSTANTS.COLORS.LIGHTGRAY;
  const enabled = props.enabled;

  // ----------------- Slider ----------------------- //
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [forceRender, setForceRender] = React.useState(0);
  const animState = React.useRef({
    displayMinVal: 0,
    sliderWidth: 0,
    stepWidth: 0,
    minBoundary: 0,
    maxBoundary: 0,
    minBoundaryPosition: 0,
    maxBoundaryPosition: 0,
    offSet: 0,
    clampOffSet: 0,
    initOffSet: 0,
  }).current;

  const [sliderHeight, setSliderHeight] = React.useState(0);
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const [sliderCenter, setSliderCenter] = React.useState(0);
  const [initOffset, setInitOffset] = React.useState(0);
  const [minBoundaryPosition, setMinBoundaryPosition] = React.useState(0);
  const [maxBoundaryPosition, setMaxBoundaryPosition] = React.useState(0);
  const setSliderSize = (height, width) => {
    setSliderHeight(height);
    const sWidth = width - height; // - height : Avoid the slider to overlap the borders
    setSliderWidth(sWidth);
    animState.sliderHeight = height;
    animState.sliderWidth = sWidth;
    const stepWidth = sWidth / (maxBoundary - minBoundary);
    animState.stepWidth = stepWidth;
    animState.minBoundary = minBoundary;
    animState.maxBoundary = maxBoundary;

    const center = sWidth / 2;
    setSliderCenter(center);
    const initOff = (initVal - (maxBoundary - minBoundary) / 2) * stepWidth;
    setInitOffset(initOff);
    animState.initOffSet = initOff;
    animState.minBoundaryPosition = -sWidth / 2 - initOff;
    animState.maxBoundaryPosition = sWidth / 2 - initOff;
    setMinBoundaryPosition(-sWidth / 2 - initOff);
    setMaxBoundaryPosition(sWidth / 2 - initOff);

    placeSlider();
  };

  const placeSlider = () => {
    const newVal =
      pan.x._value +
      animState.offSet +
      animState.initOffSet -
      animState.clampOffSet;
    setForceRender(newVal); // Update the state so the render function is called (and elements are updated on screen)

    let filterVal = Math.trunc(
      (newVal + animState.sliderWidth / 2 + animState.stepWidth / 2) /
        animState.stepWidth,
    );
    filterVal = Math.min(maxBoundary, filterVal);
    filterVal = Math.max(minBoundary, filterVal);
    animState.displayMinVal = filterVal;
  };

  useEffect(() => {
    props.onChangeValue(animState.displayMinVal);
  }, [animState.displayMinVal]);

  const getPanResponder = () => {
    return PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const clamp = Math.max(
          animState.minBoundaryPosition,
          Math.min(animState.maxBoundaryPosition, pan.x._value),
        );
        animState.clampOffSet = animState.clampOffSet + pan.x._value - clamp;
        pan.setOffset({x: clamp, y: 0});
      },
      onPanResponderMove: (e, gesture) => {
        placeSlider();
        Animated.event([null, {dx: pan.x, dy: pan.y}], {})(e, {
          dx: gesture.dx,
          dy: 0,
        });
      },
      onPanResponderRelease: (e, gesture) => {
        animState.offSet = animState.offSet + pan.x._value;
        pan.flattenOffset();
      },
    });
  };
  const [panResponder, setPanResponder] = React.useState(getPanResponder());

  // ----------------- Render ----------------------- //
  return (
    <View style={s.mainContainer}>
      <View
        style={s.sliderContainer}
        onLayout={event => {
          setSliderSize(
            event.nativeEvent.layout.height,
            event.nativeEvent.layout.width,
          );
        }}>
        <View style={s.lineContainer}>
          <Text
            style={[
              s.labelValueText,
              {
                color: props.enabled
                  ? CONSTANTS.COLORS.BLACK
                  : CONSTANTS.COLORS.GRAY,
              },
            ]}>
            {props.startingValue}KM
          </Text>
          <View style={{flex: 1, height: 4}}>
            <View
              style={[
                s.line,
                [
                  {
                    backgroundColor: props.enabled
                      ? props.lineColor
                      : CONSTANTS.COLORS.LIGHTGRAY,
                    // translateX: pan.x.interpolate({
                    //   inputRange: [
                    //     Math.min(minBoundaryPosition, maxBoundaryPosition),
                    //     Math.max(minBoundaryPosition, maxBoundaryPosition),
                    //   ],
                    //   outputRange: [
                    //     Math.min(
                    //       minBoundaryPosition + initOffset - sliderWidth / 2,
                    //       maxBoundaryPosition + initOffset - sliderWidth / 2,
                    //     ),
                    //     Math.max(
                    //       minBoundaryPosition + initOffset - sliderWidth / 2,
                    //       maxBoundaryPosition + initOffset - sliderWidth / 2,
                    //     ),
                    //   ],
                    //   extrapolate: 'clamp',
                    // }),
                  },
                ],
              ]}
            />
          </View>
          <Text
            style={[
              s.labelValueText,
              {
                color: props.enabled
                  ? CONSTANTS.COLORS.BLACK
                  : CONSTANTS.COLORS.GRAY,
              },
            ]}>
            {props.endingValue} KM
          </Text>
        </View>
        <Animated.View
          style={[
            s.draggable,
            {
              transform: [
                {
                  translateX: pan.x.interpolate({
                    inputRange: [
                      Math.min(minBoundaryPosition, maxBoundaryPosition),
                      Math.max(minBoundaryPosition, maxBoundaryPosition),
                    ],
                    outputRange: [
                      Math.min(minBoundaryPosition, maxBoundaryPosition),
                      Math.max(minBoundaryPosition, maxBoundaryPosition),
                    ],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            {left: sliderCenter + initOffset},
          ]}
          {...panResponder.panHandlers}>
          <View style={s.icon}>
            <MaterialCommunityIcons
              name={icon}
              size={40}
              color={colorHighlight}
            />
            <View style={s.labelContainer}>
              <Text
                style={[
                  s.label,
                  {
                    color: props.enabled
                      ? CONSTANTS.COLORS.BLACK
                      : CONSTANTS.COLORS.GRAY,
                  },
                ]}>
                {animState.displayMinVal}KM
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
      {props.enabled == false && (
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            aspectRatio: 4,
            flexDirection: 'row',
            position: 'absolute',
          }}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 4,
    flexDirection: 'row',
  },
  labelValue: {
    justifyContent: 'center',
  },
  labelValueText: {
    fontSize: 11,
    paddingHorizontal: 5,
  },

  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    flexDirection: 'row',
    position: 'absolute',
    left: '4%',
    top: '50%',
    marginTop: -3,
    borderRadius: 60,
    backgroundColor: '#f1f1f1',
  },
  line: {
    height: '100%',
    width: '100%',
  },
  draggable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    aspectRatio: 1,
    position: 'absolute',
    top: 0,
    borderRadius: 100,
    overflow: 'visible',
  },

  icon: {
    top: -8,
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',
    width: '100%',
    paddingBottom: 10,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 4,
    position: 'absolute',
    bottom: 0,
  },
  label: {
    fontSize: 12,
  },
});
