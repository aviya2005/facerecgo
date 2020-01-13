/* eslint-disable no-useless-escape */
import React from 'react';
import { useForm } from 'react-hook-form';

export default function App(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data =>{
    fetch('https://test-facerecgo.herokuapp.com/register',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'},
      body: JSON.stringify({name: data.name ,email: data.email, password: data.password})

  }).then(res => res.json()).then(user=>{
    if(user.id){
       props.loadUser(user);
       props.onRouteChange('home')
   }
  
  });}
  
  
  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure tc">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">הרשמה</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">שם</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
         type="text" name="name" ref={register({required: true, maxLength: 80})} />
         {errors.name && "אתה חייב לתת שם תקין"}

      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">אימייל</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
         type="email" name="email" 
         ref={register({required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
         {errors.email && "אתה חייב לתת אימייל תקין"}
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">סיסמא</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
         type="password" name="password" 
         ref={register({required: true,minLength: 6, maxLength: 10, pattern: /^(?=.*[A-Za-zא-ת])(?=.*\d)/})} />
         {errors.password && "הסיסמא חייבת להיות בין 6 ל-10 תווים ולכלול מספרים ואותיות"}
      </div>
      
    

      </fieldset>
    <div className="">
      <input onClick={handleSubmit(onSubmit)} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="הרשמה"/>
    </div>
      </div>
      </main>
    </article>
  );
}