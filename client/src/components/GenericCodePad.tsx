import axios from 'axios';
import './reusable.css';
import './GenericCodePad.css';
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
function GenericCodePad({onClickHandle}:InferProps<typeof GenericCodePad.propTypes>){

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
            <div className='code-description'>
                
                <select name="action" id="action">
                    <option value="click">click</option>
                    <option value="fill">fill</option>
                    <option value="hover">hover</option>
                    <option value="dbclick">dbclick</option>
                    <option value="assert">assert</option>
                </select>
                <input className='nth-element' type="text" placeholder='nth'/> element or <input className='count' type="text" placeholder='n'/> elements by using selector <input className='selector' type="text" placeholder='selector'/> to be 
                <select name="assert-val" id="assert">
                    <option value="exists">exists</option>
                    <option value="visible">visible</option>
                    <option value="displayed">displayed</option>
                    <option value="enabled">enabled</option>
                </select>
                (if selects assert)
                
            </div>
            <CustomButton title='Execute' onClickHandler={onClickHandler}/>
        </div>
        {isLoading && createPortal(<Spinner />, document.body)}
    </div>
}

GenericCodePad.propTypes = {
    onClickHandle: PropType.func
}

export default GenericCodePad;