import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Grid, Paper, Container } from '@material-ui/core';
import { CREATE_BRANCH } from '../../gql/branch';
import Layout from '../../components/layout/Layout';
import LocationSelector from "../../components/addressSelect";
import useCurrentUser from '../../stores/actions/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddBranch = ({onCreated}) => {
    const navigate = useNavigate()
    const { currentUser } = useCurrentUser();
    console.log({ currentUser })
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        merchantId: '',
        userId: '',
        cityCode: '',
        districtCode: '',
        wardCode: '',
    });

    useEffect(() => {
        if (!!currentUser)
            setFormData((prevData) => ({
                ...prevData,
                merchantId: currentUser?.merchants.edges[0].node.id,
                userId: currentUser?.id,
            }));
    }, [currentUser])


    const [createBranch, { loading, error }] = useMutation(CREATE_BRANCH);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleChangeAddress = useCallback(
        (e) => {
            setFormData({
                ...formData,
                ...e
            })

        }, [formData])


    const handleSubmit = (event) => {
        event.preventDefault();
        createBranch({ variables: { data: formData } })
            .then(() => {
                toast("Tạo branch thành công!")
                onCreated()
            })
            .catch((error) => {
                console.log(`Error creating branch: ${error}`);
            });
    };

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
                                    label="Tên chi nhánh"
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
                                    label="Điện thoại"
                                    name="phone"
                                    value={formData.phone}
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
                                    label="Địa chỉ"
                                    name="address"
                                    value={formData.address}
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
                                    label="Merchant ID"
                                    name="merchantId"
                                    value={formData.merchantId}
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
                                    label="User ID"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    style={{ fontSize: "14px" }}
                                    InputLabelProps={{
                                        style: { fontSize: 14 }
                                    }}
                                />
                            </Grid> */}
                            {/* <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="City Code"
                                    name="cityCode"
                                    value={formData.cityCode}
                                    onChange={handleChange}
                                    style={{ fontSize: "14px" }}
                                    InputLabelProps={{
                                        style: { fontSize: 14 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="District Code"
                                    name="districtCode"
                                    value={formData.districtCode}
                                    onChange={handleChange}
                                    style={{ fontSize: "14px" }}
                                    InputLabelProps={{
                                        style: { fontSize: 14 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Ward Code" name="wardCode" value={formData.wardCode} onChange={handleChange} />
                            </Grid> */}
                            <Grid item xs={12}>
                            <LocationSelector onChangAddress={handleChangeAddress} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                                    {loading ? 'Đang thêm...' : 'Tạo branch'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        // </Layout>

    );
};

export default AddBranch;
