import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from '../Todos/Todo'
import { beforeEach, expect } from 'vitest'

describe('<Todo />', () => {
  const user = userEvent.setup()
  const mockTodo = { id: 1, text: 'Test Todo', done: false }
  const mockDelete = vi.fn()
  const mockComplete = vi.fn()

  beforeEach(() => {
    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockDelete}
        onClickComplete={mockComplete}
      />,
    )
  })

  test('renders the todo text', () => {
    expect(screen.getByText('Test Todo')).toBeDefined()
  })

  test('renders the todo text', () => {
    expect(screen.getByText('Test Todo')).toBeDefined()
  })

  test('clicking the set as done button calls event handler once', async () => {
    await user.click(screen.getByRole('button', { name: 'Set as done' }))

    expect(mockComplete.mock.calls).toHaveLength(1)
  })

  test('clicking the delete button calls event handler once', async () => {
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(mockDelete.mock.calls).toHaveLength(1)
  })
})
