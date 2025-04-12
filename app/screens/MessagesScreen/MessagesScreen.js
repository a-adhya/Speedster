import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Appbar, List, Checkbox, Searchbar, Badge } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

export default function MessagesScreen() {
  const [checked, setChecked] = useState([false, false, true, true, true]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNotificationPress = () => {
    console.log('Notifications icon pressed');
  };

  const messages = [
    { name: 'Shu', message: 'Run tomorrow?', image: require('../../images/shu.jpg'), unread: true },
    { name: 'Ryan Evil Twin', message: 'That swim was killer!', image: require('../../images/ryan.jpg'), unread: true },
    { name: 'Anti Shu', message: 'Ironman 70.3 this fall?', image: require('../../images/antishu.jpg'), unread: false },
    { name: 'Also Shu', message: 'Yikes', image: require('../../images/shu2.jpg'), unread: false },
    { name: 'Caro', message: 'Cya later!', image: require('../../images/caro.jpg'), unread: false },
  ];

  const onChangeSearch = query => setSearchQuery(query);

  const handleItemPress = (name) => {
  };

  return (
    <>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Messages" titleStyle={styles.appBarTitle} />
        <TouchableOpacity onPress={handleNotificationPress}>
          <View>
            <Appbar.Action icon="bell" color="white" />
            <Badge style={styles.badge}>2</Badge>
          </View>
        </TouchableOpacity>
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.container}>
        {messages.map((msg, index) => (
          <List.Item
            key={index}
            title={msg.name}
            description={msg.message}
            left={() => <Image source={msg.image} style={styles.avatar} />}
            right={() => !msg.unread && <Checkbox status={checked[index] ? 'checked' : 'unchecked'} onPress={() => {
              const newChecked = [...checked];
              newChecked[index] = !newChecked[index];
              setChecked(newChecked);
            }} />}
            titleStyle={msg.unread ? styles.unreadTitle : styles.readTitle}
            descriptionStyle={msg.unread ? styles.unreadDescription : styles.readDescription}
            style={[msg.unread ? styles.unreadItem : styles.readItem, styles.listItem]}
            onPress={() => handleItemPress(msg.name)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBar: {
    backgroundColor: 'orange',
  },
  appBarTitle: {
    color: 'white',
  },
  searchbar: {
    margin: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  unreadItem: {
    backgroundColor: 'white',
  },
  readItem: {
    backgroundColor: '#e0e0e0',
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  unreadDescription: {
    fontWeight: 'bold',
  },
  readTitle: {
    fontWeight: 'normal',
  },
  readDescription: {
    fontWeight: 'normal',
  },
  listItem: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    color: 'white',
  },
});