
import React, { useState, useEffect ,Suspense } from 'react';
import { 
  InboxIcon, 
  PaperAirplaneIcon, 
  TrashIcon, 
  PlusIcon,
  DocumentTextIcon,
  
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { RepeatOneSharp } from '@mui/icons-material';
import axios from 'axios'
import { ResponsiveContainer } from 'recharts';

import {set , ref , onValue , remove , update} from 'firebase/database';
import { FaFacebookMessenger } from "react-icons/fa6";

import db from './../Services/firebase.config'

import { toast ,ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Gmail = ({theme}) => {
  // State management
  const [notes, setNotes] = useState([]);
  const [emails ,setEmails] = useState([]);
  
  const [activeTab, setActiveTab] = useState('notes');
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [composeEmail, setComposeEmail] = useState({ to: '', subject: '', body: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('emails', JSON.stringify(emails));
  }, [notes, emails]);

  const [loadingnotes, setLoadingNotes] = useState(false);



  const [emailSendLoading,setEmailSendLoading] = useState(false);


    const [selectedEmployee, setSelectedEmployee] = useState('');
const [message, setMessage] = useState('');

const [employees , setEmployee] = useState([]);


 
  






 



  useEffect(()=>{
        setLoadingNotes(true);
        const noteRef = ref(db,'user');
        const unsubscribe = onValue(noteRef , (snapshot)=>{
             const data = snapshot.val();
             if(data){
                  const noteArray = Object.values(data); 
                  setNotes(noteArray);
             }else{
                  setNotes([]);
             } 
        })
        setLoadingNotes(false);
        return ()=>unsubscribe();
  },[]);


  useEffect(()=>{
       const emailRef = ref(db,'email');
       
       
       onValue(emailRef,(snapshort)=>{
            const data = snapshort.val();
            if(data){
                const emailArray = Object.values(data);
                emailArray.sort((a,b)=>a.id-b.id);
                console.log(emailArray);
                setEmails(emailArray);
            }else{
                setEmails([]);
            }
       })
  },[setComposeEmail])

 

  // Note operations
  const addNote = async () => {
    if (newNote.title.trim() === '' || newNote.content.trim() === '') return;
    
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split('T')[0]
    };
    



   set(ref(db, `user/${note.id}`), note)
  .then(() => {
    console.log("Notes added successfully");
    toast.success(`Notes Add id ${id}`)
  })
  .catch((error) => {
    console.error("Notes add failed:", error);
    console.error(`Notes Delete id ${id}`)
  });

  
    //ADD NOTES TO FIREBASE DATABASE OF CRM:

    
    // setNotes([note, ...notes]);
    setActiveTab('notes');
    setNewNote({ title: '', content: '' });
  };

  const deleteNote = (id) => {
     
     console.log("Id i want to delete",id);


     remove(ref(db,`user/${id}`)).then(()=>{
         console.log("notes get delete from datbase",id);
         toast.success(`Note id Delete ${id}`);
     }).catch((err)=>{
        console.log("Notes is not delete ",err);
        toast.error(`Notes id fail Delete ${id}`)
     })





    setNotes(notes.filter(note => note.id !== id));
  };

  // Email operations
  const sendEmail = async () => {
    if (!composeEmail.to || !composeEmail.subject){
         return alert("Fill all infomation ");
    }
     setEmailSendLoading(true);
    
    const email = {
      id: Date.now(),
      ...composeEmail,
      date: new Date().toLocaleString(),
      read: false
    };


    console.log("full data is",composeEmail);
    try{
          const response = await axios.post('https://crm-backend-msk3.onrender.com/api/v8/sendmail',{composeEmail});
          toast.success("Send Mail Successfully to ",composeEmail.to);

           setEmailSendLoading(false);

          if(response.data.success){
               const emaildata = {
                      id : Date.now(),
                      sender : composeEmail.to,
                      subject : composeEmail.subject,
                      body : composeEmail.body,
                      date : new Date().toLocaleString(),
                      read : false,
               }



               
      

          set(ref(db, `email/${emaildata.id}`), emaildata)
  .then(() => {
    console.log("EMAIL ADDED SUCCESSFULLY");
  })
  .catch((err) => {
    console.error("Error while adding email:", err);
  });
}

 
          
    }
    catch (err) {
  toast.error("Send Mail Fail");
  if (err.response && err.response.data && err.response.data.err) {
    console.log("Error from backend:", err.response.data.err);
  }
} finally {
  setEmailSendLoading(false);
}
     




  
       


    
  
   setComposeEmail({ to: '', subject: '', body: '' });  
    setActiveTab('inbox');
  }
  const deleteEmail = (id) => {
     console.log("Delete this email",id);
     remove(ref(db,`email/${id}`)).then(()=>{
      //  console.log("Remove email id",id);
        toast.warn("Delete Mail id ",{id});
     }).catch((error)=>{
       // console.log("Fail to Delete Email Id ",id);
        toast.error("Fail to delete id ",id);
     })
   // setEmails(emails.filter(email => email.id !== id));
  };

  const markAsRead = (id) => {
    console.log("Mark as a read this email");
    //i want ki
    const dataref = ref(db,`email/${id}`);
    
    update(dataref,{read : true}).then(()=>{
       console.log("Read Update as true",id);
    }).catch((error)=>{
       console.log("Read update as true fail",error);
    })
   
  };

  // Filtered data
 const filteredNotes = notes.filter(note => 
  (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
);


  const unreadEmails = emails.filter(email => !email.read);


   




// const employees = [
//   { id: 'E101', name: 'Ankit Singh' },
//   { id: 'E102', name: 'Riya Sharma' },
//   { id: 'E103', name: 'Rahul Kumar' }
// ];

  

useEffect(()=>{

   const fetchteamleaderlist = async()=>{
          try{
             const response = await axios.post('https://crm-backend-msk3.onrender.com/api/v8/fetch/teamleader/list');
             console.log("response data",response.data);
             if(response.data.success){
                 setEmployee(response.data.totaldata);
                 console.log("response is",response.data.totaldata);
                
             }
          }
          catch(err){
               if(err.response && err.response.data){
                  console.log("Error in Fetch Team Data",err.response.data);
               }
          }
   }
   fetchteamleaderlist(); 
},[]);


const sendMessage = async () => {
  if (!message.trim()) return alert('Please enter a message');
  // Replace this with your actual send logic
  console.log(`Sending message to ${selectedEmployee}: ${message}`);



 
  console.log("Message",message);
  console.log("Select Employee",selectedEmployee);
 
  try{
          const response = await axios.post('https://crm-backend-msk3.onrender.com/api/v8/master/employee_message');
          console.log(response.data);

  }
  catch(err){
         if(err.response && err.response.data){
              console.log("error in getteamleaderList",err.response.data.message);
         }
  }


  alert('Message sent!');
  setMessage('');
};



useEffect(()=>{
   console.log("Employee is ",employees);
},[])



  return (
    <div className={`flex min-h-screen  ${theme}`}>
      {/* Sidebar */}
      <div className="w-64  shadow-lg p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
            <DocumentTextIcon className="h-8 w-8 mr-2" />
            NotesApp
          </h1>
          <p className="text-gray-500 text-sm">All your notes in one place</p>
        </div>

        <div className="flex-1">
          <nav>
            <button 
              onClick={() => setActiveTab('notes')}
              className={`w-full flex items-center p-3 rounded-lg mb-2 ${
                activeTab === 'notes' 
                  ? ' text-indigo-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              My Notes ({notes.length})
            </button>
            
            <button 
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center p-3 rounded-lg mb-2 ${
                activeTab === 'inbox' 
                  ? ' text-indigo-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <InboxIcon className="h-5 w-5 mr-3" />
              SEND {unreadEmails.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadEmails.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('compose')}
              className={`w-full flex items-center p-3 rounded-lg mb-2 ${
                activeTab === 'compose' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-3" />
              Compose Email
            </button>
            
            <button 
              onClick={() => setActiveTab('trash')}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeTab === 'trash' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : ''
              }`}
            >
              <FaFacebookMessenger className="h-5 w-5 mr-3" />
                Message
            </button>
          </nav>
        </div>

        <div className="mt-auto p-4 rounded-lg">
          <p className="text-sm text-gray-600">Your storage</p>
          <div className="w-full  rounded-full h-2 mt-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${Math.min(notes.length * 2, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-gray-500">
            {notes.length} notes • {Math.min(notes.length * 2, 100)}% used
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className=" rounded-xl shadow-md p-6 h-full">
          {/* Search Bar */}
          <div className="flex mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

        


    {
  loadingnotes ? (
    <div>Loading...</div>
  ) : (
    <div>
      {activeTab === 'notes' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Notes</h2>
            <button 
              onClick={() => setActiveTab('add-note')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Note
            </button>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-16 w-16 mx-auto text-gray-300" />
              <p className="mt-4 text-gray-500">No notes found. Create your first note!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map(note => (
                <div key={note.id} className="border rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{note.content}</p>
                  <p className="text-gray-400 text-xs mt-3">{note.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


         



        
          
          {activeTab === 'add-note' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Note</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    rows={8}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={addNote}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('notes');
                      setNewNote({ title: '', content: '' });
                    }}
                    className="border px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inbox View */}
          {activeTab === 'inbox' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">SEND</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center">
                {/* <MailIcon className="h-6 w-6 text-indigo-600 mr-3" /> */}
                <div>
                  <p className="font-medium">You have {unreadEmails.length} unread emails</p>
                  <p className="text-sm text-gray-600">Total emails: {emails.length}</p>
                </div>
              </div>
              
              <div className="space-y-4 h-[340px] overflow-y-auto ">
                {emails.map(email => (
                  <div 
                    key={email.id} 
                    className={`border rounded-xl p-4 hover:shadow-md transition ${
                      !email.read ? 'bg-white border-indigo-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="mr-3">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                        </div>  
                        <div>
                          <h3 className=" text-gray-800">Send to -{email.sender}</h3>
                          <p className="font-sm">Subject - {email.subject}</p>
                          <p className="text-gray-600 font-lg text-sm mt-1 line-clamp-1">Message - {email.body}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{email.date}</p>
                        <div className="flex justify-end mt-2 space-x-2">
                          {!email.read && (
                            <button
                              onClick={() => markAsRead(email.id)}
                              className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded hover:bg-indigo-200"
                            >
                              Mark as read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteEmail(email.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compose Email View */}
          {/* {activeTab === 'compose' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Compose Email</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    value={composeEmail.to}
                    onChange={(e) => setComposeEmail({...composeEmail, to: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    value={composeEmail.subject}
                    onChange={(e) => setComposeEmail({...composeEmail, subject: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={8}
                    className="w-full h-30 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    value={composeEmail.body}
                    onChange={(e) => setComposeEmail({...composeEmail, body: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-3">

                

                  {
  emailSendLoading ? (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    <button
      onClick={sendEmail}
      className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition flex items-center"
    >
      <PaperAirplaneIcon className="h-5 w-5 mr-2 rotate-90" />
      Send Email
    </button>
  )
}

                  <button
                    onClick={() => setActiveTab('inbox')}
                    className="border px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )} */}

          {activeTab === 'compose' && (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-xl font-bold text-gray-800 mb-6">Compose Email</h2>

      <div className="flex flex-col md:flex-row gap-6">
    {/* Left Side - To + Email List */}
    <div className="md:w-1/3 w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          value={composeEmail.to}
          onChange={(e) => setComposeEmail({ ...composeEmail, to: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email List</label>
        <div className="space-y-2">
          {employees.map((employee, index) => (
  <button
    key={employee.id || index}
    type="button"
    onClick={() => setComposeEmail({ ...composeEmail, to: employee.email })}
    className="w-full text-left p-2 border rounded-lg hover:bg-indigo-50 transition"
  >
    {employee.full_name} ({employee.email})
  </button>
))}
        </div>
      </div>
    </div>
   

    {/* Buttons */}
   

     <div className="md:w-2/3 w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          value={composeEmail.subject}
          onChange={(e) => setComposeEmail({ ...composeEmail, subject: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          rows={8}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          value={composeEmail.body}
          onChange={(e) => setComposeEmail({ ...composeEmail, body: e.target.value })}
        />
      </div>

       <div className="mt-6 flex space-x-3">
      {emailSendLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          onClick={sendEmail}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition flex items-center"
        >
          <PaperAirplaneIcon className="h-5 w-5 mr-2 rotate-90" />
          Send Email
        </button>
      )}
      <button
        onClick={() => setActiveTab('inbox')}
        className="border px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
    </div> 
    </div>




    </div>
  </div>
)}


          

          {/* Trash View */}
          
          
          {activeTab === 'trash' && (
  <div className="max-w-5xl mx-auto bg-white border rounded-lg shadow-md p-6 mt-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
      Send Message to Employee
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side: Select ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Employee
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select an Employee --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employee_code}>
              {emp.full_name} (id: {emp.employee_code})
            </option>       
          ))}   
        </select>
      </div>

      {/* Right Side: Message Box */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
        >
          Send Message
        </button>
      </div>
    </div>
  </div>
)}




        </div>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Gmail;