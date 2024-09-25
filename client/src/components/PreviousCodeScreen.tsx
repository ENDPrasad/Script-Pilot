import Editor from 'react-simple-code-editor';
import './previousCodeScreen.css'
import PropType, {InferProps} from 'prop-types'
import Prism, { highlight } from 'prismjs';

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";


function PreviousCodeScreen({prevCode, clear}:InferProps<typeof PreviousCodeScreen.propTypes>){

    function copyCode() {
        navigator.clipboard.writeText(prevCode?prevCode: '')
        
    }
    return <div className="prev-screen-section">
        {/* <h3 className="prev-code">Previous Screen</h3> */}
        <div className="prev-screen">
            <h4 className="previous">Previous Code</h4>
            <div className='full-width relative'>
            <Editor
      value={prevCode?prevCode: ''}
      padding={10}
      disabled
      onValueChange={()=>console.log('changed')}
      highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
      style={{
        fontFamily: "monospace",
        fontSize: 17,
        border: "1px solid black",
        backgroundColor:'white',
        borderRadius: '0.5rem',
        width: '100%'
      }}
    />
    <div className='float-text float-top-right' onClick={()=>clear?clear():''}>clear</div>
    <div className='float-text float-top-right-left' onClick={()=>copyCode()}>copy</div>
            </div>
        </div>
    </div>
}

PreviousCodeScreen.propTypes = {
    prevCode: PropType.string, 
    clear: PropType.func
}

export default PreviousCodeScreen;