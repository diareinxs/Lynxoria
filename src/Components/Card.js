import React from "react";
import { useState } from "react";
import Modal from "./Modal";
const Card = ({ book }) => {

    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    console.log(book)
    const handleBack = () => setShow(false);
    
    return (
        <>
            {
                book.map((item) => {
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount=item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    if(thumbnail!= undefined && amount !=undefined)
                    {
                        return (
                            <>
                            <div className="card" onClick={()=>{setShow(true);setItem(item)}}>
                                <img src={thumbnail} alt="" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#8369;{amount}</p>
                                </div>
                            </div>
                            <Modal 
                                show={show} 
                                item={bookItem} 
                                onClose={()=>setShow(false)}
                                onBack={handleBack}
                            />
                            </>
                        )
                    }
                    
                })
            }

        </>
    )
}
export default Card;