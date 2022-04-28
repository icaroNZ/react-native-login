import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Linking,
} from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  console.log('start');
  const webView = useRef();

  const onMessage = event => {
    console.log('On Message');
    console.log('On Message', JSON.stringify(event.nativeEvent.data, null, 4));
  };

  const webViewScript = `
    window.addEventListener("message", (event) => {
      window.ReactNativeWebView.postMessage(JSON.stringify(event))
    }, false);
    document.addEventListener("message", (event) => {
      window.ReactNativeWebView.postMessage(JSON.stringify(event))
    }, false);
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          style={{flex: 1}}
          source={{uri: 'http://localhost:3000/'}}
          onMessage={onMessage}
          userAgent="AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
          originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          //injectedJavaScript={webViewScript}
          javaScriptCanOpenWindowsAutomatically={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default App;
