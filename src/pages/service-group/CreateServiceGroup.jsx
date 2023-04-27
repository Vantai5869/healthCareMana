import { useMutation, useQuery } from '@apollo/client';
import { Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import { FIND_ALL_BRANCHES_BY_MERCHANT } from '../../gql/branch';
import { CREATE_SERVICE_GROUP } from '../../gql/service-group';
import useCurrentUser from '../../stores/actions/useCurrentUser';
import './styles.scss';

const CreateServiceGroup = ({onCreated}) => {
    const [branchs, setBranch] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState();
    const navigate = useNavigate()
    const { currentUser } = useCurrentUser();
    const { data } = useQuery(FIND_ALL_BRANCHES_BY_MERCHANT, {
        variables: { merchantId: currentUser?.merchants.edges[0].node.id },
    });

    useEffect(() => {
        const tmp = data ? data.findAllBranchesByMerchant.edges.map(
            i => ({
                label: i.node.name,
                value: i.node.id,
            })
        ) : []
        setBranch(tmp)
    }, [data])
    console.log('====================================');
    console.log({ branchs });
    console.log('====================================');
    console.log({ currentUser })
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        showType: '',
        branchId: '',
    });

    const [createServiceGroup, { loading, error }] = useMutation(CREATE_SERVICE_GROUP);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == 'showType') {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        createServiceGroup({ variables: { data: formData } })
            .then(() => {
                toast("Tạo thành công!")
                // navigate('/service-group')
                onCreated()
            })
            .catch((error) => {
                toast("Có lỗi xảy ra")
                console.log(`Error creating branch: ${error}`);
            });
    };


    const handleTypeSelect = e => {
        setFormData((prevData) => ({
            ...prevData,
            branchId: e.value,
        }));
        setSelectedBranchId(e.value);
    };

    const handleChangeShowType = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            showType: e.value,
        }));
    }
    return (
        // <Layout>
            <Container maxWidth="md" style={{ marginTop: 30 }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Tên Nhóm dịch vụ"
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
                            <div style={{  width: '100%', padding: 10 }}>
                                <span className='label'> Loại hiển thị</span>
                                <Select
                                    name='showType'
                                    options={[{ value: 'both_in_screen', label: 'both_in_screen' }, { value: 'only_cashier', label: 'only_cashier' }, , { value: 'only_booking', label: 'only_booking' }, , { value: 'not_at_all', label: 'not_at_all' },]}
                                    onChange={handleChangeShowType}
                                />
                            </div>


                            <div style={{ width: '100%', padding: 10 }}>
                                <span  className='label'> Chọn chi nhánh</span>
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
                                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                                    {loading ? 'Đang thêm...' : 'Tạo mới'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        // </Layout>

    );
};

export default CreateServiceGroup;
