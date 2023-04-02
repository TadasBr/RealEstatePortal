import React, { useEffect, useState } from "react"
import Header from "../main/Header";
import './advertisiments.css';

const Advertisement: React.FC = (id) => {
  const [item, setItem] = useState<any>();

  useEffect(() => {
    debugger;
    fetch('http://localhost:5064/api/advertisements/2')
      .then(response => response.json())
      .then(data => setItem(data));
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="listBox">
        <div className="listItem">
          <div className="photo">
          </div>
          <div className="descriptionBox">
            <div className="title">
              {item.title}
            </div>
            <div>
              {item.city}, {item.district}, {item.address}
            </div>
            <div>
              {item.price}€
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advertisement;