import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axios";
import { setUserData, clearUserData } from "../redux/private/userSlice";
import { setOrderData, clearOrderData } from "../redux/private/orderSlice";

export default function FetchData() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                if (res.data) {
                    dispatch(setUserData(res.data));
                }
            } catch (err) {
                dispatch(clearUserData());
            }
        };

        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders");
                if (res.data) {
                    dispatch(setOrderData(res.data));
                }
            } catch (err) {
                dispatch(clearOrderData());
            }
        };

        fetchOrders();
        fetchUsers();
    }, [dispatch]);

    return null;
}