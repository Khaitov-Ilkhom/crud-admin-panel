import { BsBoxSeam } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { DashboardContentTitle } from "../../utils";
import { Table, Button, Space, Modal, Form, Input, Select } from "antd";
import axios from "../../api";
import "./DashboardContent.scss";
import TextArea from "antd/es/input/TextArea";


localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZDJhOWM3OTYzZjc5N2YyNTQzMTFiIn0sImlhdCI6MTcyMDc4NjA1MiwiZXhwIjoxNzIwNzg5NjUyfQ.t-dgt3kyqXdIWg_4uUiVKNpaEnxFcUqbjrYhNPs6iQ8")

const DashboardContent = ({ title, data, loading }) => {
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [updateProduct, setUpdateProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [form] = Form.useForm();


    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        try {
            const res = await axios.delete(`/products/${deleteProduct._id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            location.reload()
        } catch (error) {
            console.log(error)
        }
        setDeleteProduct(null)

    };

    const onFinishUpdate = (values) => {
        try {
            axios.put(`/products/${updateProduct._id}`, values, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            location.reload()
        } catch (error) {
            console.log(error)
        }
        setUpdateProduct(null)
    };
    const onFinishFailedUpdate = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishAdd = (values) => {
        try {
            axios.post(`/products/`, values, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            location.reload()
        } catch (error) {
            console.log(error)
        }
        setUpdateProduct(null)
    };
    const onFinishFailedAdd = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleUpdate = () => {
        console.log(updateProduct);
        setUpdateProduct(null)
    };

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if (data?.at(0)) {
            const { __v, _id, password, ...rest } = data[0]
            setColumns(Object.keys({ ...rest, actions: "Delete" }).map((key) => ({
                title: key, dataIndex: key, key, width: key === "description" && 400, className: "td-item", render: (item) => {
                    if (typeof item === "string" && item.startsWith("http")) {
                        return <img width={50} data-td-item={key} src={item} />
                    }
                    else {
                        return <span data-td-item={key}>{item}</span>
                    }
                }
            })))
        }

    }, [data])


    return (
        <>
            <DashboardContentTitle><div className="dashboard-content-title">{title} <Button className="btn_add_product" onClick={() => setNewProduct(true)} type="primary">Add new product <BsBoxSeam /></Button></div></DashboardContentTitle>
            <Table
                columns={columns}
                dataSource={data.map(item => ({
                    ...item, key: item._id, actions: <div style={{ display: "flex", gap: 10 }}>
                        <Button type="primary" danger onClick={() => setDeleteProduct(item)} ><BsFillTrashFill /></Button>
                        <Space />
                        <Button onClick={() => setUpdateProduct(item)} style={{ background: "gold", color: "#000" }} type="primary" ><AiFillEdit /></Button>
                    </div>
                }))}
                loading={loading}
                scroll={{
                    x: 1300,
                }}
            />
            <Modal
                maskClosable={false}
                title={`Delete ${deleteProduct?.name}`}
                open={Boolean(deleteProduct)}
                onOk={handleOk}
                onCancel={() => setDeleteProduct(null)}
                okButtonProps={{
                    danger: true
                }}
            >
                Are you really going to delete this product?
            </Modal>
            <Modal
                maskClosable={false}
                className="update-product"
                title={`Update ${updateProduct?.name}`}
                open={Boolean(updateProduct)}
                onOk={handleUpdate}
                onCancel={() => setUpdateProduct(null)}
                okButtonProps={{
                    danger: true
                }}
                footer={null}
            >
                <Form

                    layout="vertical"
                    onFinish={onFinishUpdate}
                    onFinishFailed={onFinishFailedUpdate}
                    autoComplete="off"
                >
                    <Form.Item

                        label="Product name"
                        name="name"

                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ]}
                    >
                        <Input defaultValue={updateProduct?.name} />
                    </Form.Item>

                    <Form.Item
                        label="Product price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product price!',
                            },
                        ]}
                    >
                        <Input defaultValue={updateProduct?.price} />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        initialValue={updateProduct?.category}
                        rules={[{ required: true, message: 'Please select category' }]}
                    >
                        <Select defaultValue={updateProduct?.category} >
                            <Select.Option default value="electronics">Electronics</Select.Option>
                            <Select.Option value="clothes">Clothes</Select.Option>
                            <Select.Option value="shoes">Shoes</Select.Option>
                            <Select.Option value="home appliances">Home Appliances</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Product description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product description!',
                            },
                        ]}
                    >
                        <TextArea rows={4} defaultValue={updateProduct?.description} />
                    </Form.Item>
                    <Form.Item
                        className="btn-submit"
                        width="100%"
                        wrapperCol={{
                            offset: 10,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="text-center">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                maskClosable={false}
                title={"Add new product"}
                open={Boolean(newProduct)}
                onOk={handleUpdate}
                onCancel={() => setNewProduct(null)}
                okButtonProps={{
                    danger: true
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinishAdd}
                    onFinishFailed={onFinishFailedAdd}
                    autoComplete="off"
                >
                    <Form.Item

                        label="Product name"
                        name="name"

                        rules={[
                            {
                                required: true,
                                message: 'Please input new product name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Product price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input new price!',
                            }

                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Product description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input new description!',

                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Product category"
                        rules={[{ required: true, message: 'Please select category' }]}
                    >
                        <Select defaultValue={updateProduct?.category} >
                            <Select.Option default value="disabled" disabled>
                                Select category
                            </Select.Option>
                            <Select.Option value="electronics">Electronics</Select.Option>
                            <Select.Option value="clothes">Clothes</Select.Option>
                            <Select.Option value="electronics">Electronics</Select.Option>
                            <Select.Option value="shoes">Shoes</Select.Option>
                            <Select.Option value="home appliances">Home Appliances</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Product image"
                        message="Please input new image!"
                        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Product Discount"
                        name="discount"
                        rules={[

                            { required: true, message: 'Please input new discount!' },

                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        className="btn-submit"
                        width="100%"
                        wrapperCol={{
                            offset: 10,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="text-center">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default DashboardContent;
