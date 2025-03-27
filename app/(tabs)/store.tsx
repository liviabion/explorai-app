import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';

const initialBalance = 450;

const storeItems = [
  {
    id: '1',
    title: 'Cinema da Fundação',
    description: '1 ingresso por filme',
    cost: 200,
    color: Colors.softRed,
    icon: 'film-outline',
  },
  {
    id: '2',
    title: 'Entrada VIP Festival de Forró',
    description: 'Válido para próxima edição',
    cost: 300,
    color: Colors.softRed,
    icon: 'ticket-outline',
  },
  {
    id: '3',
    title: 'Aula de Culinária Tradicional',
    description: 'Aprenda a fazer Bolo de Rolo',
    cost: 350,
    color: Colors.softRed,
    icon: 'restaurant-outline',
  },
  {
    id: '4',
    title: 'Guia Digital de Artesanato',
    description: 'Técnicas de cerâmica regional',
    cost: 0,
    color: Colors.blue,
    icon: 'book-outline',
  },
];

export default function StoreScreen() {
  const [balance, setBalance] = useState(initialBalance);
  const [purchased, setPurchased] = useState<string[]>([]);

  const handlePurchase = (item: typeof storeItems[0]) => {
    if (purchased.includes(item.id)) {
      Alert.alert('Já adquirido', `Você já comprou "${item.title}".`);
      return;
    }

    if (balance < item.cost) {
      Alert.alert('Saldo insuficiente', 'Você não tem moedas suficientes.');
      return;
    }

    if (item.cost > 0) {
      setBalance(prev => prev - item.cost);
    }
    setPurchased(prev => [...prev, item.id]);
    Alert.alert('Sucesso', `Você adquiriu "${item.title}"!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LOJA CULTURAL</Text>
        <View style={styles.balanceContainer}>
          <Ionicons name="wallet-outline" size={16} color={Colors.white} />
          <Text style={styles.balanceText}>{balance}</Text>
        </View>
      </View>

      <FlatList
        data={storeItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemIconWrap}>
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePurchase(item)}
              style={[styles.priceTag, { backgroundColor: item.color }]}
            >
              <Text style={styles.priceText}>
                {purchased.includes(item.id) ? 'ADQUIRIDO' : item.cost > 0 ? `${item.cost} MOEDAS` : 'GRÁTIS'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blueDark,
    padding: 16,
    borderRadius: 12,
  },
  headerTitle: {
    fontFamily: Fonts.primary,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  balanceText: {
    fontFamily: Fonts.primary,
    fontSize: 14,
    color: Colors.white,
    marginLeft: 6,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  itemIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: Fonts.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: Colors.black,
  },
  itemDescription: {
    fontFamily: Fonts.primary,
    fontSize: 12,
    color: Colors.darkGray,
  },
  priceTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceText: {
    fontFamily: Fonts.primary,
    fontSize: 12,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
