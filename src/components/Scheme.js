import React, { useState, useEffect } from 'react';
//pdf is for admin page
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Navigate';

function Scheme() {
    const [file, setFile] = useState();
    const [pdfUrl, setPdfUrl] = useState();
    const [scheme, setScheme] = useState([])
    const current = new Date();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('date', date);
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        });
        const url = await response.text();
        alert('File uploaded successfully');
        console.log(url);
        setPdfUrl("url")
    };

    const getallScheme = () => {
        fetch("http://localhost:5000/postscheme", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "scheme");
                setScheme(data.data)

            })
    }

    useEffect(() => {
        getallScheme()
    }, [])

    return (
        <div>
            
            <div className='auth-inner' style={{ width: "700px" }}>
                <h1>Admin scheme post page</h1>
                <div className="mb-3">
                    <label>Date</label>
                    <input placeholder={date} />
                </div>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="title"
                        className="form-control"
                        placeholder="Enter title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <input
                        type="desc"
                        className="form-control"
                        placeholder="Enter Description"
                        onChange={(e) => setDesc(e.target.value)}
                    />

                </div>
                <input type="file" onChange={handleFileInputChange} />
                <button onClick={handleFileUpload}>Upload pdf</button>
                {pdfUrl && (
                    <a href={pdfUrl} > Document</a>

                )}

            </div>
            <div className='auth-wrapper'>
                <div className='auth-inner'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Document</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheme.map(schemes => (
                                <tr>

                                    <td style={{ width: "200px" }}>{schemes.date}</td>
                                    <td style={{ width: "400px" }}>{schemes.title}</td>
                                    <td style={{ width: "600px" }}>{schemes.desc}</td>
                                    <td>{schemes.documents}</td>
                                </tr>


                            ))}

                        </tbody>
                    </table>

                </div>
            </div>


        </div>
    )
};

export default Scheme;