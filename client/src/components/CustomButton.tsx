import PropTypes, {InferProps} from 'prop-types'

function CustomButton({title, onClickHandler}: InferProps<typeof CustomButton.propTypes>){
    return <div className="custom-btn">
        <button title={title} className="btn" onClick={onClickHandler}>{title}</button>
    </div>
}

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
}

export default CustomButton;