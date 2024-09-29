import { FallingLines } from "react-loader-spinner";
import './spinner.css'


function Spinner(){
    return <div className='spinner-section'>
        <FallingLines
  color="#1D4A7A"
  width="100"
  visible={true}
//   ariaLabel="falling-circles-loading"
  />

    </div>
}

export default Spinner;