// import { DataGrid } from '@mui/x-data-grid'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Layout from '../../components/layout/Layout'
// import TableLayout from '../../components/tableLayout/TableLayout'
// import { Columns, healthBeautyServices } from './source'
// import "./styles.scss";

// export default function ServicePage() {
//     const [service, setService] =  useState(healthBeautyServices)

//     const handleDelete=()=>{

//     }
//     const actionColumn = [
//         {
//           field: "action",
//           headerName: "Action",
//           width: 200,
//           renderCell: (params) => {
//             return (
//               <div className="cellAction">
//                 <Link to="/users/test" style={{ textDecoration: "none" }}>
//                   <div className="viewButton">View</div>
//                 </Link>
//                 <div
//                   className="deleteButton"
//                   onClick={() => handleDelete(params.row.id)}
//                 >
//                   Delete
//                 </div>
//               </div>
//             );
//           },
//         },
//       ];

//     return (
//         <Layout >
//             <div className='service'>
//             <TableLayout linkAddNew='/service/new'>
//                 <DataGrid
//                     className="datagrid"
//                     rows={service}
//                     columns={Columns.concat(actionColumn)}
//                     pageSize={9}
//                     rowsPerPageOptions={[9]}
//                     checkboxSelection
//                     rowHeight={80}
//                 />
//             </TableLayout>
//             </div>
//         </Layout>
//     )
// }

import { useMutation, useQuery } from "@apollo/client";
import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import TableLayout from "../../components/tableLayout/TableLayout";
import { DELETE_BRANCH, UPDATE_BRANCH } from "../../gql/service";
import { FIND_ALL_SERVICE_GROUP } from "../../gql/service";
import useCurrentUser from "../../stores/actions/useCurrentUser";
import { Columns } from "./source";
import "./styles.scss";
import Loading from "../../components/loading/Loading";
import ModalAdd from "../../components/ModalAdd/ModalAdd";
import CreateService from "./CreateService";

const ServiceGroupPage = () => {
  const [isShowModal, setIsShowModal] = useState();
  const [branchs, setBranch] = useState([]);
  const { currentUser } = useCurrentUser();
  const [updateBranch, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_BRANCH);
  const [deleteBranch, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_BRANCH);
  const [currentBranch, setCurrentBranch] = useState({});
  const { loading, error, data, refetch } = useQuery(FIND_ALL_SERVICE_GROUP);

  useEffect(() => {
    const tmp = data ? data.findAllBranchServices.edges.map((i) => i.node) : [];
    setBranch(tmp);
  }, [data]);

  if (error) return <p>Error :(</p>;

  const handleView = (branch) => {
    if (branch.id !== currentBranch?.id) setCurrentBranch(branch);
  };

  const handleChange = (e) => {
    setCurrentBranch((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = (id) => {
    deleteBranch({ variables: { id: id } })
      .then(() => {
        toast("Xóa thành công!");
        refetch();
      })
      .catch((error) => {
        console.log(`Error creating branch: ${error}`);
      });
  };

  const handleUpdateBranch = () => {
    updateBranch({
      variables: {
        id: currentBranch.id,
        data: {
          name: currentBranch.name,
          description: currentBranch.description,
          price: currentBranch.price,
        },
      },
    })
      .then(() => {
        toast("Cập nhật chi nhánh thành công!");
        refetch();
        console.log("Branch updated successfully!");
      })
      .catch((error) => {
        console.log(`Error creating branch: ${error}`);
      });
  };

  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log({ params });

        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
            {/* <div className="viewButton"  onClick={() => handleView(params.row.id)} >View</div> */}
            <div onClick={() => handleView(params.row)}>
              <Modal>
                <div
                  className="modal-view-branch"
                  style={{ width: 500, paddingBottom: 50 }}
                >
                  <TextField
                    name="name"
                    label="Name"
                    fullWidth
                    value={currentBranch.name}
                    onChange={handleChange}
                  />
                  <TextField
                    name="description"
                    label="Mô tả"
                    fullWidth
                    value={currentBranch.description}
                    onChange={handleChange}
                  />
                  <TextField
                    name="price"
                    label="Giá"
                    type={"number"}
                    fullWidth
                    value={currentBranch.price}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateBranch}
                >
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
      <div className="service">
        {loading ? (
          <Loading />
        ) : (
          <TableLayout
            linkAddNew="/service/new"
            onClickAddNew={handleShowModal}
          >
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
        )}
      </div>
      <ModalAdd isModal={isShowModal} setOpenModals={handleShowModal}>
        <div className="booking_add_new">
          <CreateService onCreated={refetch}/>
        </div>
      </ModalAdd>
    </Layout>
  );
};

export default ServiceGroupPage;
