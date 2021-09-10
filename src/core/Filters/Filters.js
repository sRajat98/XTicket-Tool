import React,{useState} from 'react';
import Filterform from './FilterForm';
import { connect } from "react-redux";
import downArrow from "../../images/expand-arrow.png";
function Filters (props){
    const [formopen, setFormopen] = useState();
    function tofindthedepartment(){
     
        let dept=props.departments.filter(e=>e.name===props.ticketList.logindept).map(function (e) {
        return e.classifications;
    });
       return dept;
    }
    const setfilterform = () => {
      setFormopen(!formopen);
    };
    
   return <div style={{display: "flex",justifyContent: "start",alignItems: "center",height:"100px",marginLeft:"30px"}}>
          <button className="btn btn-primary btn-sm" onClick={setfilterform}>Filters</button>
        <img
            src={downArrow}
            alt="down arrow"
            style={formopen ? {transform: "rotate(90deg)",
            width: "25px",
            textAlign: "center",
            display: "flex",
           } : { 
            transform:"rotate(270deg)",
            width: "25px",
            textAlign: "center",
            display: "flex",
            }}
          />
         <Filterform formopen= {formopen} classficationdetails={tofindthedepartment()} status={props.status}></Filterform>
    </div>
}
const mapStatetoProps = (state) => {
    return {
        common: state.common,
        ticketList: state.ticketList,
        departments:state.common.departments,
      };
  };
  
export default connect(mapStatetoProps)(Filters);
/*****End of the code by Ravi_369 */
//export default Filters;