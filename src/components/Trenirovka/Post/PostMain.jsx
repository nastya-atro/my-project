import React from 'react';
import Posts from './Posts';
import s from './../Trenirovka.module.css'


const PostMain = (props) => {

   
    let buttonPost = (e) => {
        e.preventDefault()
        props.buttonPostContainer()
    }

    let postChange =(e)=>{
        let post = e.target.value
        props.postChangeContainer(post)
    }

    let postElement = props.post.map((el) => (<Posts name={el.name} avatar={el.avatar} post={el.post} likesCount={el.likesCount} />))

   

    return (
        <div>
            <div>
                <div className={s.messages}>My Posts:</div>
            </div>

            <div className={s.posts}>
                <div>  {postElement} </div>

            </div>
            <div>

                <form>
                    <div>
                        <input value={props.newPostText} onChange={postChange} type="textarea"></input>
                        <div>
                            <button onClick={buttonPost}>Post Submit</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default PostMain;