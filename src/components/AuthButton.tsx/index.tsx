import { Button, ButtonProps, Tooltip } from "antd";
import { usePermission } from "@/hooks/usePermission"

interface AuthButtonProps extends ButtonProps{
  permission:string,
  mode?:'hide' | 'disable',
  children:React.ReactNode
}

export const AuthButton:React.FC<AuthButtonProps> = ({
  permission,
  mode = 'hide',
  children,
  ...restProps
})=>{
  const {hasPermission} = usePermission()
  const isAllowed = hasPermission(permission)

  //模式hide，隐藏按钮
  if(mode==='hide' && !isAllowed){
    return null
  }
  //模式disable,显示按钮，但隐藏
  if(mode==="disable" &&!isAllowed){
    return (
      <Tooltip title="暂无权限">
        <Button {...restProps} disabled>
          {children}
        </Button>
      </Tooltip>
    )
  }
  //有权限
  return <Button {...restProps}>{children}</Button>
}