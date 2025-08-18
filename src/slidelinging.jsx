import React from "react";
import ReactDom from "react-dom";
import "../src/slidelinging.css";


export default class slidelinging extends React.Component {
    render() {
        return <>
            <div className="wall">
                <div className="headling">
                    { <h1 className="typewriter"> Welcome to Library priyanka rajnandni jhgf hjgsdf hjdfgjh hjgruy3 hevryuiwr</h1> }
                </div>
                {
                    <div class="slide-track">
                    <div class="slide"><img src="public/Images/bg1.jpg" alt="1" /></div>
                    <div class="slide"><img src="public/Images/bg4.jpg" alt="1" /></div>
                    <div class="slide"><img src="public/Images/bg2.jpg" alt="1" /></div>
                    <div class="slide"><img src="public/Images/bg5.jpg" alt="1" /></div>
                    <div class="slide"><img src="public/Images/bg3.jpg" alt="1" /></div>
                    <div class="slide"><img src="public/Images/bg8.jpg" alt="1" /></div>
                    <div class="slide"><img src="public/Images/bg7.jpg" alt="2" /></div>
                    <div class="slide"><img src="public/Images/bg1.jpg" alt="2" /></div>
                    <div class="slide"><img src="public/Images/bg9.jpg" alt="2" /></div>

                </div>}

            </div>


        </>
    }

}