/* @flow */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Narrow, Stream } from '../types';
import StreamIcon from '../streams/StreamIcon';
import { isTopicNarrow } from '../utils/narrow';

const componentStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  streamRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type Props = {
  narrow: Narrow,
  stream: Stream,
  color: string,
};

export default class TitleStream extends PureComponent<Props> {
  props: Props;

  static contextTypes = {
    styles: () => null,
  };

  render() {
    const { styles } = this.context;
    const { narrow, stream, color } = this.props;

    return (
      <View style={[styles.navWrapper, componentStyles.wrapper]}>
        <View style={componentStyles.streamRow}>
          <StreamIcon
            isMuted={!stream.in_home_view}
            isPrivate={stream.invite_only}
            color={color}
            size={20}
          />
          <Text style={[styles.navTitle, { color }]} numberOfLines={1} ellipsizeMode="tail">
            {stream.name}
          </Text>
        </View>
        {isTopicNarrow(narrow) && (
          <Text style={[styles.navSubtitle, { color }]} numberOfLines={1} ellipsizeMode="tail">
            {narrow[1].operand}
          </Text>
        )}
      </View>
    );
  }
}
