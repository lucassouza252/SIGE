import React from 'react'
import Select from 'react-select'

 function CustomSelect({label,options,onChange}){
    return (
            <>
                <label>{label}</label>
                <Select options={options} onChange={onChange} />
            </>
    )
}
export default CustomSelect;