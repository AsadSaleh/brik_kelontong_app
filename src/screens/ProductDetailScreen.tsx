import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router';
import { useGetProductByIdQuery } from '../services/product';
import humanize from '../utils/humanize';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>;

export default function ProductDetailScreen(props: Props) {
  const query = useGetProductByIdQuery(props.route.params.product._id);

  return (
    <SafeAreaView style={styles.sav}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: query.data?.image }} style={styles.imageBig} />
        </View>
        <View style={styles.gridItemContainer}>
          <GridItem
            label="Nama Produk"
            value={query.data?.name ?? ''}
            flex={3}
          />
          <GridItem
            label="Harga"
            value={humanize.currency(query.data?.harga ?? 0)}
            flex={2}
          />
        </View>
        <View style={styles.gridItemContainer}>
          <GridItem
            label="Deskripsi"
            value={query.data?.description ?? ''}
            flex={3}
          />
          <GridItem
            label="Category"
            value={query.data?.categoryName ?? ''}
            flex={2}
          />
        </View>
        <View style={styles.gridItemContainer}>
          <GridItem
            label="Panjang"
            value={query.data?.length.toString() + 'cm' ?? ''}
            flex={2}
          />
          <GridItem
            label="Lebar"
            value={query.data?.width.toString() + 'cm' ?? ''}
            flex={2}
          />
          <GridItem
            label="Tinggi"
            value={query.data?.height.toString() + 'cm' ?? ''}
            flex={2}
          />
          <GridItem
            label="Berat"
            value={query.data?.weight.toString() + 'gram' ?? ''}
            flex={2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function GridItem({
  label,
  value,
  flex = 1,
}: {
  label: string;
  value: string;
  flex?: number;
}) {
  return (
    <View style={{ flex }}>
      <Text style={styles.labelText}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  imageBig: {
    width: 120,
    height: 80,
  },
  labelText: {
    fontWeight: '500',
    fontSize: 14,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
