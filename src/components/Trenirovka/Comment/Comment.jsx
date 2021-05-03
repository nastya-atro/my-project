import React from 'react';
import s from './../Trenirovka.module.css'

const Comment=(props)=>{
    return(
<div className={s.commentForm}>
    
    <div className={s.borderName}>{props.id}
    <div className={s.comment}>{props.comment}</div>
     
    </div>


</div>
    )
}

export default Comment