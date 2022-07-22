/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect} from 'react';
import type {Node} from 'react';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";

import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Line = (props) => (
  <View style={styles.block}>
    <Text style={styles.name}>{props.name}</Text>
    <Text style={styles.value}>{JSON.stringify(props.value, null, 2)}</Text>
  </View>
);

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {

  const translationGetters = {
    // lazy requires
    ar: () => require("./translations/ar.json"),
    en: () => require("./translations/en.json"),
    fr: () => require("./translations/fr.json"),
    it: () => require("./translations/it.json")
  };
  
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  
  const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };
  
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
  
    // set i18n-js config
    i18n.translations = {
      [languageTag]: translationGetters[languageTag](),
    };
  
    i18n.locale = languageTag;
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    RNLocalize.addEventListener("change", handleLocalizationChange);
    setI18nConfig();
    var { language, Rtl} = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters));
    console.log("Language: " + language);
  }, [])

  const handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
           <Line
            name="RNLocalize.getLocales()"
            value={RNLocalize.getLocales()}
          />

          <Line
            name="RNLocalize.getCurrencies()"
            value={RNLocalize.getCurrencies()}
          />
          <Line
            name="RNLocalize.getCountry()"
            value={RNLocalize.getCountry()}
          />
          <Line
            name="RNLocalize.getCalendar()"
            value={RNLocalize.getCalendar()}
          />
          <Line
            name="RNLocalize.getNumberFormatSettings()"
            value={RNLocalize.getNumberFormatSettings()}
          />
          <Line
            name="RNLocalize.getTemperatureUnit()"
            value={RNLocalize.getTemperatureUnit()}
          />
          <Line
            name="RNLocalize.getTimeZone()"
            value={RNLocalize.getTimeZone()}
          />
          <Line
            name="RNLocalize.uses24HourClock()"
            value={RNLocalize.uses24HourClock()}
          />
          <Line
            name="RNLocalize.usesMetricSystem()"
            value={RNLocalize.usesMetricSystem()}
          />

          <Line
            name="RNLocalize.findBestAvailableLanguage(['en-US', 'en', 'fr', 'it'])"
            value={RNLocalize.findBestAvailableLanguage(["en-US", "en", "fr", "it"])}
          />

          <Line name="Translation example" value={translate("hello")} />
          <Line name="Translation example 2" value={translate("test")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
