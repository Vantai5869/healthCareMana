import { useMutation, useQuery } from '@apollo/client';
import { Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import { CREATE_SERVICE_GROUP } from '../../gql/service';
import { FIND_ALL_SERVICE_GROUP } from '../../gql/service-group';
import useCurrentUser from '../../stores/actions/useCurrentUser';
import useUploadFile from '../../stores/actions/useUpload';
const CreateService = () => {
    const [branchs, setBranch] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState();
    const navigate = useNavigate()
    const { currentUser } = useCurrentUser();
    const [file, setFile] = useState("");
    const { upload, data: dataUpload } = useUploadFile();
    const handleUploadImg = (e) => {
        upload({ variables: { file } })
    }
    const { data } = useQuery(FIND_ALL_SERVICE_GROUP, {
        variables: { merchantId: currentUser?.merchants.edges[0].node.id },
    });

    useEffect(() => {
        
        const tmp = data ? data.findAllServiceGroups.edges.map(
            i => ({
                label: i.node.name,
                value: i.node.id,
            })
        ) : []
        setBranch(tmp)
    }, [data])

    const [formData, setFormData] = useState({
        serviceGroupId: '',
        price: '',
        capitalPrice: '',
        durationHour: '',
        durationMinute: '',
        name: '',
        code: '',
        description: '',
        canEditPriceInPay: false,
        image: '',
        showType: '',
        status: 'active',
        canPrintHouseInInvoice: false,
    });

    const [createServiceGroup, { loading, error }] = useMutation(CREATE_SERVICE_GROUP);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (['serviceGroupId','price','capitalPrice','durationHour', 'durationMinute' ].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: +value,
            }));
        } else
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
    };

    console.log('====================================');
    console.log({ formData });
    console.log('====================================');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUploadImg()

    };

    useEffect(() => {
        if (dataUpload) {
            createServiceGroup({ variables: { data:{...formData, image: dataUpload.uploadSingleFiles.url} } })
                .then(() => {
                    toast("Tạo thành công!")
                    navigate('/service')
                })
                .catch((error) => {
                    toast("Có lỗi xảy ra")
                    console.log(`Error creating branch: ${error}`);
                });
        }
    }, [dataUpload])


    const handleTypeSelect = e => {
        setFormData((prevData) => ({
            ...prevData,
            serviceGroupId: e.value,
        }));
        setSelectedBranchId(e.value);
    };

    const handleChangeStatus = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            status: e.value,
        }));
    }
    const handleChangeShowType = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            showType: e.value,
        }));
    }

    return (
        <Layout>
            <div className="service">
                <Container maxWidth="md" style={{ marginTop: 30 }}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <div style={{ width: '90%', padding: 10 }}>
                                    <span> Chọn nhóm dịch vụ</span>
                                    <Select
                                        options={branchs}
                                        onChange={handleTypeSelect}
                                        value={branchs.filter(function (option) {
                                            return option.value === selectedBranchId;
                                        })}
                                        label="Single select"
                                    />
                                </div>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Tên dịch vụ"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Mã dịch vụ"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Giá"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Giá gốc"
                                        name="capitalPrice"
                                        value={formData.capitalPrice}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Thời gian(giờ)"
                                        name="durationHour"
                                        value={formData.durationHour}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Thời gian(phút)"
                                        name="durationMinute"
                                        value={formData.durationMinute}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Mô tả"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid>

                                {/* <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Mục hiển thị"
                                        name="showType"
                                        type={'number'}
                                        value={formData.showType}
                                        onChange={handleChange}
                                        style={{ fontSize: "14px" }}
                                        InputLabelProps={{
                                            style: { fontSize: 14 }
                                        }}
                                    />
                                </Grid> */}

                                <div style={{ width: '90%', padding: 10 }}>
                                    <span> Trạng thái</span>
                                    <Select
                                        name='status'
                                        options={[{ value: 'active', label: 'active' }, { value: 'pending', label: 'pending' },]}
                                        onChange={handleChangeStatus}
                                    />
                                </div>
                                <div style={{ width: '90%', padding: 10 }}>
                                    <span> Loại hiển thị</span>
                                    <Select
                                        name='showType'
                                        options={[{ value: 'both_in_screen', label: 'both_in_screen' }, { value: 'only_cashier', label: 'only_cashier' }, , { value: 'only_booking', label: 'only_booking' }, , { value: 'not_at_all', label: 'not_at_all' },]}
                                        onChange={handleChangeShowType}
                                    />
                                </div>
                                <p className='img-lable'> Ảnh sản phẩm</p>
                                <div className='imge-service'>
                                    <div className="left">
                                        <img
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="right">
                                        <div className="formInput">
                                            <label htmlFor="file">
                                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                onChange={(e) => setFile(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                                        {loading ? 'Đang thêm...' : 'Tạo mới'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        </Layout>

    );
};

export default CreateService;
