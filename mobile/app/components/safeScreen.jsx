import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '../../constants/color.js'

export default function SafeScreen({ children }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {children}
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    }
}