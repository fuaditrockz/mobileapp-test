/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import PostCard from '../components/PostCard';
import {SomeContext} from '../context';

function FeedScreen() {
  const {posts} = useContext(SomeContext);

  return (
    <SafeAreaView>
      <ScrollView>
        {posts.map((content: any, index: number) => (
          <PostCard key={index} content={content} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
