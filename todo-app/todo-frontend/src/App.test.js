import { render, screen } from '@testing-library/react';
import Todo from './Todos/Todo';

const mockTodo = {
  "text": "Configure tests",
  "done": false
}

const mockDelete = () => {
  console.log('Delete todo')
}

const mockComplete = () => {
  mockTodo.done = true
}

test('renders todo', () => {
  render(<Todo 
          todo={mockTodo} 
          onClickDelete={mockDelete} 
          onClickComplete={mockComplete}
        />)
  const todotext = screen.getByText(/Configure tests/i)
  expect(todotext).toBeInTheDocument()
})