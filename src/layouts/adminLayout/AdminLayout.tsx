import { Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <div className='bg-blue-500'>
        <Outlet/> {/*Salida de la ruta*/}
    </div>
  )
}

export default AdminLayout
