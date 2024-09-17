import './previousCodeScreen.css'
import PropType, {InferProps} from 'prop-types'
function PreviousCodeScreen({prevCode}:InferProps<typeof PreviousCodeScreen.propTypes>){
    return <div className="prev-screen-section">
        {/* <h3 className="prev-code">Previous Screen</h3> */}
        <div className="prev-screen">
            <label htmlFor="previous">Previous Code</label>
            <pre id="previous">{prevCode}</pre>
        </div>
    </div>
}

PreviousCodeScreen.propTypes = {
    prevCode: PropType.string
}

export default PreviousCodeScreen;