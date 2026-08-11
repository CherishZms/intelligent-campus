import { lazy } from "react";

const DashBoard = lazy(()=>import('@/pages/dashBoard'))
const Users = lazy(()=>import('@/pages/users'))
const UserList = lazy(()=>import('@/pages/users/userList'))
const AddUser = lazy(()=>import('@/pages/users/addUser'))
const Estate = lazy(()=>import('@/pages/estate'))
const Tenement = lazy(()=>import('@/pages/estate/tenement'))
const Room = lazy(()=>import('@/pages/estate/room'))
const Car = lazy(()=>import('@/pages/estate/car'))
const Repair = lazy(()=>import('@/pages/repair'))
const Finance = lazy(()=>import('@/pages/finance'))
const Contract = lazy(()=>import('@/pages/finance/constract'))
const Surrender = lazy(()=>import('@/pages/finance/constract'))
const Bill = lazy(()=>import('@/pages/finance/bill'))
const Merchants = lazy(()=>import('@/pages/merchants'))
const Operation = lazy(()=>import('@/pages/operation'))
const OperationAll = lazy(()=>import('@/pages/operation/operationAll'))
const Article = lazy(()=>import('@/pages/operation/article'))
const Comments = lazy(()=>import('@/pages/operation/comments'))
const Equipment = lazy(()=>import('@/pages/equipment'))
const Enery = lazy(()=>import('@/pages/energy'))
const Settings = lazy(()=>import('@/pages/settings'))
const Personal = lazy(()=>import('@/pages/personal'))


export const routerMap = {
  "/dashboard":<DashBoard />,
  "/users":<Users />,
  "/users/1ist":<UserList />,
  "/users/add":<AddUser />,
  "/estate":<Estate />,
  "/estate/tenement":<Tenement />,
  "/estate/room":<Room />,
  "/estate/car":<Car/>,
  "/repair":<Repair />,
  "/finance":<Finance />,
  "/finance/contract":<Contract />,
  "/finance/surrender":<Surrender />,
  "/finance/bil1":<Bill />,
  "/merchants":<Merchants />,
  "/operation":<Operation />,
  "/operation/al1":<OperationAll />,
   "/operation/article":<Article />,
   "/operation/comments":<Comments />,
   "/equipment":<Equipment />,
   "/energy":<Enery />,
   "/settings":<Settings />,
   "/personal":<Personal />,
}