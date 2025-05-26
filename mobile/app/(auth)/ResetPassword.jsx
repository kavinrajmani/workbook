import { View, Text, Button, Linking, ToastAndroid } from 'react-native'
import { Link } from 'expo-router';
import COLORS from '../../constants/color';

export default function ResetPassword() {
const openGoogleMaps = () => {
  const latitude = 13.08784000;
  const longitude = 80.27847000;
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  Linking.openURL(url);
};


  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
      padding: 20,
      
    }}>
      <Text style={{ marginBottom: 5 }}>ResetPassword</Text>
      <Link href="..">
        <Text style={{ color: 'blue' }}>Back to Login</Text>
      </Link>
      <View style={{ marginVertical: 10 }} />
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '80%' }}>
       <Button title="Open Map" onPress={openGoogleMaps} />
       <View style={{ marginVertical: 10 }} />

       <Button title="Show Alert" onPress={() => alert('This is a toast message!')} />
        <View style={{ marginVertical: 10 }} />

       <Button title="Show toast" onPress={() => ToastAndroid.show("Hello! this is toast message", ToastAndroid.SHORT)} />
    </View>
    </View>
  )
}