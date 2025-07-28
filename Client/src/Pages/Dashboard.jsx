import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState, useRef } from 'react'
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom'
import UserNav from '../components/UserNav'
import '../Css/Dashboard.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal'
import CustomModal from '../components/Modal'
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

 
const Dashboard = () => {
  // const textarea = document.getElementById('noteTextarea');

  // textarea.addEventListener('input', (e) => {
  //   const lines = textarea.value.split('\n');
  //   if (lines.length > 1) {
  //     console.log("Title:", lines[0]);
  //     console.log("Body:", lines.slice(1).join('\n'));
  //   }
  // });
  const [result, setResult] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [userName, setUserName] = useState({})
  const [spinnerLoading, setSpinnerLoading] = useState(false)
 

  const createNoteUrl = "https://keepify-1.onrender.com/note"
  const fetch_url = "https://keepify-1.onrender.com/result"
  const delete_url = 'https://keepify-1.onrender.com/delete'
  const update_url = "https://keepify-1.onrender.com/update"
  const jwt_url = "https://keepify-1.onrender.com/protected"

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  useEffect(()=>{
    fetchInfo(),
    jwtProtected()
    
  },[])

  let {userId} = useParams()
  let navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("users"))
  const token = localStorage.getItem('token')
  console.log(token);
  
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the File object
  };
 

  const handleCreateNote = async (e) => {
    e.preventDefault();

    // if (!title || !content) {
    //     alert("Title and content are required.");
    //     return;
    // }

    setLoading(true);

    // FormData is the key to sending files and text together
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId); 

  
    // Only append the image if a file was selected
    if (imageFile) {
        // The key 'image' MUST match `upload.single('image')` on your backend
        formData.append('image', imageFile); 
    }

    try {
      const response = await axios.post(createNoteUrl, formData);
        

      // Add the new note to the top of the list
      setResult([response.data.note, ...result]);

      // Reset the form
      setTitle('');
      setContent('');
      setImageFile(null);
      // Clear the file input visually
      document.getElementById('file-input').value = null;
      fetchInfo()

    } catch (error) {
        console.error("Error creating note:", error);
        alert("Failed to create note.");
    } finally {
        setLoading(false);
    }
};


  const fetchInfo = () => {
    setSpinnerLoading(true)
    axios.get(fetch_url) 
    .then((res)=>{
      console.log(res);
      
      const allNotes = res.data.notes || []
      console.log(allNotes);
      console.log(allNotes.title);
      
      const userNotes = allNotes.filter((note) => note.userId === userId);
      setTimeout(() => {
        console.log(userNotes);
        setSpinnerLoading(false)
      }, 10000);
      
      setResult(userNotes);
      // console.log(userNotes);
      
    }).catch((err)=>{
      console.log(err);
      setSpinnerLoading(false)
      
    })
  }

  

  const jwtProtected = () => {
    axios.get(jwt_url, {
      headers : {
        "Authorization": `Bearer ${token}`,
        "Content-Type" : "application/json",
        "Accept" : 'application/json'
      }
    })
    .then((response)=>{
      console.log(response);
      const user = response.data.user
      setUserName(user)
      console.log(userName);
      
      if(!response.data.status){
        navigate('/login')
      }
    }) .catch((err)=>{
        console.log(err);
        
    })

  }

  const deleteNote = (id) => { 
    const confirmDel = confirm("Are u sure you want to delete this item")
    if(confirmDel === true){
      // const updatedDisplay = result.filter((item, index) =>index !== userIndex);
      axios.post(delete_url, {id})
      .then((respond)=>{
        console.log(respond);
        let updatedDisplay = result.filter((note) => note._id !== id)
        setResult(updatedDisplay)
        // alert(respond.data.message)
        
      }).catch((error)=>{
        console.log(error);
        
      })
     
    }else{
      console.log("it can not delete");
    }
  }

  const handleEdit = (todo) => {
    setSelectedNote(todo);
    setShowModal(true);
  };

  const handleSaveEdit = (updatedNote) => {
    console.log(updatedNote);
    axios
      .post(update_url, updatedNote)

      .then((res) => {
        // console.log(res);

        const updatedList = result.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
        setResult(updatedList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

   
  return (
    <>
     
      <section className='app-container'>
        <div className="navbar">
          <Navbar onToggleSidebar={toggleSidebar} />
        </div>
        <Sidebar expanded={sidebarExpanded} />
        <section className='content'>
          <main className='col-11 col-md-9 col-lg-9 col-xl-9 col-xxl-9 mx-auto'>
            <div className='text-center'> 
              <p>Welcome! {userName.firstName} {userName.lastName}</p>
            </div>
            <form onSubmit={handleCreateNote} className=''>
              <input 
                type="text" 
                name='title' 
                placeholder='Title' 
                className='form-control shadow-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea 
                name='content' 
                placeholder='Take a note...' 
                className='form-control my-3 shadow-none'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className='d-flex justify-content-between'>
                <div>
                  <input 
                    type="file" 
                    id="file-input"
                    name="image" // This name is for semantics, the FormData key is what matters
                    className='d-none my-3'
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                  <Tooltip title="Image" arrow placement='top'>
                    <label htmlFor="file-input" className='file-input-label'>
                      <i className="fa-regular fa-image"></i>
                    </label>
                  </Tooltip>
                </div>
                <div>
                  <button type='submit' className='btn btn-success' disabled={loading}>
                  {loading ? 'Adding...' : 'Add Note'}
                  </button>
                </div>
              </div> 
              {imageFile && <span className="file-name-display">{imageFile.name}</span>}
            </form>
          </main>
          <section className="">
            <div className='text-center'>
              <h1>Notes</h1>
            </div>

            <div>
              <div className="notes-grid">
                {spinnerLoading ? (
                  <div className='text-center'>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ): result.length > 0 ? (
                  result.filter(Boolean).map((note) => (
                    <div key={note._id} className="note-card">
                      {note?.image?.url && (
                        <img
                          src={note.image.url}
                          alt={note.title}
                          className="note-image"
                        />
                      )}

                      <div className="note-content">
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                      </div>

                      <div className="note-actions">
                        <Tooltip
                              title="Edit Note"
                              // arrow
                              placement="bottom"
                              sx={{
                                fontSize: "1rem",
                              }}
                            >
                              <IconButton
                                aria-label="edit"
                                className="text-success"
                                onClick={() => handleEdit(note)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                        <Tooltip
                              title="Delete Note"
                              // arrow
                              placement="bottom"
                              sx={{
                                fontSize: "1rem",
                              }}
                            >
                              <IconButton
                                className="text-danger"
                                onClick={() => deleteNote(note._id)}
                              >
                                <DeleteIcon sx={{ fontSize: 24 }} />
                              </IconButton>
                            </Tooltip>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center'>
                    <h6>No Note yet</h6>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
        
      </section>
      <img src={upload} alt="" />
       
       {/* <Image imageId= {uploadImage}/> */}
        <CustomModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEdit}
          note={selectedNote}
        />
    </>
  )
}

export default Dashboard