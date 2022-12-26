function Backdrop(props){
return (
    <div className='backdrop'
         onClick = {props.onClose}
    ></div>
)
}

function ModalOverlay(props){
return (
    <div className='modal'>
        <div className='content'>{props.children}</div>
    </div>
)
}

function Modal(props){
return (<>
<Backdrop onClose ={props.onClose}/>
<ModalOverlay>{props.children}</ModalOverlay>
</>
)
}

export default Modal;