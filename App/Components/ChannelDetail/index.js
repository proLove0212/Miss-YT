// @flow
import React from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import type {TChannelStore, TChannelActions, TDefaultChannel} from '../../types/';
import { colors, fontSize, Images } from '../../Themes/';
import {ButtonDefault} from '../ButtonDefault';
import {Videos} from './Videos';

type TInfoDetailItem = {
  iconName: string;
  text: string;
}

const InfoDetailItem = ({iconName, text}: TInfoDetailItem) => {
  return (
    <View style={styles.infoDetailItem}>
      <Icon
        style={styles.infoDetailItemIcon}
        name={iconName}
        size={fontSize.regular}
        color={colors.mainWeak}
      />
      <Text>{text}</Text>
    </View>
  );
};

const onScroll = (event, contentHeight, channelVideosGetRequest) => {
  const windowScroll = Dimensions.get('window').height + event.nativeEvent.contentOffset.y;
  if (windowScroll > contentHeight) {
    channelVideosGetRequest();
  }
};

type TChannelPanel = {
  channel: TDefaultChannel,
  channelActions: TChannelActions,
  likesPostRequest: (channel: TChannelStore) => void,
}

export const ChannelDetail = ({channel, likesPostRequest, channelActions}: TChannelPanel) => (
  <View style={styles.container}>
    <ScrollView
      onScroll={e => onScroll(
        e, channel.contentHeightVideos,
        () => channelActions.channelVideosGetRequest(channel.item.youtube.id),
      )}
      scrollEventThrottle={200}
      onContentSizeChange={(width, height) => channelActions.channelVideosSetContentHeight(height)}
      style={styles.scrollView}
    >
      <View style={styles.infoContainer}>
        <View style={styles.infoTop}>
          <Image
            style={styles.infoTopImage}
            source={channel.item.youtube.thumbnail ? {uri: `${channel.item.youtube.thumbnail}`} : Images.mainWeak}
          />
          <View style={styles.infoTopLikeWrapper}>
            <ButtonDefault
              styles={styles.infoTopLike}
              text={`????????? ${channel.item.likeCount}`}
              onPress={() => likesPostRequest(channel.item)}
              disabled={channel.isFetchingMyInfo}
              iconName={'favorite'}
            />
          </View>
        </View>
        <View style={styles.infoName}>
          <Text style={styles.infoNameText}>{channel.item.youtube.name}</Text>
        </View>
        <View style={styles.infoDetail}>
          <InfoDetailItem iconName="trending-up" text={`??????????????? ${channel.item.rank}???`} />
          <InfoDetailItem iconName="trending-up" text={`????????????????????? ${channel.itemMyInfo.rank}???`} />
          <InfoDetailItem iconName="favorite" text={`??????????????? ${channel.item.likeCount}`} />
          <InfoDetailItem iconName="favorite" text={`?????????????????? ${channel.itemMyInfo.likeCount}`} />
          <InfoDetailItem iconName="subscriptions" text={`??????????????????????????? ${channel.item.youtube.subscriberCount}???`} />
        </View>
      </View>
      <Videos
        channel={channel}
        setContentHeight={channelActions.channelVideosSetContentHeight}
        channelVideosGetRequest={channelActions.channelVideosGetRequest}
      />
    </ScrollView>
  </View>
);
