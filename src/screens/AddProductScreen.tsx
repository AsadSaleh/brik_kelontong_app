import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { Product, useAddProductMutation } from '../services/product';
import { Formik } from 'formik';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router';

type Props = NativeStackScreenProps<RootStackParamList, 'AddProductScreen'>;

type MyFormValues = Omit<Partial<Product>, '_id' | 'id' | 'harga'> & {
  harga: string;
  length?: string;
  width?: string;
  height?: string;
  weight?: string;
};

export default function AddProductScreen({ navigation }: Props) {
  const [createProduct, { isLoading }] = useAddProductMutation();

  async function handleSubmitForm(v: MyFormValues) {
    try {
      await createProduct({
        ...v,
        harga: Number(v.harga),
        length: Number(v.length),
        width: Number(v.width),
        height: Number(v.height),
        weight: Number(v.weight),
      }).unwrap();
      navigation.canGoBack() && navigation.goBack();
    } catch (error) {
      console.error('rejected', error);
    }
  }

  async function handleAddRandomProduct() {
    try {
      await createProduct({
        name: 'Random Name',
        description: 'Random Description',
        categoryId: 888,
        categoryName: 'Random Category',
        harga: 90000,
        height: 10,
        width: 11,
        length: 12,
        weight: 1000,
        id: Math.floor(Math.random() * 1000),
      }).unwrap();
      navigation.canGoBack() && navigation.goBack();
    } catch (error) {
      console.error('rejected', error);
    }
  }

  const initialValues: MyFormValues = {
    name: '',
    categoryName: '',
    description: '',
    harga: '',
  };
  return (
    <SafeAreaView style={styles.sav}>
      <ScrollView style={styles.container}>
        <Formik<MyFormValues>
          initialValues={initialValues}
          onSubmit={handleSubmitForm}>
          {formik => (
            <>
              <Text style={styles.sectionTitle}>Informasi Utama</Text>
              <TextInput
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                style={styles.input}
                placeholder="Nama produk"
              />
              <TextInput
                value={formik.values.harga}
                onChangeText={formik.handleChange('harga')}
                style={styles.input}
                placeholder="Harga"
                keyboardType="numeric"
              />
              <TextInput
                value={formik.values.categoryName}
                onChangeText={formik.handleChange('categoryName')}
                style={styles.input}
                placeholder="Kategori"
              />
              <TextInput
                value={formik.values.sku}
                onChangeText={formik.handleChange('sku')}
                style={styles.input}
                placeholder="SKU"
              />

              <View style={{ height: 20 }} />
              <Text style={styles.sectionTitle}>
                Informasi Tambahan (opsional)
              </Text>
              <TextInput
                value={formik.values.length}
                onChangeText={formik.handleChange('length')}
                style={styles.input}
                placeholder="Panjang (cm)"
                keyboardType="numeric"
              />
              <TextInput
                value={formik.values.width}
                onChangeText={formik.handleChange('width')}
                style={styles.input}
                placeholder="Lebar (cm)"
                keyboardType="numeric"
              />
              <TextInput
                value={formik.values.height}
                onChangeText={formik.handleChange('height')}
                style={styles.input}
                placeholder="Tinggi (cm)"
                keyboardType="numeric"
              />
              <TextInput
                value={formik.values.weight}
                onChangeText={formik.handleChange('weight')}
                style={styles.input}
                placeholder="Berat (gram)"
                keyboardType="numeric"
              />

              <View style={{ height: 80 }} />
              <TouchableOpacity
                disabled={isLoading}
                onPress={formik.handleSubmit}
                style={styles.addButton}>
                <Text style={styles.addButtonText}>Simpan Produk</Text>
                {isLoading && (
                  <>
                    <View style={{ width: 10 }} />
                    <ActivityIndicator size="small" color="white" />
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={handleAddRandomProduct}>
          <Text style={{ textAlign: 'center' }}>Add Random Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: { fontSize: 18, marginBottom: 5 },
  input: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});
