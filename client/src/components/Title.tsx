import './title.css'



function Title(){
    return <div className="title-section">
        <div className="title">
        <div className="logo-section">
        <img className='logo' src='./Debugit.png'/>
        </div>
        <p className='title-description'><i>Debugit</i> allows testers to write and execute code dynamically, enabling them to validate each piece of code as it is added. This tool provides real time feedback, ensuring that each test step works correctly before moving on to the next step which we will be writing on the fly.</p>
        </div>
    </div>
}

export default Title;