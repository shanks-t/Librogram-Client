import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { getBook, getCurrentUser } from "./UserManager"
import { CommentForm } from "../comment/CommentForm"
import { UserContext } from "./UserManager"


import { Image, Card, ListGroup, ListGroupItem, CardGroup } from "react-bootstrap"


export const UserBookDetails = () => {
    const [ showCommentForm, setShowCommentForm ] = useState(false)
    const [ showEditCommentForm, setShowEditCommentForm ] = useState(false)
    
    //const { bookId } = useParams()
    const { user, getUserBook, userBook } = useContext(UserContext)

    // const fetchBookInfo = () => {
    //     getBook(bookId).then(data => setBook(data))
    // }

    const handleCreateToggle = (id) => {
        if(showCommentForm) {
            setShowCommentForm(false)
        }else{ 
            setShowCommentForm(true)
        }
    }
    const handleEditToggle = (id) => {
        if(showEditCommentForm) {
            setShowEditCommentForm(false)
        }else{ 
            setShowEditCommentForm(true)
        }
    }


    useEffect(() => {
        console.log('userbookdeets', userBook)
    }, [userBook]);


    return (
        <>
        <div className="book-details">
        <Image variant="top" src={userBook.book?.image_path} style={{ height: '20rem'}}/>
        <CardGroup>
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{userBook.book?.title}</Card.Title>
                <Card.Text>{userBook.book?.subtitle}</Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        {userBook.book?.authors.map(a => (<p>{a.name}</p>))}
                    </ListGroupItem>
                    <ListGroupItem>{userBook.book?.publisher}</ListGroupItem>
                    <ListGroupItem>{userBook.book?.date_published}</ListGroupItem>
                    <ListGroupItem>{userBook.book?.page_count}</ListGroupItem>
                </ListGroup>
                <Card.Text>
                    {userBook.book?.description}
                </Card.Text>
            </Card.Body>
        </Card>
        </CardGroup>
        <Card>
    <Card.Body>
      <Card.Title>Comments</Card.Title>
      <ListGroup className="list-group-flush">
                {userBook.book?.comments?.map(comment => {
                    return <> <ListGroupItem>{comment.comment}</ListGroupItem>
                        <ListGroupItem>{comment.user.username}</ListGroupItem>
                        <ListGroupItem>{comment.created_on}</ListGroupItem>
                        {comment.user.id === user.id ?
                            <>
                                <button onClick={() => handleEditToggle()}>Edit your comment</button>
                                <button>Delete your comment</button>
                                {showEditCommentForm ?
                                    <CommentForm
                                    toggle={setShowCommentForm}
                                    book={userBook.book}
                                    id={comment.id} />
                                    : ""}
                            </>
                            : ""}
                    </>
                })}
                <button onClick={() => handleCreateToggle()}>Add comment</button>
                {showCommentForm ?
                    <CommentForm
                    toggle={setShowCommentForm}
                    book={userBook.book}
                    />
                    :""
                }
                <div className='tags'>
                    <h3>Tags</h3>
                    {
                        userBook.book?.tags?.map(tag => (
                            <p>{tag.label}</p>
                        ))
                    }
                </div>
            <div className='readers'>
                <h3>Who's checked out this book:</h3>
                {userBook.book?.readers_list?.map(reader => (
                    <p>{reader}</p>
                ))
                }
                </div>
                </ListGroup>
    </Card.Body>
  </Card>
  </div>
  </>
    )
}
