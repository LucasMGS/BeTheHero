import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles.js';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents,setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function loadIncidents() {
    if (isLoading) 
        return;

    if (totalIncidents > 0 && incidents.length === totalIncidents)
      return;

    setIsLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents ,...response.data]);
    setTotalIncidents(response.headers['x-total-incidents']);
    setPage(page + 1);
    setIsLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigationToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return(
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg } />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalIncidents} caso(s)</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>
    
    <FlatList 
      data={incidents}
      style={styles.incidentList}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      renderItem={({item: incident}) => (
        <View style={styles.incident}>
          <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL'
            }).format(incident.value)}
          </Text>

          <TouchableOpacity
            style={styles.detailsButton} 
            onPress={() => navigationToDetail(incident)}>
              <Text style={styles.detailsButtonText}>
                Ver mais detalhes
              </Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
          </TouchableOpacity>
      </View>
      )}
      />
  </View>
    </>
  );
}
