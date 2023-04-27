import { useQuery } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import TableLayout from "../../components/tableLayout/TableLayout";
import { FIND_ALL_BOOKING_BY_MERCHANT } from "../../gql/booking";
import { Columns } from "./source";
import "./styles.scss";
import ModalAdd from "../../components/ModalAdd/ModalAdd";
import CreateService from "../service/CreateService";
const Booking = () => {
  const [isShowModal, setIsShowModal] = useState();
  const [bookings, setBookings] = useState([]);
  const { loading, error, data } = useQuery(FIND_ALL_BOOKING_BY_MERCHANT);
  console.log("====================================");
  console.log({ booking: data });
  console.log("====================================");
  useEffect(() => {
    if (data) setBookings(data.findAllBookingByMerchant.items);
  }, [data]);
  console.log("====================================");
  console.log({ bookings });
  console.log("====================================");

  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };
  return (
    <Layout>
      <div className="branch">
        <TableLayout linkAddNew="/branch/new" onClickAddNew={handleShowModal}>
          <DataGrid
            className="datagrid"
            rows={bookings}
            columns={Columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            rowHeight={80}
          />
        </TableLayout>
      </div>
      <ModalAdd isModal={isShowModal} setOpenModals={handleShowModal} >
        <div className="booking_add_new">
        <CreateService/>
        </div>
      </ModalAdd>
    </Layout>
  );
};

export default Booking;
