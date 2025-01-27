/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import IconBack from '../assets/back.png';
import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconShare from '../assets/share.png';
import DownVote from '../components/DownVote';
import UpVote from '../components/UpVote';
import {SomeContext} from '../context';
import {findMyDataInArray} from '../helpers';
import CommentCard from '../components/CommentCard';

function PostDetailScreen() {
  const {posts, setPosts, myData} = useContext(SomeContext);
  const navigation = useNavigation();
  const route: any = useRoute();

  const [isMeAlreadyDownVoted, setIsMeAlreadyDownVoted] =
    useState<boolean>(false);
  const [isMeAlreadyUpVoted, setIsMeAlreadyUpVoted] = useState<boolean>(false);

  const [allDownVotes, setAllDownVotes] = useState<any[]>([]);
  const [allUpVotes, setAllUpvotes] = useState<any[]>([]);
  const [allComments, setAllComments] = useState<any[]>([]);

  const [commentInput, setCommentInput] = useState<string>('');

  useEffect(() => {
    const getMeInDownvotes = findMyDataInArray(route.params.downvotes, myData);
    const getMeInUpvotes = findMyDataInArray(route.params.upvotes, myData);

    if (getMeInDownvotes?.username === myData.username) {
      setIsMeAlreadyDownVoted(true);
    }
    if (getMeInUpvotes?.username === myData.username) {
      setIsMeAlreadyUpVoted(true);
    }
    setAllDownVotes(route.params.downvotes);
    setAllUpvotes(route.params.upvotes);
    setAllComments(route.params.comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmitComment = () => {
    setAllComments((prevState: any[]) => [
      {
        ...myData,
        comment: commentInput,
      },
      ...prevState,
    ]);

    setCommentInput('');
  };

  const handleBack = () => {
    let updatedPosts = posts.map((post: any) => {
      if (post.id === route.params.id) {
        return {
          ...post,
          downvotes: allDownVotes,
          upvotes: allUpVotes,
          comments: allComments,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    navigation.goBack();
  };

  console.log('comment', commentInput);

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          marginBottom: 48,
          height: Dimensions.get('window').height - 80,
        }}>
        <View>
          <View
            style={{
              height: 64,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Pressable onPress={handleBack}>
              <Image
                source={IconBack}
                height={18}
                width={18}
                style={{marginLeft: 22}}
              />
            </Pressable>
            <Image
              source={{
                uri: route.params.avatar_url,
              }}
              width={48}
              height={48}
              style={{borderRadius: 24, marginLeft: 24}}
            />
            <View style={{marginLeft: 16}}>
              <Text
                style={{fontWeight: '600', fontSize: 14, lineHeight: 16.94}}>
                {route.params.full_name}
              </Text>
              <Text style={{fontWeight: '400', fontSize: 12, lineHeight: 18}}>
                {route.params.created_at}
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
              <Text style={{}}>{route.params.content}</Text>
            </View>
            <Image
              source={{
                uri: route.params.image,
              }}
              height={300}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              height: 52,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
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
                style={{
                  width: 24,
                  marginHorizontal: 4,
                  textAlign: 'center',
                }}>
                {allComments.length}
              </Text>
            </View>
            <View
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
        {allComments.map((comment: any, index: number) => (
          <CommentCard comment={comment} key={index} />
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 24,
          zIndex: 10,
        }}>
        <TextInput
          placeholder="Enter Comment"
          style={{flex: 1}}
          onChangeText={setCommentInput}
          value={commentInput}
        />
        <Button
          title="Comment"
          onPress={() => {
            handleSubmitComment();
            console.log('comment');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default PostDetailScreen;
