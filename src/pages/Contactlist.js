import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteContact,
  getContacts,
  resetState,
} from "../features/contacts/contactSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Nội dung liên hệ",
    dataIndex: "description",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Thời gian liên hệ",
    dataIndex: "createdAt",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Contactlist = () => {
  const [open, setOpen] = useState(false);
  const [contactid, setContactId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setContactId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getContacts());
  }, []);
  const brandState = useSelector((state) => state.contacts.contacts);
  console.log(useSelector((state) => state.contacts.contacts));
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].name,
      email: brandState[i].email,
      phone: brandState[i].phone,
      address: brandState[i].address,
      description: brandState[i].description,
      createdAt: moment(brandState[i].createdAt).format("DD-MM-YYYY"),
      action: (
        <>
          <div className="flex">
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brandState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const deletedContact = (e) => {
    dispatch(deleteContact(e));
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <div className="md:flex md:flex-col md:items-start">
      <h3 className="mb-4 text-xl font-bold">Liên hệ</h3>
      <div className="overflow-x-auto w-full">
        <Table
          columns={columns}
          dataSource={data1}
          className="table-auto w-full border-collapse"
        />
      </div>
      <div className="mt-4">
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deletedContact(contactid);
          }}
          title="Bạn có muốn xóa liên hệ này không?"
        />
      </div>
    </div>
  );
};

export default Contactlist;
