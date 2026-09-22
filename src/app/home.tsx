import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Categorias com ícones em .png
const CATEGORIES = [
  {
    id: '1',
    title: 'Ranqueada',
    icon: require('../../assets/images/ranked.png'),
  },
  {
    id: '2',
    title: 'Duelo 1x1',
    icon: require('../../assets/images/duel.png'),
  },
  {
    id: '3',
    title: 'Diversão',
    icon: require('../../assets/images/fun.png'),
  },
];

// Partidas agendadas com capas locais
const APPOINTMENTS = [
  {
    id: '1',
    title: 'Lendários',
    category: 'Ranqueada',
    date: '18/06 às 21:00h',
    role: 'Anfitrião',
    cover: require('../../assets/images/lol.jpeg'),
    isHost: true,
  },
  {
    id: '2',
    title: 'Yeah, boy',
    category: 'Diversão',
    date: '23/06 às 19:00h',
    role: 'Visitante',
    cover: require('../../assets/images/rdr2.jpeg'),
    isHost: false,
  },
  {
    id: '3',
    title: 'Rumo ao topo',
    category: '1×1',
    date: '20/06 às 09:00h',
    role: 'Anfitrião',
    cover: require('../../assets/images/csgo.png'),
    isHost: true,
  },
  {
    id: '4',
    title: 'Bora queimar tudo',
    category: 'Ranqueada',
    date: '20/06 às 14:20h',
    role: 'Anfitrião',
    cover: require('../../assets/images/apex.jpg'),
    isHost: true,
  },
  {
    id: '5',
    title: 'Valorosos',
    category: 'Diversão',
    date: '18/06 às 21:00h',
    role: 'Anfitrião',
    cover: require('../../assets/images/valorant.jpg'),
    isHost: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <LinearGradient colors={['#0E1647', '#0A1033']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Cabeçalho do Perfil */}
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <Image
            source={require('../../assets/images/icon-perfil.jpg')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.userName}>Izabel</Text>
            </Text>
            <Text style={styles.subtitle}>Hoje é dia de vitória</Text>
          </View>
        </View>

        {/* Botão '+' para agendar partida */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => router.push('/agendar')}
        >
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Categorias Horizontais */}
      <View style={styles.categoriesSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isSelected ? ['#1D2766', '#111A44'] : ['#171F52', '#0E1647']}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.categorySelected,
                  ]}
                >
                  <Image
                    source={cat.icon}
                    style={[
                      styles.categoryIcon,
                      { opacity: isSelected ? 1 : 0.5 },
                    ]}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryText}>{cat.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Cabeçalho da Lista de Partidas */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Partidas agendadas</Text>
        <Text style={styles.listTotal}>Total {APPOINTMENTS.length}</Text>
      </View>

      {/* Lista de Partidas */}
      <FlatList
        data={APPOINTMENTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.appointmentCard}
            activeOpacity={0.7}
            onPress={() => router.push('/detalhes')}
          >
            {/* Bloco da Capa com fundo branco específico para CS:GO */}
            <View
              style={[
                styles.gameCoverContainer,
                item.id === '3' && styles.csgoContainer,
              ]}
            >
              <Image
                source={item.cover}
                style={styles.gameCover}
                resizeMode={item.id === '3' ? 'contain' : 'cover'}
              />
            </View>

            {/* Detalhes da Partida */}
            <View style={styles.appointmentContent}>
              <View style={styles.appointmentRow}>
                <Text style={styles.appointmentTitle}>{item.title}</Text>
                <Text style={styles.appointmentCategory}>{item.category}</Text>
              </View>

              <View style={styles.appointmentRow}>
                <View style={styles.infoGroup}>
                  <Feather name="calendar" size={14} color="#E51C44" />
                  <Text style={styles.infoText}>{item.date}</Text>
                </View>

                <View style={styles.infoGroup}>
                  <Feather
                    name="user"
                    size={14}
                    color={item.isHost ? '#E51C44' : '#32BD50'}
                  />
                  <Text
                    style={[
                      styles.infoText,
                      { color: item.isHost ? '#E51C44' : '#32BD50' },
                    ]}
                  >
                    {item.role}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E51C44',
  },
  greeting: {
    color: '#DDE3F0',
    fontSize: 22,
  },
  userName: {
    fontWeight: 'bold',
    color: '#DDE3F0',
  },
  subtitle: {
    color: '#ABB1CC',
    fontSize: 13,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#E51C44',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesSection: {
    height: 120,
    marginBottom: 24,
  },
  categoryCard: {
    width: 104,
    height: 116,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#171F52',
  },
  categorySelected: {
    borderColor: '#E51C44',
  },
  categoryIcon: {
    width: 44,
    height: 44,
  },
  categoryText: {
    color: '#DDE3F0',
    fontSize: 14,
    fontWeight: '600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  listTitle: {
    color: '#DDE3F0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listTotal: {
    color: '#ABB1CC',
    fontSize: 14,
  },
  appointmentCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#171F52',
    paddingBottom: 14,
  },
  gameCoverContainer: {
    width: 64,
    height: 68,
    borderRadius: 8,
    overflow: 'hidden',
  },
  csgoContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  gameCover: {
    width: '100%',
    height: '100%',
  },
  appointmentContent: {
    flex: 1,
    gap: 8,
  },
  appointmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentTitle: {
    color: '#DDE3F0',
    fontSize: 17,
    fontWeight: 'bold',
  },
  appointmentCategory: {
    color: '#ABB1CC',
    fontSize: 13,
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#DDE3F0',
    fontSize: 13,
  },
});