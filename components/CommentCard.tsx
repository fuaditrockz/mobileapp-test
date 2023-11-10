/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, View} from 'react-native';

const CommentCard = ({comment}: {comment: any}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          minHeight: 72,
          paddingVertical: 16,
          paddingHorizontal: 24,
        }}>
        <Image
          source={{
            uri: comment.avatar_url,
          }}
          width={36}
          height={36}
          style={{borderRadius: 24, marginRight: 16}}
        />
        <View style={{width: '90%'}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 12,
              lineHeight: 14.52,
              color: '#828282',
            }}>
            {comment.full_name}
          </Text>
          <Text style={{fontWeight: '400', fontSize: 16, lineHeight: 19.36}}>
            {comment.comment}
          </Text>
        </View>
      </View>
      <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
    </>
  );
};

export default CommentCard;
