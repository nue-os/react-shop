import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const TodoInput = () => {
  return (
    <InputGroup className="mt-5 mb-5">
      <Form.Control type="text-area" aria-label="With textarea" />
      <Button variant="outline-secondary" id="button-addon2">
        할일 등록
      </Button>
    </InputGroup>
  )
}

export default TodoInput
