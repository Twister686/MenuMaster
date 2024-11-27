import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../Contexts/AuthContext";

const AdminRoutes = ({children}) => {
	const {user} = useContext(AuthContext);

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default AdminRoutes;
