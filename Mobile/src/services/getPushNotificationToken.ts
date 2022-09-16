import * as Notifications from 'expo-notifications'

export async function getPushNotificationsToken(){
    const { granted } = await Notifications.getPermissionsAsync()

    if (!granted){
        await Notifications.requestPermissionsAsync()
    }

    if (granted){
        const token = await Notifications.getExpoPushTokenAsync()

        console.log('Push Notication Token: ', token.data)
        return token.data
    }
}