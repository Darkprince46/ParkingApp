import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 3, paddingTop: 2 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('/')}
        style={{
          marginBottom: 0,
          flex: 1,
          height: 60,
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderRadius: 5,
          backgroundColor: '#2196F3', // Replace with your color
          padding: 1,
        }}
      >
        <View style={{ width: 80, height: 40, alignItems: 'center' }}>
          <AcmeLogo />
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4, paddingVertical: 8 }}>
        <NavLinks />
        <View style={{ display: 'none', height: 'auto', width: '100%', flex: 1, borderRadius: 5, backgroundColor: '#F0F0F0' }}></View>
        <TouchableOpacity
          onPress={() => {
            // Implement your sign-out logic here
          }}
          style={{
            flex: 1,
            height: 48,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: '#F0F0F0', // Replace with your color
            padding: 3,
            flexDirection: 'row',
          }}
        >
          <PowerIcon style={{ width: 24, height: 24 }} />
          <Text style={{ display: 'none', marginLeft: 5 }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
