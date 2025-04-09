import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TodoService, type Todo } from '../../../services/api';
import { useLocalSearchParams } from 'expo-router';

export default function TodoDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await TodoService.get(id);
        setTodo(response.data);
      } catch (error) {
        console.error('Failed to fetch todo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text>Todo not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text>{todo.description}</Text>
      <Text>Status: {todo.status}</Text>
      {todo.dueDate && <Text>Due: {new Date(todo.dueDate).toLocaleDateString()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});