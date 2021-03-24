import React, { useCallback, useEffect, useState } from 'react';
import useInput from '../components/hooks/useInput.js';
import Layout from '../components/Layout.js'

const Signup = () => {

    const [id, handleIdChange] = useInput('');
    const [nickname, handleNicknameChange] = useInput('');
    const [password, handlePasswordChange] = useInput('');
    const [passwordCheck, setPasswordCheckChange] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    const [terms, setTerms] = useState(false)
    

    const handlePasswordErr = useCallback(e => {
        setPasswordCheckChange(e.target.value)
        setPasswordErr(e.target.value !== password)
    }, [password]) 

    const handleChecked = useCallback(e => {
        setTerms(e.target.checked)
        // console.log(e.target.checked)
    }, [])


    const handleSubmit = useCallback(e => {
        e.preventDefault()
        console.log(id, password, nickname)
    }, [])

    // useEffect(() => {
    //     console.log(passwordErr)
    // }, [passwordErr])




    return (
        <Layout>
            singup
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">id</label><br />
                    <input type="text" onChange={handleIdChange} value={id} required />
                </div>
                <div>
                    <label htmlFor="nickname">nickname</label><br />
                    <input type="text" onChange={handleNicknameChange} value={nickname} required />
                </div>
                <div>
                    <label htmlFor="password">password</label><br />
                    <input type="password" onChange={handlePasswordChange} value={password} required />
                </div>
                <div>
                    <label htmlFor="passwordCheck">passwordCheck</label><br />
                    <input type="password" onChange={handlePasswordErr} value={passwordCheck} required />
                    {passwordErr && <div>not password</div>}
                </div>
                <div>
                    <input type="checkbox" checked={terms} onChange={handleChecked}/>
                    {!terms && <div>동의해주세요</div>}
                </div>

                {terms ? <button type="submit">submit</button> : <button type="submit">not submit</button>}
            </form>
        </Layout>
    );
};

export default Signup;