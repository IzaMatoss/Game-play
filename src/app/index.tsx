import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

export default function SignInScreen() {
  const router = useRouter();

  function handleSignIn() {
    router.push('/home'); 
  }

  return (
    <LinearGradient
      colors={['#0E1647', '#0A1033']}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Bloco das Imagens */}
      <View style={styles.heroSection}>
        {/* Faixas de fundo */}
        <Image
          source={require('../../assets/images/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Guerreiro */}
        <Image
          source={require('../../assets/images/illustration.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        {/* Imagem de degradê na base dos pés */}
        <Image
          source={require('../../assets/images/overlay.png')}
          style={styles.gradientOverlay}
          resizeMode="stretch"
        />
      </View>

      {/* Bloco de Textos e Botão aproximados */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Conecte-se{'\n'}
            e organize suas{'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{'\n'}
            favoritos com seus amigos
          </Text>
        </View>

        {/* Botão Discord aproximado do texto */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSignIn}
        >
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="discord" size={24} color="#FFFFFF" />
          </View>

          <Text style={styles.buttonText}>
            Entrar com Discord
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  heroSection: {
    width: '100%',
    height: height * 0.44,
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
    height: 90,
    zIndex: 3,
    opacity: 0.95,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'flex-start', // Remove o espaçamento forçado até o rodapé
    paddingTop: 8,
    gap: 32, // Distância próxima e equilibrada entre o texto e o botão
    zIndex: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -38,
  },
  title: {
    color: '#DDE3F0',
    textAlign: 'center',
    fontSize: 38,
    fontWeight: 'bold',
    lineHeight: 46,
    marginBottom: 12,
  },
  subtitle: {
    color: '#ABB1CC',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#E51C44',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#991F36',
  },
  buttonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});