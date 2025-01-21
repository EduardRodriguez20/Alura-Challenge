import React, { useState } from 'react';
import styles from './PopUpCreate.module.css';

const PopUpCreate = ({ onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Llama a la función onSave de App para guardar los datos
  };

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles.popup}>
        <h3>Nuevo Video</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Escribe el título del video"
            />
          </div>

          <div>
            <label htmlFor="category">Categoría:</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image">Imagen (URL):</label>
            <input
              type="url"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label htmlFor="video">Video (URL):</label>
            <input
              type="url"
              name="video"
              id="video"
              value={formData.video}
              onChange={handleChange}
              required
              placeholder="https://ejemplo.com/video.mp4"
            />
          </div>

          <div>
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Escribe una breve descripción"
            />
          </div>

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default PopUpCreate;
