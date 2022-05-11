import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { axiosConfig } from "../constants";
import { loginContext } from "../context/LoginProvider";
import useFetchWithLogin from "../hook/useFetchWithLogin";
import useFetchWithRefresh from "../hook/useFetchWithRefresh";
import { UserInfo, UsersRest } from "../types/rest";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MainPage = () => {
  const data = useFetchWithRefresh<UsersRest>({
    url: "/users",
    method: "get",
  });
  const { update } = data;

  const [editableData, setEditableData] = useState(
    data?.result?.users ?? ([] as UserInfo[])
  );

  useEffect(() => setEditableData(data?.result?.users ?? []), [data]);

  const deleteByEmail = async (email: string) => {
    try {
      const status = (
        await axios({
          ...axiosConfig,
          url: "/users",
          method: "delete",
          data: {
            email,
          },
        })
      ).status;
      if (status === 200)
        setEditableData((data) =>
          data.filter((value) => value.email !== email)
        );
    } catch {}
  };

  const addUser = async () => {
    try {
      const status = (
        await axios({
          ...axiosConfig,
          url: "/users",
          method: "post",
          data: {
            count: 1,
          },
        })
      ).status;
      console.log(status)
    } catch {}
  }

  const { isAdmin } = useContext(loginContext);

  if (data.isLoading) return <>Loading</>;

  console.log(data.result);
  return (
    <div className="Main">
      <div className="Main__container">
        {editableData.map((value) => (
          <Accordion key={value.email} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {value.name} {value.surname}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div>
                  Birthday: {dayjs(value.birthday).format("DD.MM.YYYY")}
                </div>
                <div>Email: {value.email}</div>
                <div>Works at: {value.profession}</div>
              </div>
              {isAdmin && (
                <Button onClick={() => deleteByEmail(value.email)}>
                  Delete
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        <div className="Main__container__refresh">
          <Button
            sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: blue[100],
              },
            }}
            onClick={update}
          >
            Refresh
          </Button>
          {isAdmin && <Button sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: blue[100],
              },
            }}
            onClick={addUser}>Add user</Button>}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
