import { formatDate, formatPrice } from "../../helper/helper";

export const Columns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "name",
    headerName: "Tên nhóm dịch vụ",
    width: 300,
  },

  {
    field: "description",
    headerName: "Mô tả",
    width: 300,
  },
  {
    field: "createAt",
    headerName: "Ngày tạo",
    width: 250,
    renderCell: (params) => {
      return (
       <span>{formatDate(params.row.createdAt) }</span>
      );
    },
  },
 
];
