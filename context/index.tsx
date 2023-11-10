/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, {ReactNode, createContext, useState, useEffect} from 'react';
import {mockData} from '../mockData';

type SomeContextProps = {
  myData: any;
  setMyData: (data: any) => void;
  posts: any[];
  setPosts: (post: any[]) => void;
};

export const SomeContext = createContext<SomeContextProps>({
  myData: {},
  setMyData: (myData: any) => myData,
  posts: [],
  setPosts: (posts: any[]) => posts,
});

const SomeContextProvider = ({children}: {children: ReactNode}) => {
  const [myData, setMyData] = useState<any>({
    full_name: 'Fuadit Muhammad',
    username: 'fuaditrockz',
    id: 1,
    avatar_url:
      'https://d2v9ipibika81v.cloudfront.net/uploads/sites/271/Africa-2.png',
  });
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    console.log('Test');
    setPosts(mockData);
  }, [mockData]);

  return (
    <SomeContext.Provider
      value={{
        myData,
        setMyData,
        posts,
        setPosts,
      }}>
      {children}
    </SomeContext.Provider>
  );
};

export default SomeContextProvider;
