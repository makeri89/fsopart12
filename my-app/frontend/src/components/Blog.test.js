import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('correct rendering on different cases', () => {
    let component
    
    beforeEach(() => {
        const blog = {
            title: 'testing content',
            author: 'jest tester',
            url: 'test.com',
            user: {
                username: 'test'
            }
        }
    
        const user = {
            username: 'test'
        }

        component = render(
            <Blog blog={blog} user={user}/>
        )
    })

    test('renders content', () => {    
        const button = component.container.querySelector('button')
        console.log(prettyDOM(button))
    
        expect(component.container).toHaveTextContent(
            'testing content'
        )
    
        //This tests that only the title and author are rendered
        const element = component.getByText(
            'testing content jest tester'
        )
        expect(element).toBeDefined()
    
        const div = component.container.querySelector('.initialBlog')
        expect(div).toHaveTextContent(
            'testing content'
        )
    })
    
    test('renders all contents', () => {
        
        const button = component.getByText('view')
        fireEvent.click(button)
        
        //This will test if the amount of likes is rendered
        expect(component.container).toHaveTextContent(
            'This blog has'
        )
    })
})

test('like is clicked twice', () => {
    const blog = {
        title: 'testing content',
        author: 'jest tester',
        url: 'test.com',
        user: {
            username: 'test'
        }
    }

    const user = {
        username: 'test'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} doALike={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
