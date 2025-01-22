import { useState, useEffect } from 'react'
import PopUpCreate from './PopUpCreate'
import PopUpEdit from './PopUpEdit';
import logo from './assets/logo.png';
import videoData from './assets/InitialData.json';
import './App.css'

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [principalVideo, setPrincipalVideo] = useState(null);
  const categorizedVideos = {
    'BACK END': videoList.filter((video) => video.category === 'BACK END'),
    'FRONT END': videoList.filter((video) => video.category === 'FRONT END'),
    'INNOVACIÓN Y GESTIÓN': videoList.filter((video) => video.category === 'INNOVACIÓN Y GESTIÓN'),
  };
  const [editingVideo, setEditingVideo] = useState(null);

  const categories = ['BACK END', 'FRONT END', 'INNOVACIÓN Y GESTIÓN'];
  const categoriesColors = {
    'BACK END': '#00C86F',
    'FRONT END': '#6BD1FF',
    'INNOVACIÓN Y GESTIÓN': '#FFBA05',
  }

  const openPopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
    setEditingVideo(null);
  };

  const saveFormData = (formData) => {
    setVideoList([...videoList, formData]);
    closePopUp();
  };



  const openEditPopUp = (video) => {
    setEditingVideo(video);
  };

  const saveEditedData = (formData) => {
    setVideoList(
      videoList.map((video) =>
        video.video === formData.video ? { ...video, ...formData } : video
      )
    );
    closePopUp();
  };



  const handleDelete = (videoToDelete) => {
    setVideoList(videoList.filter((video) => video.title !== videoToDelete.title));
  };

  

  const handleSetPrincipalVideo = (video) => {    
    let updatedVideoList = videoList.filter((v) => v !== video);
    updatedVideoList.push(principalVideo)
    setPrincipalVideo(video);
    setVideoList(updatedVideoList);
  };
  


  useEffect(() => {
    if (videoData.length > 0) {
      setPrincipalVideo(videoData[0]);
      setVideoList(videoData);
    }
  }, []);

  return (
    <div>
      <header>
        <img style={{height:40, padding:10 }} src={logo} alt='logo'/>
        <div style={{padding:10, display:'flex', gap:20 }}>
          <a href="#">
            <button>HOME</button>
          </a>
          <button onClick={openPopUp}>NUEVO VIDEO</button>
        </div>
      </header>
      
      {principalVideo && (
        <section
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${principalVideo.image}) no-repeat center center/cover`,
            height: '60vh',
            width: '99vw',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10vh'
          }}
        >
          <div style={{textAlign:'left', margin: '0px 60px',}}>
            <p
              className="category"
              style={{
                backgroundColor: categoriesColors[principalVideo.category] || '#ccc',
              }}
            >
              {principalVideo.category}
            </p>

            <h1>{principalVideo.title}</h1>
            <p>
              {principalVideo.description}
            </p>
          </div>
          <a href={principalVideo.video} target='_blank'>
            <img style={{height:280, margin: '10px 100px', borderRadius: '20%', boxShadow:'white -1px 0px 6px 3px'}} src={principalVideo.image} alt="principalImage"/>
          </a>
        </section>
      )}

      <div style={{margin:'20px'}}>
        {Object.keys(categorizedVideos).map((category) => (
          <div key={category}>
            <p
              className="category"
              style={{
                backgroundColor: categoriesColors[category] || '#ccc',
              }}
            >
              {category}
            </p>

            <div
              style={{
                display: 'flex',
                width: '97vw',
                overflowX: 'auto',
                gap: '30px',
                padding: '10px 14px',
                scrollBehavior: 'smooth',
                borderRadius: '30px',
              }}
            >
              {categorizedVideos[category].map((video, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '250px',
                    maxWidth: '250px',
                    flexShrink: '0',
                    backgroundColor: 'black',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px ${categoriesColors[category]}`
                  }}
                >
                  <a href='#' onClick={() => handleSetPrincipalVideo(video)}>
                    <img src={video.image} alt={video.title} style={{ width: '100%', borderRadius: '8px' }} />
                  </a>
                  <div style={{display:'flex', gap:8, justifyContent:'center'}}>
                    <button onClick={() => openEditPopUp(video)}>Editar</button>
                    <button onClick={() => handleDelete(video)}>Borrar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showPopUp && (
        <PopUpCreate
          onClose={closePopUp}
          onSave={saveFormData}
          categories={categories}
        />
      )}

      {editingVideo && (
        <PopUpEdit
          onClose={closePopUp}
          onSave={saveEditedData}
          categories={categories}
          video={editingVideo}
        />
      )}
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Desarrollado en 2 horas 💤
      </p>
      <footer>
        <img style={{height:40, padding:10 }} src={logo} alt='logo'/>
      </footer>
    </div>
  )
}

export default App
