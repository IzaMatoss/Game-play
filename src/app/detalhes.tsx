import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Lista de jogadores atualizada com os novos nomes
const PLAYERS = [
  {
    id: '1',
    name: 'Pompompurin',
    status: 'Disponível',
    isOnline: true,
    avatar: require('../../assets/images/partiner-1.jpg'),
  },
  {
    id: '2',
    name: 'Pochacco',
    status: 'Ocupado',
    isOnline: false,
    avatar: require('../../assets/images/partiner-2.jpeg'),
  },
  {
    id: '3',
    name: 'Keroppi',
    status: 'Ocupado',
    isOnline: false,
    avatar: require('../../assets/images/partiner-3.jpg'),
  },
];

export default function Detalhes() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0E1647', '#0A1033']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color="#DDE3F0" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalhes</Text>

        {/* Botão de partilha estático */}
        <TouchableOpacity activeOpacity={0.7} style={styles.headerButton}>
          <Feather name="share-2" size={24} color="#E51C44" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={PLAYERS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Bloco do Banner com Sobreposição de Texto */}
            <View style={styles.bannerContainer}>
              <Image
                source={require('../../assets/images/banner.png')}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', '#0E1647']}
                style={styles.bannerGradient}
              >
                <Text style={styles.bannerTitle}>Lendários</Text>
                <Text style={styles.bannerSubtitle}>
                  É hoje que vamos chegar ao challenger sem{'\n'}
                  perder uma partida da md10
                </Text>
              </LinearGradient>
            </View>

            {/* Cabeçalho da secção de Jogadores */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Jogadores</Text>
              <Text style={styles.sectionTotal}>Total {PLAYERS.length}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <Image source={item.avatar} style={styles.playerAvatar} />

            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name}</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusBullet,
                    { backgroundColor: item.isOnline ? '#32BD50' : '#E51C44' },
                  ]}
                />
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
            >
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="discord" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.buttonText}>Entrar na partida</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#DDE3F0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 32,
  },
  bannerContainer: {
    width: '100%',
    height: 234,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerGradient: {
    width: '100%',
    height: 140,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  bannerTitle: {
    color: '#DDE3F0',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: '#ABB1CC',
    fontSize: 13,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#DDE3F0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTotal: {
    color: '#ABB1CC',
    fontSize: 14,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 16,
  },
  playerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  playerInfo: {
    flex: 1,
    gap: 4,
  },
  playerName: {
    color: '#DDE3F0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    color: '#ABB1CC',
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 24,
    marginTop: 24,
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