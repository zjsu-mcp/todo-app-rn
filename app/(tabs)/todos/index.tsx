import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TodoService, type Todo } from '../../../services/api';
import { Link } from 'expo-router';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await TodoService.list();
        setTodos(response.data.data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      {item.dueDate && <Text>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>}
      <Link href={`./${item.id}`} asChild>
        <TouchableOpacity style={styles.detailsButton}>
          <Text>View Details</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No todos found</Text>}
      />
      <Link href="./new" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text>Add Todo</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    alignItems: 'center',
  },
  addButton: {
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});