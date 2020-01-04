import React, {Component} from 'react';
import Navbar from './components/navbar/Navbar'
import Logo from './components/logo/Logo'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageForm from './components/imageform/ImageForm'
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
   
const params= {
    "particles": {
        "number": {
            "value": 70,
       "density":{
            "enable": true,
            "value_area": 800
        }},
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}};
const initialState={
    input: '',
    imageUrl: '',
    box: [],
    route: 'signin',
    isSignedIn: false,
    user: {     
            id: "",
            name: "" ,
            email: "",
            password: "",
            entries: "",
            date: "",
          }
};
class App extends Component{
    constructor(){
        super();
        this.state=initialState;
    }
    calculateFaceLocation=(data)=>{
        const arr = data.outputs[0].data.regions;
        const image=document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        
        return(arr.map(value=>{
            let clarilifiFace= value.region_info.bounding_box;
            return {
                leftCol: clarilifiFace.left_col *width,
                topRow: clarilifiFace.top_row * height,
                rightCol: width - (clarilifiFace.right_col*width),
                bottomRow: height - (clarilifiFace.bottom_row*height)
                 }
            })
        )

}

    displayFaceBox=(box)=>{
        
        this.setState({box: box});
    }
    onInputChange=(event)=>{
        this.setState({input: event.target.value})
    }
    onSubmit=()=>{
         this.setState({imageUrl: this.state.input});
         
       
        fetch('https://test-facerecgo.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input
        })})
        .then(response=>response.json())
        .then(response=>{
            if(response){
                fetch('https://test-facerecgo.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

            }
            this.displayFaceBox(this.calculateFaceLocation(response))
        }) 
        .catch(err=>console.log(err));
    }
    onRouteChange= (route)=>{
        if(route==='signout'||route==='signin'){
            this.setState(initialState)
        }else if(route==='home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
        }
    loadUser = (data) =>{
        this.setState({user:{
            
        id: data.id,
        name: data.name ,
        email: data.email,
        password: data.password,
        entries: data.entries,
        date: data.date,
        }})
    }
    render(){
       return (    
            <div >
                <Particles className='particles' params={params} />
                <Navbar onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
                
               { this.state.route === 'home' ? 
                <div><Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageForm onInputChange={this.onInputChange} onClick={this.onSubmit}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                </div>
                :(
                    this.state.route==='signin' ? 
                    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                )}
            </div>
        )
    }
}
export default App;
