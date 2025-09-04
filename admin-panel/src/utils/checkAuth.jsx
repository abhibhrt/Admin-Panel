import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axios";
import { setPersonalData, clearPersonalData } from "../redux/private/personalSlice";

export default function CheckAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await api.get("/personal/me");
                if (res.data) {
                    dispatch(setPersonalData(res.data));
                }
            } catch (err) {
                dispatch(clearPersonalData());
            }
        };

        verifyAuth();
    }, [dispatch]);

    return null;
}
