import React, {useState} from 'react';
import s from './Paginator.module.css'
import cn from "classnames"

const Paginator=({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize=10})=>{
    let pageNumber = Math.ceil(totalUsersCount /pageSize)

    let page = [];

    for (let i = 1; i <= pageNumber; i++) {
        page.push(i)
    }

    let portionCount=Math.ceil(pageNumber/portionSize);
    let [numberPortion, setnumberPortion] = useState(1)
    let leftPortionPageNumber=(numberPortion-1)*portionSize+1;
    let rightPortionPageNumber=numberPortion*portionSize;


    return(
 <div className={s.paginator}>
     {numberPortion>1 &&<button onClick={()=>{setnumberPortion(numberPortion-1)}}>Prev</button>}
            {page
            .filter(p=> p >= leftPortionPageNumber && p <=rightPortionPageNumber)
            .map(p => {
                return <span className={cn({
                    [s.activePage]: currentPage === p
                }, s.pageNumber)}
                    key={p}
                    onClick={(e) => { onPageChanged(p) }}
                >{p} </span>
            })}
    {numberPortion<portionCount && <button onClick={()=>{setnumberPortion(numberPortion+1)}}>Next</button>}
        </div>
    )
}

export default Paginator 