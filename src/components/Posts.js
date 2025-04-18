import React, { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import Form from "react-bootstrap/form"
import Nav from "./Navigate"
import "./posts.css"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Posts() {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [crop, setCrop] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("");
    const [allImage, setAllImage] = useState([]);
    const [fertilizer, setFertilizer] = useState([])
    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);

    function covertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64encoded string  
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    function uploadImage() {
        fetch("http://localhost:5000/post-fertilizer", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                name: name,
                desc: desc,
                crop: crop,
                price: price,
                base64: image,
            })
        }).then((res) => res.json()).then((data) => console.log(data))
    }

    function getFertilizer() {
        fetch("http://localhost:5000/get-fertilizer", {
            method: "GET",
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setAllImage(data.data)
        })
    }

    const deletefertilizer = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}and ${id}`)) {
            fetch("http://localhost:5000/deletefertilizer", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    ferti_id: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getFertilizer();
                });
        } else {
        }
    };

    const update = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}and ${id}`)) {
            fetch("http://localhost:5000/updatefertilizer", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data, "userData");
                    setFertilizer(data.data);
                });

        }

    }

    useEffect(() => {
        
        getFertilizer()
    }, [])



    return (
        <div className='auth-wrapper' style={{ height: "auto" }}>
            
            <div className='post-wrapper' style={{ height: "auto" }}>
                <h1>Fertilizer</h1>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <input type="message"
                        className="form-control"
                        placeholder="Write Message"

                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Crop</Form.Label>
                    <input type="message"
                        className="form-control"
                        placeholder="Write Message"

                        onChange={(e) => setCrop(e.target.value)}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <input type="message"
                        className="form-control"
                        placeholder="Write Message"

                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Price</Form.Label>
                    <input type="message"
                        className="form-control"
                        placeholder="Write Message"

                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>
                <br></br>
                <Form.Label>Image </Form.Label>
                <br></br>
                <input
                    accept="image/*"
                    type="file"
                    onChange={covertToBase64}
                />
                {image == "" || image == null ? "" : <img width={100} height={100} src={image} />}
                <button className='button' onClick={uploadImage}>Submit</button>
                <br />
                <br />
                <button className='button' onClick={uploadImage}>Update</button>

            </div>
            <div className='showpost-wrapper' >

                <br />
                {allImage.map(data => {
                    return (
                        <div className='postgetapi'>
                            <Card style={{ width: '20rem' }}>
                                <Card.Img variant="top" src={data.image} />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "24px" }}>{data.name}</Card.Title>
                                    <Card.Text>
                                        {data.desc}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{data.crop}</ListGroup.Item>
                                    <ListGroup.Item>{data.price}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <FontAwesomeIcon
                                            icon={faTrash} style={{ position: "relative", width: "20px", height: "20px", padding: "10px" }}
                                            onClick={() => deletefertilizer(data._id, data.name)}
                                        /> <p> Delete</p>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <FontAwesomeIcon
                                            icon={faEdit} style={{ position: "relative", width: "20px", height: "20px", padding: "10px" }}
                                            onClick={() => deletefertilizer(data._id, data.name)}
                                        /> <p> Edit</p>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Card>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default Posts
