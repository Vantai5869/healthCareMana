import { formatDate, formatPrice } from "../../helper/helper";

export const Columns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "Tên nhóm dịch vụ",
    width: 280,
  },

  {
    field: "description",
    headerName: "Mô tả",
    width: 200,
  },
  {
    field: "createAt",
    headerName: "Ngày tạo",
    width: 300,
    renderCell: (params) => {
      return (
       <span>{formatDate(params.row.createdAt) }</span>
      );
    },
  },
 
];
