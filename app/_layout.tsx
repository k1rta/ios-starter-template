import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const RootLayout: React.FC = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default RootLayout;
