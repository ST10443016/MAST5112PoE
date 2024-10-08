import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

interface Course {
  id: number;
  name: string;
  type: string;
}

interface Menu {
  name: string;
  description: string;
  course: string;
  price: number;
}

const courseArray: Course[] = [
  {id: 1, name: "Hors D'Oeurves", type: "Hors D'Oeurves"},
  {id: 2, name: "Amuse-Bouche", type: "Amuse-Bouche"},
  {id: 3, name: "Soup", type: "Soup"},
  {id: 4, name: "Salad", type: "Salad"},
  {id: 5, name: "Appetizer", type: "Appetizer"},
  {id: 6, name: "Fish", type: "Fish"},
  {id: 7, name: "Main Entree", type: "Main Entree"},
  {id: 8, name: "Palate", type: "Cleanser"},
  {id: 9, name: "Second Main Entree", type: "Second Main Entree"},
  {id: 10, name: "Cheese", type: "Cheese"},
  {id: 11, name: "Dessert", type: "Dessert"},
  {id: 12, name: "Mignardise", type: "Mignardise"},
];

function App(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [menulist, setMenuList] = useState<Menu[]>([]);

  const totalMenuItems = useMemo(() => menulist.length, [menulist]);

  const handleSaveDish = (): void => {
    let theName = name.trim();
    let theDescription = description.trim();
    let thePrice = parseFloat(price);
    let theCourse = course;

    let errors: string[] = [];

    if (!theName) {
      errors.push("Dish name is required")
    }

    if (!theDescription) {
      errors.push("Description is required")
    }

    if (!theCourse) {
      errors.push("Course is required")
    }

    if (isNaN(thePrice) || thePrice <= 0) {
      errors.push("The price must be a positive number");
    }

    if (errors.length > 0) {
      return;
    }

    const newMenu: Menu = {name: theName, description: theDescription, course: theCourse, price: thePrice};
    setMenuList([...menulist, newMenu]);
    setName('');
    setDescription('');
    setPrice('');
    setCourse('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Christoffel</Text>
      </View>
      <View>
        <Text style={styles.summaryText}>Total: {totalMenuItems}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter dish name'
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder='Enter description'
          onChangeText={setDescription}
          value={description}
          style={styles.input}
        />
        <TextInput
          placeholder='Enter price'
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
          style={styles.input}
        />
        <Picker
          onValueChange={(itemValue: string) => { setCourse(itemValue); }}
          selectedValue={course}
          style={styles.picker}
        >
          {courseArray.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={handleSaveDish} style={styles.button}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.arrayContainer}>
        <Text style={styles.arrayHeaderText}>Menu</Text>
        {menulist.map((menu, index) => (
          <Text key={index} style={styles.arrayText}>
            {menu.name} - {menu.description} - R{menu.price} - {menu.course}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    backgroundColor: '#1E0E62',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#1E0E62',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    borderColor: '#1E0E62',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 20,
    width: 150,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrayContainer: {
    padding: 10,
    width: '100%',
  },
  arrayHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E0E62',
    marginBottom: 10,
  },
  arrayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
