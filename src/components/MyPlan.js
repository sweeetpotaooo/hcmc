import React, { useState, useEffect } from "react";
import "../style/MyPlan.scss";
import axios from "axios";
import {
  TablePagination,
  Typography,
  TextField,
  Box,
  Button,
  Modal,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// 모달창 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
};

const MyPlan = () => {
  const [freePlans, setFreePlans] = useState([]);
  const [premeditatePlans, setPremeditatePlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const navigate = useNavigate();

  const handleOpen = (filteredRows) => {
    setSelectedPlan(filteredRows);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPlan(null);
    setOpen(false);
    window.location.reload(); // 모달창 닫을 시 자동으로 새로고침
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPlan((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  const handleSave = async () => {
    try {
      const FreeResponse = await axios.post(
        `http://localhost:4000/plandetail_free/consumption/update/${selectedPlan._id}`,
        selectedPlan
      );
      const PremeditateResponse = await axios.post(
        `http://localhost:4000/plandetail_premeditate/consumption/update/${selectedPlan._id}`,
        selectedPlan
      );
      if (FreeResponse) {
        const updatedPlans = selectedPlan.map((plan) =>
          plan._id === selectedPlan._id ? selectedPlan : plan
        );
        setFreePlans(updatedPlans);
        console.log(FreeResponse.data);
      } else {
        const updatedPlans = selectedPlan.map((plan) =>
          plan._id === selectedPlan._id ? selectedPlan : plan
        );
        setFreePlans(updatedPlans);
        console.log(PremeditateResponse.data);
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const FreeResponse = await axios.post(
        `http://localhost:4000/plandetail_free/consumption/delete/${selectedPlan._id}`,
        selectedPlan
      );
      const PremeditateResponse = await axios.post(
        `http://localhost:4000/plandetail_premeditate/consumption/delete/${selectedPlan._id}`,
        selectedPlan
      );
      if (FreeResponse) {
        console.log(FreeResponse.data);
      } else {
        console.log(PremeditateResponse.data);
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMovePlan = async () => {
    try {
      if (selectedPlan.pattern === "자유로운 소비") {
        navigate(`/free/${selectedPlan._id}`);
      } else if (selectedPlan.pattern === "계획적인 소비") {
        navigate(`/planned/${selectedPlan._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const freeResponse = await axios.get(
          `http://localhost:4000/plandetail_free/consumption/find`
        );
        const formatFreeData = freeResponse.data.map((plan) => ({
          ...plan,
          planStart: formatDate(plan.planStart),
          planEnd: formatDate(plan.planEnd),
        }));
        setFreePlans(formatFreeData);

        const PremeditateResponse = await axios.get(
          `http://localhost:4000/plandetail_premeditate/consumption/find`
        );
        const premeditateFormatData = PremeditateResponse.data.map((plan) => ({
          ...plan,
          planStart: formatDate(plan.planStart),
          planEnd: formatDate(plan.planEnd),
        }));
        setPremeditatePlans(premeditateFormatData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlan();
  }, []);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="MyPlanPage">
        <div className="div">
          <div className="mainTitle">내 플랜 관리</div>
          <div className="planContainer">
            <div className="current">
              <div className="plantitle">진행 중</div>
              {freePlans.length > 0 || premeditatePlans.length > 0 ? (
                freePlans
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((plan, index) => (
                    <div
                      key={index}
                      className="currentplan"
                      onClick={() => handleOpen(plan)}
                    >
                      <div>
                        <p>{plan.planName}</p>
                      </div>
                      <div>
                        <p>{`${plan.planStart} ~ ${plan.planEnd}`}</p>
                      </div>
                      <div>
                        <p>{plan.pattern}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p>
                  소비 플랜이 없습니다.
                  <br />위 플랜추가 버튼을 눌러 시작해보세요.
                </p>
              )}
              {premeditatePlans.length > 0 ? (
                premeditatePlans
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((plan, index) => (
                    <div
                      key={index}
                      className="currentplan"
                      onClick={() => handleOpen(plan)}
                    >
                      <div>
                        <p>{plan.planName}</p>
                      </div>
                      <div>
                        <p>{`${plan.planStart} ~ ${plan.planEnd}`}</p>
                      </div>
                      <div>
                        <p>{plan.pattern}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p>
                  계획적인 소비 플랜이 없습니다.
                  <br />위 플랜추가 버튼을 눌러 시작해보세요.
                </p>
              )}
              <TablePagination
                rowsPerPageOptions={[3, 6, 10]}
                component="div"
                count={freePlans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            <div className="past">
              <div className="plantitle">진행 완료</div>
              {premeditatePlans.length > 0 ? (
                premeditatePlans.map((plan, index) => (
                  <div key={index} className="pastplan">
                    <div>
                      <p>{plan.planName}</p>
                    </div>
                    <div>
                      <p>{`${plan.planStart} ~ ${plan.planEnd}`}</p>
                    </div>
                    <div>
                      <p>{plan.pattern}</p>
                    </div>
                    <div>총 수입 / 총 지출(계획적 소비인 경우 총 지출만?)</div>
                  </div>
                ))
              ) : (
                <p>완료된 소비 계획이 없습니다.</p>
              )}
              <TablePagination
                rowsPerPageOptions={[3, 6, 10]}
                component="div"
                count={freePlans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" />
          {selectedPlan && (
            <FormLabel>
              <TextField
                margin="dense"
                fullWidth
                name="planName"
                value={selectedPlan.planName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                fullWidth
                name="planStart"
                type="date"
                value={selectedPlan.planStart}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                fullWidth
                name="planEnd"
                type="date"
                value={selectedPlan.planEnd}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                fullWidth
                name="description"
                type="text"
                value={selectedPlan.description}
                onChange={handleInputChange}
              />
              <Button onClick={handleMovePlan}>Move</Button>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </FormLabel>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MyPlan;