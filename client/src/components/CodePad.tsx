import axios from 'axios';
import './codepad.css'
import CustomButton from './CustomButton';
import PropType, {InferProps} from 'prop-types'
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { createPortal } from 'react-dom';
import Prism, {highlight, languages} from 'prismjs'

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Spinner from './Spinner';



const BASE_URL = process.env.REACT_APP_BASE_URL
function CodePad({onClickHandle}:InferProps<typeof CodePad.propTypes>){

    const [script, setScript] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function onChangeHandler(data: string){
        console.log(data)
        setScript(data)
    }


    function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        setIsLoading(prev =>true)
        console.log(e.currentTarget.title)
        if(e.currentTarget.title == 'Execute'){
            axios.post(BASE_URL + '/execute', {
                code: script
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, code: script, title:'Execute'}):'').catch(err =>onClickHandle?onClickHandle({err, code: script, title:'Execute'}):'').finally(()=>setIsLoading(false))

            
        }
    }
    return <div className="codepad-section flex">
        <div className="codepad flex flex-column">
            <label htmlFor="code">Execute Current Script</label>
            <Editor
      value={script}
      padding={10}
      
      placeholder='Write your code here..'
      onValueChange={(code) => onChangeHandler(code)}
      highlight={(code) => Prism.highlight(code,  Prism.languages.js, 'js')}
      style={{
        fontFamily: "monospace",
        fontSize: 17,
        border: "1px solid black",
        backgroundColor: 'white',
        minHeight: '10rem',
        borderRadius: '0.5rem'
        
      }}
      
    />
            <CustomButton title='Execute' onClickHandler={onClickHandler}/>
        </div>
        {isLoading && createPortal(<Spinner />, document.body)}
    </div>
}

CodePad.propTypes = {
    onClickHandle: PropType.func
}

export default CodePad;