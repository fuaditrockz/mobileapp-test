/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconShare from '../assets/share.png';
import DownVote from './DownVote';
import UpVote from './UpVote';
import {RootStackParamList} from '../type';
import {SomeContext} from '../context';
import {findMyDataInArray} from '../helpers';

const PostCard = ({content}: {content: any}) => {
  const {myData, posts} = useContext(SomeContext);
  const navigation = useNavigation<RootStackParamList>();
  const [totalContentLines, setTotalContentLines] = useState<number>(0);
  const [totalComments] = useState<number>(content?.comments.length);

  const [isMeAlreadyDownVoted, setIsMeAlreadyDownVoted] =
    useState<boolean>(false);
  const [isMeAlreadyUpVoted, setIsMeAlreadyUpVoted] = useState<boolean>(false);

  const [allDownVotes, setAllDownVotes] = useState<any[]>([]);
  const [allUpVotes, setAllUpvotes] = useState<any[]>([]);

  useEffect(() => {
    const getMeInDownvotes = findMyDataInArray(content.downvotes, myData);
    const getMeInUpvotes = findMyDataInArray(content.upvotes, myData);

    setIsMeAlreadyDownVoted(getMeInDownvotes?.username === myData.username);
    setIsMeAlreadyUpVoted(getMeInUpvotes?.username === myData.username);

    setAllDownVotes(content.downvotes);
    setAllUpvotes(content.upvotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const handleVote = (type: 'upvote' | 'downvote') => {
    if (type === 'upvote') {
      setAllUpvotes((prevState: any[]) => [myData, ...prevState]);
      setIsMeAlreadyUpVoted(true);
    } else {
      setAllDownVotes((prevState: any[]) => [myData, ...prevState]);
      setIsMeAlreadyDownVoted(true);
    }
  };

  const handleCancelVote = (type: 'upvote' | 'downvote') => {
    if (type === 'upvote') {
      setAllUpvotes(
        allUpVotes.filter((x: any) => {
          return x.username !== myData.username;
        }),
      );
      setIsMeAlreadyUpVoted(false);
    } else {
      setAllDownVotes(
        allDownVotes.filter((x: any) => {
          return x.username !== myData.username;
        }),
      );
      setIsMeAlreadyDownVoted(false);
    }
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('post-detail', {
          ...content,
          downvotes: allDownVotes,
          upvotes: allUpVotes,
        })
      }>
      <View style={{backgroundColor: '#fff'}}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 64,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={{
              uri: content.avatar_url,
            }}
            width={48}
            height={48}
            style={{borderRadius: 24, marginLeft: 24}}
          />
          <View style={{marginLeft: 16}}>
            <Text style={{fontWeight: '600', fontSize: 14, lineHeight: 16.94}}>
              {content.full_name}
            </Text>
            <Text style={{fontWeight: '400', fontSize: 12, lineHeight: 18}}>
              {content.created_at}
            </Text>
          </View>
        </View>
        <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
        <View>
          <View
            style={{
              marginHorizontal: 24,
              marginTop: 10,
              marginBottom: 15,
              position: 'relative',
            }}>
            <Text
              numberOfLines={3}
              style={{fontSize: 14}}
              ellipsizeMode="clip"
              onTextLayout={(e: any) => {
                const totalLines = e.nativeEvent.lines.length;
                setTotalContentLines(totalLines);
              }}>
              {content.content}
            </Text>
            {totalContentLines > 3 && (
              <Text
                style={{
                  position: 'absolute',
                  right: 10,
                  bottom: 0,
                  backgroundColor: '#ffffff',
                  paddingHorizontal: 4,
                  paddingVertical: 0,
                  color: '#3498db',
                }}>
                Read more
              </Text>
            )}
          </View>
          <Image
            source={{
              uri: content.image,
            }}
            height={300}
            resizeMode="cover"
          />
        </View>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 52,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Image
              source={IconShare}
              height={18}
              width={18}
              style={{marginLeft: 22}}
            />
            <Image
              source={IconComment}
              height={18}
              width={18}
              style={{marginLeft: 24}}
            />
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 24,
                marginHorizontal: 4,
                textAlign: 'center',
              }}>
              {totalComments}
            </Text>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={IconBlock}
              height={18}
              width={18}
              style={{marginLeft: 22}}
            />
            <DownVote
              totalVotes={allDownVotes.length}
              isMeAlreadyVoted={isMeAlreadyDownVoted}
              handleVote={() => handleVote('downvote')}
              handleCancelVote={() => handleCancelVote('downvote')}
            />
            <UpVote
              totalVotes={allUpVotes.length}
              isMeAlreadyVoted={isMeAlreadyUpVoted}
              handleVote={() => handleVote('upvote')}
              handleCancelVote={() => handleCancelVote('upvote')}
            />
          </View>
        </View>
      </View>
      <View style={{height: 4, backgroundColor: '#C4C4C4'}} />
    </Pressable>
  );
};

export default PostCard;
