/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Pressable, Text, Image} from 'react-native';

import IconUpvoteActive from '../assets/upvote_active.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';

function UpVote({
  totalVotes,
  isMeAlreadyVoted,
  handleVote,
  handleCancelVote,
}: {
  totalVotes: number;
  isMeAlreadyVoted: boolean;
  handleVote: any;
  handleCancelVote: any;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => {
          if (isMeAlreadyVoted) {
            handleCancelVote();
          } else {
            handleVote();
          }
        }}>
        <Image
          source={isMeAlreadyVoted ? IconUpvoteActive : IconUpvoteInactive}
          height={18}
          width={18}
          style={{marginLeft: 24}}
        />
      </Pressable>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 24,
          marginHorizontal: 11,
          textAlign: 'center',
        }}>
        {totalVotes}
      </Text>
    </View>
  );
}

export default UpVote;
