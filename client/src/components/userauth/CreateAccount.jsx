
import React, {useState, useRef, useContext, useEffect} from 'react';
import {AuthContext} from './AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import PhotoUpload from './PhotoUpload.jsx';
import axios from 'axios';
import globalStore from '../../zustand.js';
import './userauth.scss';
import photo from '../../../public/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg';


const CreateAccount = () => {
  const [photoUrl, setPhotosUrl] = useState('');
  const [languages, setLanguages] = useState('');
  const [languagesCount, setLanguagesCount] = useState(1);
  const [jargons, setJargons] = useState('');
  const nameRef = useRef();
  const userNameRef = useRef();
  const bioRef = useRef();
  const jargonRef = useRef();
  const langRef = useRef();
  const roleRef = useRef();
  const proficiencyRef = useRef();
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [chosenLang, setChosenLan] = useState([]);
  const [chosenJargon, setChosenJargon] = useState([]);
  const gotToken = globalStore((state) => state.token);

  const fetchLanguage = async () => {
    const res = await axios.get('/allLanguages', {headers: {authorization: `Bearer ${gotToken}`}});
    setLanguages(res.data);
  };

  const fetchJargons = async () => {
    const res = await axios.get('/allJargons', {headers: {authorization: `Bearer ${gotToken}`}});
    setJargons(res.data);
  };

  useEffect(() => {
    fetchLanguage();
    fetchJargons();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/create-account',
          {email: currentUser.email,
            name: nameRef.current.value,
            username: userNameRef.current.value,
            profile_photo: photoUrl,
            bio: bioRef.current.value,
            user_language: chosenLang,
            user_jargon: chosenJargon,
          },
      );
    } catch (e) {
      console.log('err in post to create account', e);
    };
    navigate('/');
  };

  const AddNewLanguage = () => {
    return (
      <div>
        <span>
          <select ref={langRef} className='select'>
            <option>Language</option>
            {languages && languages.map((language, i)=> {
              return <option key={i} value={language.language_name}>
                {language.language_name}
              </option>;
            })}
          </select>
        </span>
        <span>
          <select ref={roleRef} className='select'>
            <option>Teach/Learn</option>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
            <option value='both'>Both</option>
          </select>
        </span>
        <span>
          <select ref={proficiencyRef} className='select'>
            <option value=''>Proficiency</option>
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

  const handleAddLang = () => {
    setLanguagesCount(languagesCount+1);
    setChosenLan([...chosenLang,
      {language: langRef.current.value,
        role: roleRef.current.value,
        proficiency: proficiencyRef.current.value,
      }]);
    langRef.current.value = '';
    roleRef.current.value = '';
    proficiencyRef.current.value ='';
  };

  const handleAddJargon = () => {
    setChosenJargon([...chosenJargon, jargonRef.current.value]);
    jargonRef.current.value = '--jargon--';
  };


  return (
    <div className='create_account_container'>
      <div >
        <img src={photo} alt='' className='photo'/>
      </div>
      <div className='content_container'>
        <h2 className='create_account_title'>
          Create an <span className='title_blue'>Account!</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              placeholder='Name'
              ref={nameRef}
              className='form_input_create_account'
              required
            />
          </div>
          <div>
            <input
              type='text'
              placeholder='Username'
              ref={userNameRef}
              className='form_input_create_account'
              required
            />
          </div>
          <div>
            <input
              type='text'
              placeholder='Bio'
              ref={bioRef}
              className='form_input_create_account'
              required
            />
          </div>
          <PhotoUpload setPhotosUrl={setPhotosUrl}/>
          <div>
            <label htmlFor='jargon' className='label'>Choose a Topic</label>
            <ul>
              {chosenJargon.length > 0 && chosenJargon.map((jargon, i) => {
                return <li key={i} className='show_list'>{jargon}</li>;
              })}
            </ul>
            <select
              id='jargon'
              ref={jargonRef}
              onChange = {handleAddJargon}
              className='select jargon_select'
            >
              <option></option>
              {jargons && jargons.map((jargon, i)=> {
                return <option key={i} value={jargon.jargon_name}>
                  {jargon.jargon_name}
                </option>;
              })}
            </select>
          </div>
          <label id='language' className='label'>Add a language (Choose up to 3)</label>
          <ul>
            {chosenLang.length > 0 && chosenLang.map((lang, i) => {
              return <li key={i} className='show_list'>{lang.language} - {lang.role}</li>;
            })}
          </ul>
          <AddNewLanguage />
          {/* {languagesCount < 3 && */}
          <button type='button' disabled={languagesCount===4}
            onClick={handleAddLang} className='add_lang_btn'>
            + Add Language
          </button>
          <button className='button confirm_account_btn'>CONFIRM</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
