import React from 'react';


class StatusTr extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode=()=>{
        this.setState({
            editMode: true 
        })

    }

    deActivateEditMode=()=>{
        this.setState({
            editMode: false
        })
        this.props.updateStatusThunk(this.state.status)
    }

    changeStatus=(e)=>{
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps, prevState){
        
        if(prevProps.status!==this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }



    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
                    </div>
                }

                {this.state.editMode &&
                    <div>
                        <input onChange={this.changeStatus} autoFocus={true} onBlur={this.deActivateEditMode} type='text' value={this.state.status}></input>
                    </div>
                }



            </div>
        )
    }


}

export default StatusTr