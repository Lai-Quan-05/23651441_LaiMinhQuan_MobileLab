import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

type Todo = {
  id: string;
  title: string;
};

const TodoListBasic = () => {
  const [todos] = useState<Todo[]>([
    { id: '1', title: 'ReactJS' },
    { id: '2', title: 'React Native' },
    { id: '3', title: 'Todo List' },
    { id: '4', title: 'CSS' },
    { id: '5', title: 'Nấu cơm tối' },
  ]);

  return (
    <ScrollView style={{ padding: 20 }}>
      {todos.map((item) => (
        <View key={item.id} style={{ paddingVertical: 8 }}>
          <Text style={{ fontSize: 18 }}>- {item.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TodoListBasic;