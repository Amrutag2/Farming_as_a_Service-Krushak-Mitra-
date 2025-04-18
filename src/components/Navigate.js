import React,{useState} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
    
    Link
} from "react-router-dom";

import './Navigate.css'

function Navigate() {
   
    return (
        <div>

            <Navbar style={{ backgroundColor: "#40513B" }} expand="lg">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" style={{ backgroundColor: "#40513B" }}>
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    <Link to="/userDetails" ><Nav className="togle" >मुख्यपृष्ठ</Nav></Link>
                    <Link to="/chat"><Nav className="togle" >संभाषण</Nav></Link>
                    <Link to="/scheme"><Nav className="togle" >योजना</Nav></Link>
                    <Link to="/fertilizer"><Nav className="togle"  >खत</Nav></Link>
                    <Link  to="/sign-in"><Nav className="togle" >नोंदणी करा</Nav></Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            

        </div>
    )
}

export default Navigate
