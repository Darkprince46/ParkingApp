import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  HomeIcon,
  MapPinIcon,
  TruckIcon,
  CalendarIcon,
  CalendarDaysIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';
import { useNavigation } from '@react-navigation/native';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', route: 'Dashboard', icon: HomeIcon },
  { name: 'Location', route: 'DashboardLocation', icon: MapPinIcon },
  { name: 'Locate', route: 'DashboardLocate', icon: GlobeAsiaAustraliaIcon },
  { name: 'Log', route: 'DashboardLog', icon: HomeIcon },
  { name: 'Daily Report', route: 'DashboardDailyReport', icon: TruckIcon },
  { name: 'Weekly Report', route: 'DashboardWeeklyReport', icon: CalendarIcon },
  { name: 'Monthly Report', route: 'DashboardMonthlyReport', icon: CalendarDaysIcon },
  { name: 'Monthly Pass', route: 'DashboardMonthlyPass', icon: CalendarDaysIcon },
];

export default function NavLinks() {
  const navigation = useNavigation();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <TouchableOpacity
            key={link.name}
            onPress={() => navigation.navigate(link.route)}
            style={{
              flexDirection: 'row',
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 2,
              padding: 3,
              borderRadius: 5,
              backgroundColor: pathname === link.route ? '#87CEFA' : '#F0F0F0', // You can customize the colors
            }}
          >
            <LinkIcon style={{ width: 24, height: 24 }} />
            <Text style={{ display: 'none', marginLeft: 5 }}>{link.name}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
}
