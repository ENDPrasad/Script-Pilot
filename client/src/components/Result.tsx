import Editor from 'react-simple-code-editor';
import './result.css'
import PropType, {InferProps} from 'prop-types'
import Prism, { highlight, languages } from 'prismjs';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import './reusable.css'






function Result({result, clear}:InferProps<typeof Result.propTypes>){
    return <div className="result-section">
        <div className="flex flex-column result">
        <h3 className="result-title">Result</h3>
        <div className='full-width relative'>
        <Editor
      value={result?result: ''}
      padding={10}
      disabled
      onValueChange={()=>console.log('changed')}
      highlight={(code) => highlight(code, Prism.languages['text'], 'js')}
      style={{
        fontFamily: "monospace",
        fontSize: 17,
        border: "1px solid black",
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        width: '100%'
      }}
    />
    <div className='float-text float-top-right' onClick={()=>clear?clear():''}>clear</div>
        </div>
        </div>
    </div>
}

Result.propTypes = {
    result: PropType.string,
    clear: PropType.func
}

export default Result;