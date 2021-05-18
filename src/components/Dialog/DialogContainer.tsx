import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import DialogPage from './Dialog';
 

const Dialog=()=>{
    return(
        <DialogPage/>
    )
}
const DialogContainer=withAuthRedirect(Dialog)
export default DialogContainer

