import React from 'react';

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      SignInEmail: '',
      SignInPassword: ''
    }
  }
  onEmailChange = (event)=>{
    this.setState({SignInEmail: event.target.value})
  }
  onPasswordChange = (event)=>{
    this.setState({SignInPassword: event.target.value})
  }
  onSubmit = () =>{
    
    
       fetch('https://test-facerecgo.herokuapp.com/signin',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.SignInEmail, password: this.state.SignInPassword})

        }).then(res => res.json()).then(user=>{
          if(user.id){
            this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
        });
  }
        
     

   
  render(){
    const {onRouteChange} = this.props;
    return(
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
<div className="measure tc">
  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
    <legend className="f1 fw6 ph0 mh0">כניסה</legend>
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">אימייל</label>
      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  
      id="email-address"
      onChange={this.onEmailChange}/>
    </div>
    <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password">סיסמה</label>
      <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" 
       id="password"
       onChange={this.onPasswordChange}
       />
    </div>
   
  </fieldset>
  <div className="">
    <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="כניסה"/>
  </div>
  <div className="lh-copy mt3 pointer">
    <p onClick={()=> onRouteChange('register')} className="f6 link dim black db">הרשמה</p>
  </div>
</div>
</main>
</article>
  )
  }
}

export default SignIn;