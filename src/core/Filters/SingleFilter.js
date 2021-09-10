import React from "react";

function Singlefield (props){
    /**********Getting Props********/
    const {
        id,
        options,
        title,
        name,
        onChange,        
      } = props;
      return  <div  className="col-auto">
                <label className="my-1 mr-2">{title}</label>
                <select name={name} id={id} onChange={onChange}>
                    <option value="0">---Select---</option>
                    {options.map((value,key)=>{
                        return    <option key={key} value={value.key}>{value.value}</option>
                    })}
                </select>
               </div>
}

export default Singlefield;