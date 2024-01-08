import { DataGrid } from '@mui/x-data-grid/DataGrid'

const TableGrid = ({ rows, columns }: any) => {
  return <DataGrid rows={rows || []} columns={columns} hideFooter={true} sx={style} />
}

export default TableGrid

const style = {
  boxShadow: 0,
  borderRadius: 2,
  backgroundColor: '#FFFFFF',
  borderLeft: '24px solid #FFFFFF',
  borderRight: '24px solid #FFFFFF',
}
