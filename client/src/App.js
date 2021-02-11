import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';

export default function App() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    getItems('beanies')
  }, [])


  const getItems = (props) => {
    console.log(props)
    fetch(`http://localhost:5000/${props}`)
      .then(response => response.json())
      .then(responseData => {
        setItems(responseData)
      })
      .catch(err => console.error(err))
  }

  const columns = [
    {
      Header: 'Type',
      accessor: 'type'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Color',
      accessor: 'color'
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      Header: 'Manufacturer',
      accessor: 'manufacturer'
    },
    {
      Header: 'Availability',
      accessor: 'instockvalue'
    }
  ]

  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ color: 'white', fontSize: 24, paddingRight: '30%' }}>
            Warehouse stock application
        </Typography>

        </Toolbar>
      </AppBar>
      <div style={{ paddingLeft: '40%', paddingBottom: 10, paddingTop: 10 }}>
        <Button variant="contained" color="primary" onClick={() => { getItems('beanies') }}>beanies</Button>
        <Button variant="contained" color="secondary" onClick={() => { getItems('gloves') }}>gloves</Button>
        <Button variant="contained" color="default" onClick={() => { getItems('facemasks') }}>masks</Button>
      </div>
      <ReactTable defaultPageSize={25} filterable={true}
        data={items} columns={columns} />
    </div>
  );
}
