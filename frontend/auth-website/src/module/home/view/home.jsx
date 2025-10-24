import React, { useEffect, useState } from "react";
import { loadUserProfile } from "../controller/home-controller";
import { useNavigate } from "react-router-dom";

function HomeView() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchUserProfile() {
    setLoading(true);
    await loadUserProfile(setUser, navigate);
    setLoading(false);
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <h2 className="text-muted">กำลังโหลดข้อมูลผู้ใช้...</h2>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow rounded-4 p-4">
        <h1 className="text-center fw-bold">
          ยินดีต้อนรับ
        </h1>
        <h1 className="text-center fw-bold mb-5">
          {user.first_name} {user.last_name}
        </h1>
        <h1 className="text-center fw-bold mb-5">🎉🎉🎉</h1>

        <div className="text-secondary mb-4">
          <p><strong>ชื่อผู้ใช้:</strong> {user.username}</p>
          <p><strong>อีเมล:</strong> {user.email}</p>
          <p><strong>วันเกิด:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
          <p><strong>เกี่ยวกับฉัน:</strong> {user.about_me}</p>
          <p><strong>สมัครเมื่อ:</strong> {new Date(user.created_at).toLocaleString()}</p>
        </div>

        {/* 🔹 ปุ่มอยู่ตรงกลางและห่างกัน */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary px-4"
            onClick={fetchUserProfile}
            disabled={loading}
          >
            {loading ? "กำลังดึงข้อมูล..." : "รีเฟรชข้อมูล"}
          </button>

          <button
            className="btn btn-danger px-4"
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              navigate("/login");
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
