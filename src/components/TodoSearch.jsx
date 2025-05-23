import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const TodoSearch = () => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        검색하기
      </Button>
      <Button variant="outline-secondary" id="button-addon2">
        초기화
      </Button>
    </InputGroup>
  )
}

export default TodoSearch
