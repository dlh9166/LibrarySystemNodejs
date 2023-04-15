import React from 'react'

const Category = () => {
  return (
    <div style={{width: "100%", backgroundImage: "url(https://res.cloudinary.com/cockbook/image/upload/v1676981245/single/image_2_vybzcj.png)", filter: "grayscale(100%)"}}>
        <div style={{margin: "12px 0", fontSize: 20, fontWeight: 600, textAlign: "center"}}>What interest you ?</div>
        <div className="c-flex-center" style={{width: "100%", padding: 10, gap: 50}}>
            <div>
                <div style={{textAlign: 'center', margin: "12px 0"}}>Fiction books</div>
                <div style={{width: 300, flexWrap: "wrap", gap: 20}} className={"c-flex-center"}>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Horror</div>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Drama</div>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Mystery</div>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Sci-fi</div>
                </div>
            </div>
            <div>
                <div style={{textAlign: 'center', margin: "12px 0"}}>Non fiction books</div>
                <div style={{width: 300, flexWrap: "wrap", gap: 20}} className={"c-flex-center"}>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Art</div>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Biology</div>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Sports</div>
                    <div style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>Travel</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category