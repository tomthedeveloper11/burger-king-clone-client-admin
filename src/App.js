import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './views/LoginPage'
import CreateItem from './views/CreateItemPage'
import EditItem from './views/EditItemPage'
import CreateCategory from './views/CreateCategoryPage'
import EditCategory from './views/EditCategoryPage'
import DashboardPage from './views/DashboardPage'
import CategoriesPage from './views/CategoriesPage'
import HomePage from './views/HomePage'
import RegisterAdminPage from './views/RegisterAdminPage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        >
          <Route index path='' element={<DashboardPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='categories' element={<CategoriesPage />} />
          <Route path='registerAdmin' element={<RegisterAdminPage />} />
          <Route path='createItem' element={<CreateItem />} />
          <Route path='editItem/:id' element={<EditItem />} />
          <Route path='createCategory' element={<CreateCategory />} />
          <Route path='editCategory/:id' element={<EditCategory />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
