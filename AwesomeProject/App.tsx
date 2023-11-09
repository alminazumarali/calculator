import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  input: {
    height: 50,
    margin: 50,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button1: {
    padding: 40,
    borderWidth: 5,
    margin: 2,
  },
  button2: {
    padding: 40,
    margin: 2,
    borderWidth: 5,
    width: 200,
  },
});
let arr: (string | number)[] = [0];
const App = () => {
  const [res, setres] = useState('');
  const oper = (v: string) => {
    if (v >= '0' && v <= '9' && !isNaN(Number(arr[arr.length - 1]))) {
      arr[arr.length - 1] = Number(arr[arr.length - 1]) * 10 + parseInt(v);
    } else if (arr[arr.length - 1] == '.') {
      if (!isNaN(Number(arr[arr.length - 2]))) {
        const a = parseInt(v) / 10;
        arr.pop();
        arr[arr.length - 1] = Number(arr[arr.length - 1]) + a;
      } else {
        arr.pop();
        const a = parseInt(v) / 10;
        arr.push(a);
      }
    } else {
      arr.push(v);
    }
  };
  const cal = () => {
    // for(var i in arr)
    // {
    //   console.log(arr[i]);
    // }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == '*') {
        arr[i - 1] = Number(arr[i - 1]) * Number(arr[i + 1]);
        arr.splice(i, 2);
        i--;
      } else if (arr[i] == '/') {
        arr[i - 1] = Number(arr[i - 1]) / Number(arr[i + 1]);
        arr.splice(i, 2);
        i--;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == '+') {
        arr[i - 1] = Number(arr[i - 1]) + Number(arr[i + 1]);
        arr.splice(i, 2);
        i--;
      } else if (arr[i] == '-') {
        arr[i - 1] = Number(arr[i - 1]) - Number(arr[i + 1]);
        arr.splice(i, 2);
        i--;
      }
    }
    return arr[0];
  };
  const onPress = (x: string) => {
    if (x == '=') {
      try {
        setres(cal().toString());
      } catch (error) {
        setres('Error');
      }
    } else if (x === 'C') {
      setres('');
      arr = [0];
    } else if (x === 'DEL') {
      arr.pop();
      setres(res.slice(0, -1));
    } else {
      if (x === 'Error') {
        setres('');
      }
      oper(x);
      setres(res + x);
    }
  };

  const BtnTemplate = (props:{data:string,styleData:StyleProp<any>}) => {
    const {data}= props
    return (
      <TouchableOpacity  style={styles.button1}  onPress={() => onPress(data)}>
        <Text>{data}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <Text style={styles.text}>CALCULATOR</Text>
      <View>
        <Text style={styles.input}>{res}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.button2} onPress={() => onPress('C')}>
          <Text>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => onPress('DEL')}>
          <Text>DEL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
      <BtnTemplate data ={'1'} styleData={styles.button2} />
      <BtnTemplate data ={'2'} styleData={styles.button2} />
      <BtnTemplate data ={'3'} styleData={styles.button2} />
      <BtnTemplate data ={'+'} styleData={styles.button2} />
      </View>
      <View style={styles.button}>
      <BtnTemplate data ={'4'} styleData={styles.button2} />
      <BtnTemplate data ={'5'} styleData={styles.button2} />
      <BtnTemplate data ={'6'} styleData={styles.button2} />
      <BtnTemplate data ={'-'} styleData={styles.button2} />
      </View>
      <View style={styles.button}>
      <BtnTemplate data ={'7'} styleData={styles.button2} />
      <BtnTemplate data ={'8'} styleData={styles.button2} />
      <BtnTemplate data ={'9'} styleData={styles.button2} />
      <BtnTemplate data ={'*'} styleData={styles.button2} />
      </View>
      <View style={styles.button}>
      <BtnTemplate data ={'0'} styleData={styles.button2} />
      <BtnTemplate data ={'.'} styleData={styles.button2} />
      <BtnTemplate data ={'='} styleData={styles.button2} />
      <BtnTemplate data ={'/'} styleData={styles.button2} />
      </View>
        {/* <TouchableOpacity style={styles.button1} onPress={() => onPress('3')}>
          <Text>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('*')}>
          <Text>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('4')}>
          <Text>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('5')}>
          <Text>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('6')}>
          <Text>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('/')}>
          <Text>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('7')}>
          <Text>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('8')}>
          <Text>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('9')}>
          <Text>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('+')}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('0')}>
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('.')}>
          <Text>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('=')}>
          <Text>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => onPress('-')}>
          <Text>-</Text>
        </TouchableOpacity> */}
      
    </SafeAreaView>
  );
};

export default App;
