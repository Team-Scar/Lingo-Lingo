
import React, {useState, useRef, useContext, useEffect} from 'react';
import {AuthContext} from './AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import PhotoUpload from './PhotoUpload.jsx';
import axios from 'axios';

const CreateAccount = () => {
  const [photoUrl, setPhotosUrl] = useState('');
  const [languages, setLanguages] = useState('');
  const [languagesCount, setLanguagesCount] = useState(1);
  const [jargons, setJargons] = useState('');
  const nameRef = useRef();
  const userNameRef = useRef();
  const bioRef = useRef();
  const jargonRef = useRef();
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchLanguage = async () => {
    const res = await axios.get('/allLanguages');
    setLanguages(res.data);
  };

  const fetchJargons = async () => {
    const res = await axios.get('/allJargons');
    setJargons(res.data);
  };

  useEffect(() => {
    fetchLanguage();
    fetchJargons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
    console.log(jargonRef.current.value);
    // navigate('/');
    // await axios.post();
  };

  const AddNewLanguage = () => {
    return (
      <div>
        <span>
          <select>
            <option>--Language--</option>
            {languages && languages.map((language, i)=> {
              return <option key={i} value={language.language_name}>
                {language.language_name}
              </option>;
            })}
          </select>
        </span>
        <span>
          <select>
            <option>--Teacher or Student--</option>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
            <option value='both'>Both</option>
          </select>
        </span>
        <span>
          <select>
            <option value=''>--Proficiency--</option>
            <option value='5'>Expert</option>
            <option value='4'>Superior</option>
            <option value='3'>Advanced</option>
            <option value='2'>Intermediate</option>
            <option value='1'>Beginner</option>
          </select>
        </span>
      </div>
    );
  };

  return (
    <div style={{position: 'relative', left: '300px', bottom: '-200px'}}>
      <h2>Create account</h2>
      {/* {nameRef.current && console.log(nameRef.current.value)} */}
      {/* {jargonRef && console.log(jargonRef.current.value)} */}
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' placeholder='name' ref={nameRef} required/>
        </div>
        <div>
          <input type='text' placeholder='username' ref={userNameRef} required/>
        </div>
        <div>
          <input type='text' placeholder='bio' ref={bioRef} required/>
        </div>
        <PhotoUpload setPhotosUrl={setPhotosUrl}/>
        <div>
          <label htmlFor='jargon'>Choose a jargon</label>
          <select id='jargon' ref={jargonRef}>
            <option>----jargons----</option>
            {jargons && jargons.map((jargon, i)=> {
              return <option key={i} value={jargon.jargon_name}>
                {jargon.jargon_name}
              </option>;
            })}
          </select>
        </div>
        <label id='language'>Add a language (Max is three)</label>
        <AddNewLanguage />
        {languagesCount >= 2 && <AddNewLanguage/>}
        {languagesCount === 3 && <AddNewLanguage/>}
        {languagesCount < 3 &&
        <button onClick={() => setLanguagesCount(languagesCount+1)}>
          Add one more language
        </button>}
        <button>Confirm</button>
      </form>
    </div>
  );
};

export default CreateAccount;


