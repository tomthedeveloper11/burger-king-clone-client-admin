import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems, deleteItem } from '../store/actions/itemsAction'
import Table from 'react-bootstrap/Table'
import ItemsTableRow from '../components/ItemsTableRow'
import { css } from '@emotion/react'
import BeatLoader from 'react-spinners/BeatLoader'

const override = css`
  display: block;
  margin: 320px 0  0 170px;
`

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.itemsReducer)
  const { isLoading } = useSelector((state) => state.indexReducer)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  function deleteHandler(id) {
    dispatch(deleteItem(id))
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

      {items && !isLoading &&  (
        <div className='pages'>
          <div className='d-flex justify-content-between p-2 align-items-center'>
            <h1>Product List</h1>
            <Link to='/createItem' className='btn BKButton'>
              Create Item
            </Link>
          </div>
          <Table striped bordered hover className='table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Created By</th>
                <th>Main Image</th>
                <th>Ingredients</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                return ItemsTableRow(i, item, deleteHandler)
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}
