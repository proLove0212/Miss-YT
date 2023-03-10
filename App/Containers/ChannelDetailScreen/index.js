// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

import styles from './style';
import type {TChannelActions, TDefaultChannel, TChannelsActions} from '../../types/';
import {ChannelDetail} from '../../Components/';
import {channelActions, channelsActions} from '../../Redux/';

type TChannelDetailScreen = {
  channel: TDefaultChannel,
  channelActions: TChannelActions,
  channelsActions: TChannelsActions,
}

export class ChannelDetailScreen extends Component<TChannelDetailScreen, void> {
  componentDidMount() {
    const {channel} = this.props;
    this.props.channelActions.channelMyInfoGetRequest(channel.item.id);
    this.props.channelActions.channelVideosGetRequest(channel.item.youtube.id, true);
  }
  render() {
    const {channel} = this.props;
    return (
      <View style={styles.container}>
        <ChannelDetail
          channel={channel}
          channelActions={this.props.channelActions}
          likesPostRequest={this.props.channelsActions.channelsLikesPostRequest}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  channel: state.channel,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(channelActions, dispatch),
  channelsActions: bindActionCreators(channelsActions, dispatch),
});

export const ConnectedChannelDetailScreen =
  connect(mapStateToProps, mapDispatchToProps)(ChannelDetailScreen);
