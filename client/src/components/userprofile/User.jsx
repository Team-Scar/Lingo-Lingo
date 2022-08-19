import React, {useState, useRef, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// import {AuthContext} from '../userauth/AuthContext.jsx';
import PhotoUpload from '../userauth/PhotoUpload.jsx';
import axios from 'axios';
import globalStore from '../../zustand.js';
import MfnBtn from '..//mfn_btn/MfnBtn.jsx';
import Modal from '..//Modal/Modal.jsx';


const User = () => {
  const [user, setUser] = useState(null);
  const userId = globalStore((state) => state.userId);
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
  const [chosenLang, setChosenLan] = useState([]);
  const [chosenJargon, setChosenJargon] = useState([]);
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

  useEffect(() => {
    axios.get(`http://localhost:3005/profile/${userId}`).then((res)=> {
      console.log(res.data);
      setUser(res.data);
    });
  }, [userId]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try{
  //   await axios.put('http://localhost:3005/profile/edit',
  //       {id: userId,
  //         name: nameRef.current.value,
  //         username: userNameRef.current.value,
  //         profile_photo: photoUrl,
  //         bio: bioRef.current.value,
  //         user_language: chosenLang,
  //         user_jargon: chosenJargon,
  //       },
  //     )} catch (e) {
  //       console.log('err in post to create account', e);
  //     };
  //   navigate('/profile');
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3005/profile/edit',
        {id: userId,
          name: nameRef.current.value,
          username: userNameRef.current.value,
          profile_photo: photoUrl,
          bio: bioRef.current.value,
          user_language: chosenLang,
          user_jargon: chosenJargon,
        },
    ).then((res) => {
      console.log("adsfsdfs")
      navigate('/profile');
    })
    // navigate('/profile');
  };

  const AddNewLanguage = () => {
    return (
      <div>
        <span>
          <select ref={langRef} className='select'>
            <option>--Language--</option>
            {languages && languages.map((language, i)=> {
              return <option key={i} value={language.language_name}>
                {language.language_name}
              </option>;
            })}
          </select>
        </span>
        <span>
          <select ref={roleRef} className='select'>
            <option>--Teacher or Student--</option>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
            <option value='both'>Both</option>
          </select>
        </span>
        <span>
          <select ref={proficiencyRef} className='select'>
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
    jargonRef.current.value = '';
  };

  const Form = () => {
    return (
      <div >
        <dic className='content_container'>
          <h2 className='create_account_title'>Edit Account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                placeholder='Name'
                ref={nameRef}
                // value = {user && user.name}
                // onChange={(e) => {
                //   nameRef.current = e.target.value;
                // }}
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
              <label htmlFor='jargon' className='label'>Add a jargon</label>
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
                <option>------------    Jargons    ------------</option>
                {jargons && jargons.map((jargon, i)=> {
                  return <option key={i} value={jargon.jargon_name}>
                    {jargon.jargon_name}
                  </option>;
                })}
              </select>
            </div>
            <label id='language' className='label'>Add a language (Max is three)</label>
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
        </dic>
      </div>
    );
  };


  return (
    <div style={{'display': 'flex', 'flex-direction': 'column', 'position': 'relative', 'left': '300px', 'bottom': '-233px', 'justify-content': 'flex-start', 'align-items': 'center', 'width': '100%'}}>
      <div>This is your user profile</div>
      <div>{user && user.name}</div>
      <div>Username: {user && user.username}</div>
      <img src= {user && user.photo}
        width="384"
        height="192"/>
      <div>Bio: {user && user.bio}</div>
      <div>Speaks: {user && user.speaks && user.speaks.map((item) => {
        return (<div>Language: {item.language} --- Proficiency: {item.proficiency}</div>);
      })}</div>
      <div>Wants to Learn: {user && user.wants && user.wants.map((item) => {
        return (<div>{item}</div>);
      })}</div>
      <div>Interests: {user && user.interests && user.interests.map((item) => {
        return (<div>{item}</div>);
      })}</div>
      <Modal children={Form()}/>
      <MfnBtn />
    </div>
  );
};

//     // return
//     // userprofile
//     // edit botton
//     // onclick
//     // form
//     // submit
//     // onclick
//     // axios.put
//     // cancel
//     // return to previous page


export default User;
