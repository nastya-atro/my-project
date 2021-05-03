import React from 'react';
import s from './../Trenirovka.module.css'
import Comment from './Comment';


const CommentMain = (props) => {
    let buttonComment = (e) => {
        e.preventDefault()
        props.buttonCommentContainer()
    }
 
    let commentChange = (e) => {
        let comment =e.target.value
        props.commentChangeContainer(comment)
    }



    let commentElement = props.comment.map((el) => (<Comment id={el.id} comment={el.comment} />))

    return (
        <div>

            <div className={s.messages}>My Photos:</div>
            <div className={s.imgComment}><img src="https://i.playground.ru/i/pix/1309494/image.jpg"></img></div>
            <div>
                {commentElement}
            </div>

            <form>
                <div>
                    <input onChange={commentChange} value={props.newCommentText} type="textarea"></input>
                    <div>
                        <button onClick={buttonComment}>Comment Submit</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default CommentMain;