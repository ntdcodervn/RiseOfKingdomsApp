//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet,Dimensions, FlatList,SafeAreaView, Linking } from 'react-native';

import {fonts,colors} from './../theme/theme';
import Header from './../Components/Header/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
import listCommanderVi from './../database/ListCommander';
import ListCommanderEn from '../database/ListCommanderEn';
import listCommanderEpicVi from './../database/ListCommanderEpic';
import listCommanderEpicEn from './../database/ListCommanderEpicEn';
import CardCommanders from './../Components/Items/CardCommander2';
import AppText from './../Components/AppText';
import {LocalizationContext} from './../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFon from 'react-native-vector-icons/Fontisto';
import IconButton from './../Components/Buttons/IconButtonNots';
import BannerAds2 from './../Components/AdsMob/BannerAds';
import AsyncStorage from '@react-native-community/async-storage';
import { InterstitialAd,AdEventType  } from '@react-native-firebase/admob';

const imagess =  [
    require("./../../assets/images/Commander/Legendary/Artemisia/ArtemisiaI.png"),
    require("./../../assets/images/Commander/Legendary/Ramesses/Ramesses.png"),
    require("./../../assets/images/events/event3.jpg"),
    require("./../../assets/images/events/event4.jpg"),
    require("./../../assets/images/events/event5.jpg")
  ]

const {width} = Dimensions.get('window');

// create a component
const HomeScreen = ({ navigation }) => {
    const {t,locale, setLocale} = React.useContext(LocalizationContext);
    const [listCommanders,setListCommander] = useState([]);
    const [listCommanderEpics,setListCommanderEpic] = useState([]);
    const [lang,setLang] = useState('vi');
    const [dem,setDem] = useState(0);

    useEffect(() => {
        changeDrop(locale);
    },[])
    const changeDrop = async () => {
        let lang = await AsyncStorage.getItem('@lang');
        console.log(lang);
        
        if(lang == 'vi') {
            setListCommander(listCommanderVi)
            setListCommanderEpic(listCommanderEpicVi)

        }else {
            setListCommander(ListCommanderEn);
            setListCommanderEpic(listCommanderEpicEn)

        }
    }

    const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-7033028927124341/6324920687', {
        requestNonPersonalizedAdsOnly: true,
    });

    interstitial.onAdEvent((type) => {
        if (type === AdEventType.LOADED) {
          interstitial.show();
        }
    });

    const showAd = () => {
        if(dem == 2) {
            setDem(0);
            interstitial.load();
            
        }else{
            console.log(dem);
        
        setDem(dem + 1);
        }
        
        

    }

    


    return (
        <SafeAreaView style={styles.container}>
           <Header navigation={navigation} ></Header>
               
                <ScrollView style={{width : '100%'}}>
                <View style={{height : 200}}>
                    <SliderBox images={imagess} 
                    autoplay
                    circleLoop
                    dotColor="orange"
                    resizeMethod={'resize'}
                    resizeMode={'cover'} />
                </View>

                
                <View style={{width : '100%', alignItems : 'flex-start', paddingHorizontal : '5%',paddingVertical : 10, marginTop : 10, flexDirection : 'row'}}>
                    <IconFA5 name='grin-stars' size={21} color='orange' ></IconFA5>
                    <AppText i18nKey='feature' style={{...styles.textStyle,color : 'orange', marginLeft : 8}}>
                      
                    </AppText>
                </View>
        

                <View style={{justifyContent : 'space-between', paddingHorizontal : 40, paddingVertical : 10, flexDirection : 'row', alignItems : 'center', width : '100%'}}>
                    <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <IconButton
                        onPress={() => {navigation.navigate('TroopIndex')}}
                        nameIcon='chess-knight' styleIconBtn={{backgroundColor : colors.HoverColor}}></IconButton>
                        <AppText style={{fontFamily : fonts.bold,color : '#FFF', marginTop : 10}} i18nKey={'troop'}></AppText>
                    </View>
                    <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <IconButton 
                        onPress={() => {navigation.navigate('TroopIndex')}}
                        nameIcon='chess-queen' styleIconBtn={{backgroundColor : '#ff995e'}}></IconButton>
                        <AppText style={{fontFamily : fonts.bold,color : '#FFF', marginTop : 10}} i18nKey={'vip'}></AppText>
                    </View>
                    <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <IconButton 
                        onPress={() => {navigation.navigate('NewTab')}}
                        nameIcon='book-dead' styleIconBtn={{backgroundColor : '#734b6d'}}></IconButton>
                        <AppText style={{fontFamily : fonts.bold,color : '#FFF', marginTop : 10}} i18nKey={'posts'}></AppText>
                    </View>


                </View>

                <View style={{width : '100%', alignItems : 'flex-start', paddingHorizontal : '5%',paddingVertical : 10, flexDirection : 'row'}}>
                    <IconFA5 name='chess-king' size={21} color='orange' ></IconFA5>
                    <AppText i18nKey='chi_huy_huyen_thoai' style={{...styles.textStyle,color : 'orange', marginLeft : 8}}>
                      
                    </AppText>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <FlatList 
                    data={listCommanders}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled={true}
                    keyExtractor={item => item.id}
                    renderItem={({item, index, separators}) => (
                        <View
                        style={{width : width}}
                            onTouchEndCapture={() => {navigation.navigate('CommanderD',{items : item});showAd()}}
                          >
                              <CardCommanders items={item}></CardCommanders>
                        </View>
                      )}
                >

                </FlatList>
                <View style={{flexDirection : 'row', marginTop : 10}}>
                    <AppText i18nKey='vuot_de_xem' style={{fontFamily : fonts.light, fontSize : 10, color : '#FFF'}}>  </AppText>
                    <Icon name='page-next-outline' size={13} color={'#FFF'}></Icon>
                </View>
                </View>

                <View style={{width : '100%', alignItems : 'flex-start', paddingHorizontal : '5%',paddingVertical : 30, flexDirection : 'row'}}>
                    <IconFA5 name='chess-queen' size={21} color='#ae52d4' ></IconFA5>
                    <AppText i18nKey='chi_huy_anh_hung' style={{...styles.textStyle,color : '#ae52d4', marginLeft : 8}}>
                       
                    </AppText>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <FlatList 
                    pagingEnabled={true}
                    data={listCommanderEpics}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({item, index, separators}) => (
                        <View
                        style={{width : width}}
                            onTouchEndCapture={() => {navigation.navigate('CommanderD',{items : item,checkEpic : true});showAd()}}
                          >
                              <CardCommanders items={item} checkEpic={true}></CardCommanders>
                        </View>
                      )}
                >

                </FlatList>
                <View style={{flexDirection : 'row', marginTop : 10, marginBottom : 20}}>
                    <AppText i18nKey='vuot_de_xem' style={{fontFamily : fonts.light, fontSize : 10, color : '#FFF'}}>  </AppText>
                    <Icon name='page-next-outline' size={13} color={'#FFF'}></Icon>
                </View>
                </View>

                
              

                </ScrollView>
                <View style={{ marginBottom : 10}}>
                    <BannerAds2></BannerAds2>

                </View>
        
            
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width : '100%',
        height : '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
       backgroundColor : colors.MainColor,
      
      
    },
    textStyle :{
        fontFamily : fonts.black,
        fontSize : 20,
        
    }
});

//make this component available to the app
export default HomeScreen;
