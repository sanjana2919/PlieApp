import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { fetchEvents } from '../../../redux/reducer/eventSlice';
import { EventApiItem } from '../../../redux/type';
import { useThemeMode } from '../../../context/ThemeContext';
import { eventListingScreenStyle } from '../eventListingScreen/eventListingScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import Ionicons from 'react-native-vector-icons/Ionicons'

const FavouriteScreen = () => {
   const mode = useThemeMode();
    const styles = eventListingScreenStyle(mode);

    const dispatch = useDispatch<AppDispatch>();
    const { events, loading } = useSelector((state: RootState) => state.events);
    const userName = useSelector(
      (state: RootState) => state.auth.userName
    );

    const token = useSelector(
      (state: RootState) => state.auth.token
    );
    
    const favoriteEvents = useMemo(
      () => events.filter(event => event.isFavorite === 1),
        [events]
    );


    useEffect(()=>{
    dispatch(fetchEvents(token))
    },[])

    const renderEventItem = ( { item }: { item: EventApiItem })=> {
      return  <TouchableOpacity style={styles.card}>
          <Image source={{ uri: item.event_profile_img }} style={styles.image} />

          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.event_name}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
                <Text style={styles.date}>{`${item.readable_from_date}-${item.readable_to_date}`}</Text>
                <Text style={styles.date}>{`${item?.event_price_fro?item?.event_price_fro:''} ${item?.event_price_to?item?.event_price_to:''}`}</Text>
              </View>
              <Text style={styles.location}>{item.city}, {item.country}</Text>
            </View>

            <View style={[styles.tagRow,{width:20}]}>
            {item.danceStyles.map((danceStyle) => (
            <View key={danceStyle.ds_id} style={styles.tag}>
            <Text style={styles.tagText}>{danceStyle.ds_name}</Text>
            </View>
            ))}
            </View>
          </View>

          <View style={styles.actions}>
            <Text style={styles.share}>⤴︎</Text>
            <Ionicons name='share-outline' style={[styles.heart]}/>
            <Ionicons name='heart-outline' style={[styles.heart, item.isFavorite && styles.heartActive]}/>
          </View>
        </TouchableOpacity>
     }


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hello}>Hello {userName??'Guest'}!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
      </View>


      {/* List */}
      <FlatList
      data={favoriteEvents}
      keyExtractor={(item, index) =>
      `${item.event_id}_${index}`
      }
      renderItem={renderEventItem}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshing={loading}
      onRefresh={() => dispatch(fetchEvents(token))}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          No favourite events found ❤️
        </Text>
  }
      />

    </SafeAreaView>
  )
}


export default FavouriteScreen

const styles = StyleSheet.create({})