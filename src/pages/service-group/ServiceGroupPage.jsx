import { useMutation, useQuery } from '@apollo/client';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from "../../components/layout/Layout";
import Modal from '../../components/modal/Modal';
import TableLayout from "../../components/tableLayout/TableLayout";
import { DELETE_BRANCH, UPDATE_BRANCH } from "../../gql/service-group";
import { FIND_ALL_SERVICE_GROUP } from '../../gql/service-group';
import useCurrentUser from '../../stores/actions/useCurrentUser';
import { Columns } from './source';
import './styles.scss';

const ServiceGroupPage = () => {
  const [branchs, setBranch] = useState([]);
  const {currentUser} = useCurrentUser();
  const [updateBranch, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BRANCH);
  const [deleteBranch, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_BRANCH);
  const [currentBranch, setCurrentBranch] = useState({});
  const { loading, error, data } = useQuery(FIND_ALL_SERVICE_GROUP, {
    variables: { merchantId: currentUser?.merchants.edges[0].node.id },
  });

  useEffect(() => {
    const tmp = data ? data.findAllServiceGroups.edges.map(
      i => i.node
    ) : []
    setBranch(tmp)
  }, [data])

  if (error) return <p>Error :(</p>;

  const handleView = (branch) => {
    if(branch.id !==currentBranch?.id)
    setCurrentBranch(branch)
    
  }

  const handleChange = (e) => {
    setCurrentBranch(pre => ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }

  const handleDelete = (id) => {
    deleteBranch({ variables: { id: id } }).then(() => {
      toast("Xóa chi nhánh thành công!")
      window.location.reload()
    })
      .catch((error) => {
        console.log(`Error creating branch: ${error}`);
      });
  }

  const handleUpdateBranch = () => {
    updateBranch({
      variables: {
        id: currentBranch.id, data: {
          name: currentBranch.name,
          description: currentBranch.description,
          showType: currentBranch.showType,
        }
      }
    })
      .then(() => {
        toast("Cập nhật chi nhánh thành công!")
        window.location.reload()
        console.log('Branch updated successfully!');
      })
      .catch((error) => {
        console.log(`Error creating branch: ${error}`);
      });
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log({ params })

        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
            {/* <div className="viewButton"  onClick={() => handleView(params.row.id)} >View</div> */}
            <div onClick={() => handleView(params.row)}>
              <Modal>

                <div className='modal-view-branch' style={{ width: 500, paddingBottom: 50 }}>
                  <TextField name="name" label="Name" fullWidth value={currentBranch.name} onChange={handleChange} />
                  <TextField name="description" label="Mô tả" fullWidth value={currentBranch.description} onChange={handleChange} />
                  <TextField name="showType" label="Mục hiển thị" type={'number'} fullWidth value={currentBranch.showType} onChange={handleChange} />

                </div>
                <Button sx={{ marginLeft: "auto" }} variant="contained" color="primary" onClick={handleUpdateBranch} >
                  Lưu lại
                </Button>
              </Modal>
            </div>
            {/* </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className='branch'>
        {
          loading ? <p>Loading...</p> :
            <TableLayout linkAddNew="/service-group/new">
              <DataGrid
                className="datagrid"
                rows={branchs}
                columns={Columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                rowHeight={80}
              />
            </TableLayout>
        }

      </div>
    </Layout>
  )
}

export default ServiceGroupPage