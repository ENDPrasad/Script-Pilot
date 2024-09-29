import axios from 'axios';
import './browserClose.css'
import CustomButton from './CustomButton';
import PropType, {InferProps} from 'prop-types'
import Spinner from './Spinner';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL
function BrowserClose({onClickHandle}:InferProps<typeof BrowserClose.propTypes>){
    const [isLoading, setIsLoading] = useState(false)



    function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        setIsLoading(true)
        console.log(e.currentTarget.title)
        console.log(BASE_URL)
        if(e.currentTarget.title == 'Close Browser'){
            axios.post(BASE_URL + '/close-browser', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, title:'Close Browser'}):'').catch(err =>onClickHandle?onClickHandle(err):'').finally(()=>setIsLoading(false))
        }
    }

    return <div className="close-section">
        <CustomButton title='Close Browser' onClickHandler={onClickHandler} />
        {isLoading && createPortal(<Spinner />, document.body)}
    </div>
}

BrowserClose.propTypes = {
    onClickHandle: PropType.func
}

export default BrowserClose;