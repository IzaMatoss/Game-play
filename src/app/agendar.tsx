import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

export default function Agendar() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  return (
    <LinearGradient colors={['#0E1647', '#0A1033']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Cabeçalho com botão Voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#DDE3F0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar partida</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Seção Categoria */}
          <Text style={styles.label}>Categoria</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
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
                    <View
                      style={[
                        styles.checkBadge,
                        isSelected && styles.checkBadgeSelected,
                      ]}
                    />

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

          {/* Servidor Fixo: Valorosos */}
          <View style={styles.serverCard}>
            <Image
              source={require('../../assets/images/valorant.jpg')} // Ajustado para .jpg
              style={styles.serverCover}
              resizeMode="cover"
            />
            <View style={styles.serverInfo}>
              <Text style={styles.serverTitle}>Valorosos</Text>
              <Text style={styles.serverSubtitle}>Valorant</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ABB1CC" />
          </View>

          {/* Linha de Data e Horário */}
          <View style={styles.dateTimeRow}>
            {/* Dia e mês */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.smallInputsRow}>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={day}
                  onChangeText={setDay}
                />
                <Text style={styles.divider}>/</Text>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={month}
                  onChangeText={setMonth}
                />
              </View>
            </View>

            {/* Horário */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Horário</Text>
              <View style={styles.smallInputsRow}>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={hour}
                  onChangeText={setHour}
                />
                <Text style={styles.divider}>:</Text>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={minute}
                  onChangeText={setMinute}
                />
              </View>
            </View>
          </View>

          {/* Seção Descrição */}
          <View style={styles.descriptionHeader}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.charCount}>Max 100 caracteres</Text>
          </View>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            maxLength={100}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />

          {/* Botão Agendar */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.submitButtonText}>Agendar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 20,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#DDE3F0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 32,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  label: {
    color: '#DDE3F0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoriesContainer: {
    gap: 12,
    paddingBottom: 28,
  },
  categoryCard: {
    width: 104,
    height: 116,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#171F52',
    position: 'relative',
  },
  categorySelected: {
    borderColor: '#E51C44',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#111A44',
    borderWidth: 1,
    borderColor: '#171F52',
  },
  checkBadgeSelected: {
    backgroundColor: '#E51C44',
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
  serverCard: {
    width: '100%',
    height: 68,
    borderWidth: 1,
    borderColor: '#171F52',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 28,
    overflow: 'hidden',
  },
  serverCover: {
    width: 64,
    height: '100%',
    borderRadius: 8,
  },
  serverInfo: {
    flex: 1,
    paddingHorizontal: 16,
  },
  serverTitle: {
    color: '#DDE3F0',
    fontSize: 17,
    fontWeight: 'bold',
  },
  serverSubtitle: {
    color: '#ABB1CC',
    fontSize: 13,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  inputGroup: {
    width: '46%',
  },
  smallInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smallInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#171F52',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1D2766',
    color: '#DDE3F0',
    fontSize: 16,
    textAlign: 'center',
  },
  divider: {
    color: '#ABB1CC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    color: '#ABB1CC',
    fontSize: 12,
  },
  textArea: {
    width: '100%',
    height: 95,
    backgroundColor: '#171F52',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1D2766',
    color: '#DDE3F0',
    fontSize: 14,
    padding: 14,
    marginBottom: 36,
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#E51C44',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});