import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../Router';
import { useGetAllProductsQuery } from '../services/product';
import humanize from '../utils/humanize';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductListScreen'>;

export default function ProductListScreen({ navigation }: Props) {
  const query = useGetAllProductsQuery(undefined);

  return (
    <SafeAreaView style={styles.sav}>
      <View style={styles.header}>
        <Text style={styles.title}>All Products</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProductScreen')}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={query.data ?? []}
        onRefresh={() => query.refetch()}
        refreshing={query.isFetching}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.box}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', { product: item })
            }>
            <View style={styles.boxLeft}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.boxLeft}>
              <Text>{humanize.currency(item.harga)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: { fontSize: 22 },
  box: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  boxRight: {},
  itemName: {
    fontSize: 18,
  },
  itemDesc: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.8)',
  },
  img: {
    width: 40,
    height: 40,
  },
  separator: {
    height: 4,
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 6,
  },
  addButtonText: {
    color: 'white',
  },
});
