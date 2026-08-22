import { Select } from "antd";
import type { SelectProps } from "antd";
import React from "react";


export type DefaultOptionType = NonNullable<SelectProps['options']>[number];

interface MySelectProps {
  options: DefaultOptionType[];
  placeholder?: string;
  children?: React.ReactNode;
  showSearch?: boolean;
  onChange?:SelectProps['onChange'],
  value:any
}

function MySelect(props:MySelectProps){
  const {
    options,
    placeholder = "请选择",
    children,
    showSearch=true,
    onChange,
    value
  }=props
  return <Select 
      options={options}
      placeholder={placeholder}
      showSearch={showSearch}
      filterOption={(input, option) =>
          String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      style={{width:"100%"}}
      onChange={onChange}
      value={value} //设置value使其受控
    >
      {children}
  </Select>
}

export default React.memo(MySelect)