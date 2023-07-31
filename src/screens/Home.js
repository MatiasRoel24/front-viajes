import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import { currencyFormat } from '../utils/numbers';
import CircularProgress from 'react-native-circular-progress-indicator'
import Presupuesto from '../components/Presupuesto/Presupuesto';
import InputMexicanos from '../components/InputMexicanos/InputMexicanos';

export default function Home() {
  const { totalesProducts, getProducts, presupuesto, valorMexicano } = useAuth();
  useEffect(() => {
    (async () => {
      await loadProducts();
    })()
  }, []);

  const loadProducts = async () => {
    try {
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  const dolaresToString = String(totalesProducts.totalDolares);
  const mexicanosToString = String(totalesProducts.totalMexicanos);
  const pesosToString = String(totalesProducts.totalPesos);

  let porcentajeHome = 0;

  if(presupuesto && presupuesto!==0) {
    porcentajeHome = (totalesProducts.totalDolares * 100) / presupuesto;
  }

  return (
    <View>
      <Text style={styles.textoInicio}>Presupuesto</Text>
      <View style={styles.containerCircular}>
        <CircularProgress
          radius={90}
          value={isNaN(porcentajeHome)  ? 0 : porcentajeHome}
          titleColor='red'
          titleFontSize={20}
          valueSuffix={'%'}
          inActiveStrokeColor='black'
          inActiveStrokeOpacity={0.2}
          duration={3000}
        />
        {
        presupuesto ? (
          <Text style={styles.textoPresupuesto}>Mi presupuesto: ${presupuesto}</Text>
        ): <Presupuesto />
      }
      {
        valorMexicano ? (
          null
        ): <InputMexicanos />
      }
      
      </View>

      <View style={styles.containerTotales}>
        <Text style={styles.tituloTotales}>Cantidad de gastos totales: </Text>
        <Text style={styles.textoTotales}>Dolares totales: {`$${currencyFormat(dolaresToString)}`}</Text>
        <Text style={styles.textoTotales}>Mexicanos totales: {`$${currencyFormat(mexicanosToString)}`}</Text>
        <Text style={styles.textoTotales}>Pesos totales: {`$${currencyFormat(pesosToString)}`}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  textoInicio: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    textTransform: 'uppercase',
  },
  containerCircular: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoPresupuesto: {
    marginTop: 20,
    fontSize: 25,
  },
  tituloTotales: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  containerTotales: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textoTotales: {
    fontSize: 20,
    marginTop: 10,
  }
})