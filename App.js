import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  View,
} from 'react-native';
import Search from './screens/Search';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: 'd3f37f7ad692c07184910bc13d7ebb97',
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  };

  // weather?lat={lat}&lon={lon}&appid={API key}
  const fetchDataHandler = useCallback(() => {
    console.log('Api Called');
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `${api.baseUrl}weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={style.root}>
      <ImageBackground
        source={require('./assets/sunsetImage.jpg')}
        resizeMode="cover"
        style={style.image}>
        <View>
          <TextInput
            placeholder="Enter City name"
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={style.textInput}
            onSubmitEditing={fetchDataHandler}></TextInput>
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}
        {data && (
          <View style={style.infoView}>
            <Text style={style.cityCountryText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={style.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={style.tempText}>
              {`${Math.round(data?.main?.temp)}`}°C
            </Text>
            <Text style={style.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min,
            )}°C / Max ${Math.round(data?.main?.temp_max)}°C`}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    color: '#fff',
    fontSize: 45,
    marginVertical: 10,
  },
  minMaxText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
