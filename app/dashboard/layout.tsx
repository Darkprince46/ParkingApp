import React from 'react';
import { View, ScrollView } from 'react-native';
import { SideNav } from '@app/ui/dashboard/sidenav'; // Import SideNav from the correct path

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0, width: 64 }}>
        <SideNav />
      </View>
      <ScrollView style={{ flex: 1, padding: 6 }}>
        {children}
      </ScrollView>
    </View>
  );
}
