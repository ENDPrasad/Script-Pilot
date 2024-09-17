import './result.css'
import PropType, {InferProps} from 'prop-types'
function Result({result}:InferProps<typeof Result.propTypes>){
    return <div className="result-section">
        <div className="flex flex-column result">
        <h3 className="result-title">Result</h3>
            <pre className='output-message'>{result}</pre>
        </div>
    </div>
}

Result.propTypes = {
    result: PropType.string
}

export default Result;