import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../utils/mutations';
import { GET_USER } from '../utils/queries';

const DeleteBookButton = ({ userId, bookId }) => {
  const [deleteBook, { loading }] = useMutation(DELETE_BOOK, {
    variables: { 
        userId, 
        bookId 
    },
    refetchQueries: [{ 
        query: GET_USER, 
        variables: { _id: userId } }],
  })

  const handleDelete = async () => {
    await deleteBook()
  }

  return (
    <button onClick={handleDelete} disabled={loading}>X</button>
  )
}

export default DeleteBookButton;