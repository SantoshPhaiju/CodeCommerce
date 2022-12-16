import { Check, Save } from "@mui/icons-material";
import { CircularProgress, Fab } from "@mui/material";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../../../slices/productSlice";

const UserActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const updateStatus = useSelector((state) => state.products.updateStatus);

  const handleSubmit = async () => {
    console.log("status" + updateStatus);
    setLoading(true);
    const { _id } = params.row;
    const result = dispatch(updateProduct(params.row));
    console.log(result);
    setLoading(false);
    setSuccess(true);
  };
  return (
    <div>
      <Box
        sx={{
          m: 1,
          position: "realtive",
        }}
      >
        {success ? (
          <Fab
            color="success"
            sx={{
              width: 40,
              height: 40,
            }}
          >
            <Check color="success" />
          </Fab>
        ) : (
          <Fab
            color="error"
            sx={{
              width: 40,
              height: 40,
              position: "realtive",
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            {loading && (
              <CircularProgress
                size={40}
                color="success"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />
            )}
            <Save color="primary" />
          </Fab>
        )}
      </Box>
    </div>
  );
};

export default UserActions;
