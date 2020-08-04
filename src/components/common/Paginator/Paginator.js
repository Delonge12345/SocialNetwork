import React, {useState} from 'react';
import classes from "./Paginator.module.css";


let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {


    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    // let paginationPages = pages
    return <div className={classes.paginator}>
        <div className={classes.btnPos}>
        {portionNumber > 1 && <button className={classes.btnPrev} onClick={() => {setPortionNumber(portionNumber - 1)}}> &#10094; Назад</button>}
        </div>


        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p =>
                <span onClick={(e) => {
                    onPageChanged(p)
                }} className={currentPage === p && classes.selectedPage}>{p}</span>
            )

        }
        <div className={classes.btnPos}>
            {portionCount > portionNumber && <button className={classes.btnNext} onClick={() => {setPortionNumber(portionNumber + 1)}}> Вперед &#10095;</button>}
        </div>

    </div>


}


export default Paginator;