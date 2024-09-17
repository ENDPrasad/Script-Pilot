import { func } from 'prop-types';
import CustomButton from './CustomButton';
import './navigation.css'
import { useState } from 'react';
import axios from 'axios';
import PropType, {InferProps} from 'prop-types'

import './reusable.css'

const BASE_URL = process.env.REACT_APP_BASE_URL

function Navigation({onClickHandle}:InferProps<typeof Navigation.propTypes>){
    const [url, setUrl] = useState('')

    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.value)
        setUrl(e.target.value)
    }

    async function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        console.log(e.currentTarget.title)
        if(e.currentTarget.title == 'Launch'){
            axios.post(BASE_URL + '/launch-browser', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, title:'Launch'}):'').catch(err =>onClickHandle?onClickHandle(err):'')
        }else if(e.currentTarget.title == 'Navigate'){
            axios.post(BASE_URL + '/navigate', {
                url
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, title:'Navigate'}):'').catch(err =>onClickHandle?onClickHandle(err):'')
        }
    }
    return <div className="navigation-section">
        <div className="navigation">
            <div className='launch'>
                <CustomButton title='Launch' onClickHandler={onClickHandler}/>
                </div>
            <div className="navigate">
                <input id='url' type="url" placeholder='Enter targeted URL' onChange={onChangeHandler}/>
            <CustomButton title='Navigate' onClickHandler={onClickHandler}/>
            </div>
        </div>
    </div>
}

Navigation.propTypes = {
    onClickHandle: PropType.func
}

export default Navigation;