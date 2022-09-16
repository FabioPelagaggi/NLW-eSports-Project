import { useState } from 'react'
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { CheckCircle } from 'phosphor-react-native'
import { styles } from './styles'
import { THEME } from '../../theme';
import { Heading } from '../Heading';



interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest} : Props) {
    const [isCopping, setIsCopping] = useState(false)
    async function handleCopyDiscordToClipboard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)
        Alert.alert('Discord Copied to clipboard', 'Discord user copied to your clipboard.')
        setIsCopping(false)
    }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='fade'>
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.closeIcon}>
                    <MaterialIcons onPress={onClose} name="close" size={20} color={THEME.COLORS.CAPTION_500}/>                    
                </TouchableOpacity>

                <CheckCircle 
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight="bold"
                />

                <Heading 
                    title="Be Ready!"
                    subtitle="Let the games begin!"
                    style={{alignItems: "center", marginTop: 24}}                
                />
               
                <Text style={styles.label}>Add on Discord</Text>
                
                <TouchableOpacity disabled={isCopping} onPress={handleCopyDiscordToClipboard} style={styles.discordButton}>
                    <Text style={styles.discord}>
                        {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    
  );
}