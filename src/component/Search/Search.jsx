import React, { useContext } from 'react'
import { AppContext } from '../../App'
import ComponentBook from '../ComponentBook/ComponentBook'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Search = () => {
  const {searchResult }= useContext(AppContext)

  return (
    <div style={{width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap"}}>
        <TransitionGroup style={{width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap"}} className={"t-s"}>
            {
                searchResult?.map((item, key)=> <CSSTransition key={item.item.book_id} timeout={300} classNames="item">
                    <ComponentBook width={"20%"} {...item.item} />
                </CSSTransition>)
            }
        </TransitionGroup>
    </div>
  )
}

export default Search