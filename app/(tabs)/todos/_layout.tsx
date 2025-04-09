import { Stack } from 'expo-router';

export default function TodoLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Todos' }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Todo Details' }} 
      />
      <Stack.Screen 
        name="new" 
        options={{ title: 'New Todo' }} 
      />
    </Stack>
  );
}