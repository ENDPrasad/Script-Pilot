import { useState } from "react";
import BrowserClose from "../components/BrowserClose";
import CodePad from "../components/CodePad";
import Navigation from "../components/Navigation";
import PreviousCodeScreen from "../components/PreviousCodeScreen";
import Result from "../components/Result";
import Title from "../components/Title";
import './home.css'
import Footer from "../components/Footer";


function Home(){
    const [prevCode, setPrevCode] = useState('')
    const [result, setResult] = useState('')
    
    function onClickHandler(data:{success:boolean, message?: string, error?:string, code?:string}){
        console.log(data)
        console.log(data.success === true)
        
        if(data.success === true && data.message === "Step executed successfully"
        ){

            setPrevCode(prev => prev+'\n' + data.code)
            setResult(res => `${res}\n-----------\n${data.message}`)
        }

        else if(data.success && data.message){
            setResult(res => `${res}\n-----------\n${data.message}`)
        }else {
            setResult(res => `${res}\n-----------\n${data.error}`)
            
        }


    }
    
    return <div className="home-section">
        <Title />
        <Navigation onClickHandle={onClickHandler} />
        <PreviousCodeScreen prevCode= {prevCode} />
        <CodePad  onClickHandle={onClickHandler}/>
        <Result result={result} />
        <BrowserClose onClickHandle={onClickHandler}/>
        <Footer />
    </div>
}

export default Home;