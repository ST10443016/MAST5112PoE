import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
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
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Christoffel</Text>
      </View>
      <View>
        <Text style={styles.summaryText}>Total: {totalMenuItems}</Text>
      </View>
      <View style={styles.arrayContainer}>
        <Text style={styles.arrayHeaderText}>Menu</Text>
        {menulist.map((menu, index) => (
          <Text key={index} style={styles.arrayText}>
            {menu.name} - {menu.description} - R{menu.price} - {menu.course}
          </Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.subHeadingText}>Name</Text>
        </View>
        <TextInput
          placeholder='Enter dish name'
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <View>
          <Text style={styles.subHeadingText}>Description</Text>
        </View>
        <TextInput
          placeholder='Enter description'
          onChangeText={setDescription}
          value={description}
          style={styles.input}
        />
        <View>
          <Text style={styles.subHeadingText}>Price</Text>
        </View>
        <TextInput
          placeholder='Enter price'
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
          style={styles.input}
        />
        <View>
          <Text style={styles.subHeadingText}>Courses</Text>
        </View>
        <View style={styles.pickerContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={handleSaveDish} style={styles.button}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableHighlight>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#1E0E62',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 10,
    width: '80%',
  },
  input: {
    fontSize: 20,
    borderColor: '#1E0E62',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#1E0E62',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 20,
    width: 130,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrayContainer: {
    padding: 10,
    height: 324,
    width: '100%',
    marginBottom: 10,
  },
  arrayHeaderText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E0E62',
    marginBottom: 10,
  },
  arrayText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',

  },
  summaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: 24,
  },
});

export default App;
