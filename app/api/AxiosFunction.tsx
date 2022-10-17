import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const AxiosFunction = () => {

    const axiosPrivate = useAxiosPrivate();


    function postQuery(path: string, data: object): Promise<any> {
        return axiosPrivate.post(`${path}`, data);
    }


    function patchQuery(path: string, data: object): Promise<any> {
        return axiosPrivate.patch(`${path}`, data);
    }

    function getQuery(path: string): Promise<any> {
        return axiosPrivate.get(`${path}`);
    }

    function deleteQuery(path: string): Promise<any> {
        return axiosPrivate.delete(`${path}`);
    }

    return { getQuery, postQuery, deleteQuery, patchQuery }
}