import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  deleteCategory,
  fetchCategories,
} from '../store/actions/categoriesAction'
import Table from 'react-bootstrap/Table'
import CategoriesTableRow from '../components/CategoriesTableRow'
import { css } from '@emotion/react'
import BeatLoader from 'react-spinners/BeatLoader'

const override = css`
  display: block;
  margin: 320px 0 0 170px;
`
export default function CategoriesPage() {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categoriesReducer)
  const { isLoading } = useSelector((state) => state.indexReducer)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  function deleteHandler(id) {
    dispatch(deleteCategory(id))
  }

  return (
    <>
      <div className='sweet-loading'>
        <BeatLoader
          color={'white'}
          loading={isLoading}
          css={override}
          size={40}
          margin={7}
        />
      </div>
      {categories && !isLoading && (
        <div className='pages'>
          <div className='d-flex justify-content-between p-2 align-items-center'>
            <h1>Category List</h1>
            <Link to='/createCategory' className='btn BKButton'>
              Create Category
            </Link>
          </div>
          <Table striped bordered hover className='table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => {
                return CategoriesTableRow(i, category, deleteHandler)
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}
