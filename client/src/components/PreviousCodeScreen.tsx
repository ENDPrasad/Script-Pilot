import './previousCodeScreen.css'
import PropType, {InferProps} from 'prop-types'
function PreviousCodeScreen({prevCode}:InferProps<typeof PreviousCodeScreen.propTypes>){
    return <div className="prev-screen-section">
        {/* <h3 className="prev-code">Previous Screen</h3> */}
        <div className="prev-screen">
            <h4 className="previous">Previous Code</h4>
            <pre id="previous-code" style={{fontFamily:"Source Code Pro"}}>{prevCode}</pre>
        </div>
    </div>
}

PreviousCodeScreen.propTypes = {
    prevCode: PropType.string
}

export default PreviousCodeScreen;