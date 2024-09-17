import axios from 'axios';
import './codepad.css'
import CustomButton from './CustomButton';
import PropType, {InferProps} from 'prop-types'
import { useState } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL
function CodePad({onClickHandle}:InferProps<typeof CodePad.propTypes>){

    const [script, setScript] = useState('')

    function onChangeHandler(e:React.ChangeEvent<HTMLTextAreaElement>){
        console.log(e.target.value)
        setScript(e.target.value)
    }


    function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        console.log(e.currentTarget.title)
        if(e.currentTarget.title == 'Execute'){
            axios.post(BASE_URL + '/execute', {
                code: script
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, code: script, title:'Execute'}):'').catch(err =>onClickHandle?onClickHandle(err):'')
        }
    }
    return <div className="codepad-section flex">
        <div className="codepad flex flex-column">
            <label htmlFor="code">Execute Current Script</label>
            <textarea name="code" id="code" onChange={onChangeHandler}></textarea>
            <CustomButton title='Execute' onClickHandler={onClickHandler}/>
        </div>
    </div>
}

CodePad.propTypes = {
    onClickHandle: PropType.func
}

export default CodePad;