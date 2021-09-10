import React,{useState} from 'react';
import * as actionCreators from "../../app/redux/actions/ticketListingActions";
import { useDispatch,  connect } from "react-redux";
import Singlefield from './SingleFilter';
import * as styles from "./FilterStyle";
/*******This is filter functions to all the status page**************/

function Filterform (props){
    const dispatch = useDispatch();
    const [state, setState] = useState({
            currentPageNumber: 1,
            classificationid:0,
            assignedToEmailId:""
    });
    const mapChangesToState = (value) => {
    setState({ ...state, ...value });
    };

    const users=props.allAdminData.allAdminUsers;
    const classifications=props.classficationdetails;
    /******On select of the filter dropdown****/
    function onSelectChange(e){
      let {value,name}=e.target;
       
       switch (name) {
         case "Classification":
          mapChangesToState({ classificationid: value })
           break;
        case "Assignedto":
          mapChangesToState({ assignedToEmailId: value })
          break;
       
         default:
           break;
       }
       
    }
    /*******On click of the Apply Button*****/
    function OnclickHandleSubmit(){
      const requestParams = {
      classificationId:state.classificationid,
      assignedToEmailId:state.assignedToEmailId,
      page: state.currentPageNumber - 1,
      limit: 15,
      };
      console.log(requestParams,"Reqest")
      dispatch(
      actionCreators.getTicketByStatusFilter(requestParams, props.status)
      );
    }
    /******On Reset Button******/
    function OnclickHandleReset(){
        
        const requestParams = {
        classificationId:0,
        assignedToEmailId:"",
        page: state.currentPageNumber - 1,
        limit: 15,
        };
        document.getElementById("filterform").reset();
        dispatch(
        actionCreators.getTicketByStatusFilter(requestParams, props.status)
        );

    }
    function onsubmitHandle(){

    }
    /****To convert Assigned user data into the dropdown options****/
    function toconvertuser(){
        const new_obj= users.map(element => {
        let newobject={};
        newobject.value=element.name;
        newobject.key=element.emailId;
        return newobject
      });
      return new_obj 
    }
    /*******To convert classification values and ******/
    function toconvertclassifications(){
      let findclassification=classifications[0];
      if(findclassification){
        const new_obj=findclassification.map(e=>{
          let newobject={};
          newobject.value=e.name;
          newobject.key=e.id;
          return newobject  
        });
        return new_obj 
      }else{
        return[]
      }
      
  }
  
    return (
        <styles.formdiv style={{position: "relative",top: "20px",fontSize:"14px"}}>
          <form onSubmit={onsubmitHandle} id="filterform"style={props.formopen ? {visibility: "visible"}:{visibility: "hidden"}}>
                
                <div className="row" >
                
                    <Singlefield
                    isMulti={true}
                    id={"Classification"}
                    name="Classification"
                    isClearable={true}
                    title="Classification"
                    defaultValue={"Test"}
                    value={state.classificationid}
                    onChange={(e) => onSelectChange(e)}
                    options={toconvertclassifications()}
                    disabled={false}
                    isDisabled={false}
                    placeholder={"Test"}
                    
                    menuPlacement={"bottom"}
                    />
                    
                    <Singlefield
                    isMulti={true}
                    id={"Assignedto"}
                    name="Assignedto"
                    isClearable={true}
                    title="Assigned To"
                    defaultValue={"Test"}
                    value={"One"}
                    onChange={(e) => onSelectChange(e)}
                    options={toconvertuser()}
                    disabled={false}
                    isDisabled={false}
                    placeholder={"Test"}
                    
                    menuPlacement={"bottom"}
                    />
                </div>
                 <div className="row" style={{justifyContent: "center", padding:" 5px"}}>
                     <button type="button" style={{margin:" 5px"}} className="btn btn-primary btn-sm" onClick={OnclickHandleSubmit}>Apply</button>
                     <button type="button" style={{margin:" 5px"}}className="btn btn-primary btn-sm" onClick={OnclickHandleReset}>Reset</button>
                </div>
            </form>
        </styles.formdiv>
            
       
    )
}
const mapStatetoProps = (state) => {
    return {
        common: state.common,
        allAdminData: state.common.allAdminData,
        ticketList: state.ticketList,
      };
  };
  
export default connect(mapStatetoProps)(Filterform);
/*****End of code by Ravi_369*******/
//export default Filterform;
