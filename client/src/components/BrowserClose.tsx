import axios from 'axios';
import './browserClose.css'
import CustomButton from './CustomButton';
import PropType, {InferProps} from 'prop-types'

const BASE_URL = process.env.REACT_APP_BASE_URL
function BrowserClose({onClickHandle}:InferProps<typeof BrowserClose.propTypes>){
    function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        console.log(e.currentTarget.title)
        console.log(BASE_URL)
        if(e.currentTarget.title == 'Close Browser'){
            axios.post(BASE_URL + '/close-browser', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.data).then(data=>onClickHandle?onClickHandle({...data, title:'Close Browser'}):'').catch(err =>onClickHandle?onClickHandle(err):'')
        }
    }

    return <div className="close-section">
        <CustomButton title='Close Browser' onClickHandler={onClickHandler} />
    </div>
}

BrowserClose.propTypes = {
    onClickHandle: PropType.func
}

export default BrowserClose;