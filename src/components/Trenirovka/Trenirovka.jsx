import React from 'react';
import s from './Trenirovka.module.css'
import DialogMainContainer from './Dialog/DialogMainContainer';
import PostMainContainer from './Post/PostMainContainer';
import CommentMainContainer from './Comment/CommentMainContainer';




const Trenirovka = (props) => {

    return (
        <div>

            <DialogMainContainer />
            <PostMainContainer />
            <CommentMainContainer />

        </div>
    )
}

export default Trenirovka;