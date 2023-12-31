import React, { useContext, useEffect } from 'react'
import Form from './Form.js'
import { UserContext } from '../context/UserProvider.js'
import ProfileSauceContainer from './ProfileSauceContainer'

export default function Profile(props){
    const { user: { username }, getUserSauces, userSauceState, addSauce } = useContext(UserContext)
    const {comment} = props


    useEffect(() => {
        getUserSauces(); 
       
    }, [])


    return (
        <div className="bg-light py-3 text-center">
                <h1> Welcome @{username}</h1>
                <br></br>
                <br></br>
                <h3>Submit a new sauce</h3>
                <br></br>
                <Form addSauce={addSauce} />
                <div className='py-20'>
                    <h2 className='py-20'>Your Submitted Sauces</h2>
                </div>
                <section className="bg-light py-3">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {!userSauceState ? (
                    <ProfileSauceContainer sauces={userSauceState} />
                    ) : (
                    <p> Loading sauces...</p>
                    )}
                        </div>
                    </div>
                    
                </section>
                
            </div>
        )

}