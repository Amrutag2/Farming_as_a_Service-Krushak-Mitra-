import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

function NameLogo() {



  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}> Krushak Mitra</h1>
        <img src="https://assets.letsendorse.com/le/1569936014_MLLzYtBtFMUGOyhkCD_15699360147541/2020/08/24/mffJn15982450052120.png"
          alt="Logo" style={styles.logo} />
      </div>    
    </div>
    
    
  );
}
export default NameLogo

const styles = {
  container: {

    backgroundColor: '#edf1d6',
    alignItems: 'center',

    padding: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: "#40513b",
  },
  logo: {
    width: '180px',
    height: '90px',
  },
};