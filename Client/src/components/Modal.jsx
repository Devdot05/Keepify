import React, { useEffect, useState } from 'react'

const CustomModal = ({show, onClose, onSave, note}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')

    useEffect(()=>{
        if(note) {
            setTitle(note.title)
            setContent(note.content)
        }
    }, [note])

    const handleSave = () => {
        onSave({...note, title, content})
        onClose();
    }

    if(!show) return null;
  return (
    <>
        <div className="modal show fade d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <div className="modal-dialog" style={{backgroundColor: '#6699E8'}}>
            <div className="modal-content"  >
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                <div className='mb-3'>
                    <input type="text" name='title' className='form-control' onChange={(e) => setTitle (e.target.value)} placeholder='title'/>
                </div>
                <div className='mb-3'>
                    <textarea name='content' className='form-control' onChange={(e) => setContent (e.target.value)} placeholder='Edit Note ....'></textarea>
                </div>
            </div>
            <div className="modal-footer">
                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button> */}
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Update</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default CustomModal