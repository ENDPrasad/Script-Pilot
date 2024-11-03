import { func } from 'prop-types';
import CustomButton from './CustomButton';
import './navigation.css'
import { useState } from 'react';
import axios from 'axios';
import PropType, {InferProps} from 'prop-types'

import './reusable.css'
import { createPortal } from 'react-dom';
import Spinner from './Spinner';

const BASE_URL = process.env.REACT_APP_BASE_URL

function Navigation({onClickHandle}:InferProps<typeof Navigation.propTypes>){
    const [url, setUrl] = useState('')
    const [browser, setBrowser] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.value)
        setUrl(e.target.value)
    }

    async function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        console.log(e.currentTarget.title)
        if(e.currentTarget.title == 'Launch'){
        setIsLoading(true)

            axios.post(BASE_URL + '/launch-browser', {
                browser
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
     
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, title:'Launch'}):'').catch(err =>onClickHandle?onClickHandle(err):'').finally(()=>setIsLoading(false))


        }else if(e.currentTarget.title == 'Navigate'){
        setIsLoading(true)

            axios.post(BASE_URL + '/navigate', {
                url,
                browser
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
    }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, title:'Navigate'}):'').catch(err =>onClickHandle?onClickHandle(err):'').finally(()=>setIsLoading(false))
    

        }

    }
    return <div className="navigation-section">
        <div className="navigation">
            <div className='launch'>
                <select id='browserType' onChange={(e)=>setBrowser(e.target.value)}>
                    <option value="chromium">Chrome</option>
                    <option value="edge">Edge</option>
                    <option value="firefox">Firefox</option>
                    <option value="safari">Safari</option>
                    
                </select>
                <CustomButton title='Launch' onClickHandler={onClickHandler}/>
                </div>
            <div className="navigate">
                <input id='url' type="url" placeholder='Enter targeted URL' onChange={onChangeHandler}/>
            <CustomButton title='Navigate' onClickHandler={onClickHandler}/>
            </div>
        </div>
        {isLoading && createPortal(<Spinner />, document.body)}
    </div>
}

Navigation.propTypes = {
    onClickHandle: PropType.func
}

export default Navigation;