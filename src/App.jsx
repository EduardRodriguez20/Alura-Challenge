import React, { useState } from 'react'
import PopUpCreate from './PopUpCreate'
import './App.css'

function App() {
  const [showPopUp, setShowPopUp] = useState(false); // Estado para controlar la visibilidad del PopUp
  const [videoList, setVideoList] = useState([]); // Estado para almacenar la lista de videos

  const categories = ['backend', 'frontend', 'innovacion y gestion'];

  const openPopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const saveFormData = (formData) => {
    setVideoList([...videoList, formData]); // Agregar el nuevo video a la lista
    closePopUp(); // Cerrar el pop-up después de guardar los datos
  };

  return (
    <div>
      <h2>ALURAFLIX</h2>
      <button>HOME</button>
      <button onClick={openPopUp}>NUEVO VIDEO</button>

      {/* Mostrar el pop-up si showPopUp es true */}
      {showPopUp && (
        <PopUpCreate
          onClose={closePopUp}
          onSave={saveFormData}
          categories={categories} // Pasamos las categorías como props
        />
      )}

      <h3>Lista de Videos:</h3>
      <ul>
        {videoList.map((video, index) => (
          <li key={index}>
            <strong>{video.title}</strong>: {video.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
