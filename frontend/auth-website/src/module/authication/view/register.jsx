import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../controller/AuthController";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verify: "",
    birthdate: "",
    first_name: "",
    last_name: "",
    about_me: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(formData, navigate, setLoading);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "15px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h3 className="text-center mb-4 text-success">สมัครสมาชิก</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้ (Username)</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">อีเมล</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              name="verify"
              value={formData.verify}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">วันเกิด</label>
            <input
              type="date"
              className="form-control"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อจริง</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">นามสกุล</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">About Me</label>
            <textarea
              className="form-control"
              name="about_me"
              rows="3"
              value={formData.about_me}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <div className="text-center">
          <p className="mb-1">มีบัญชีแล้วใช่ไหม?</p>
          <Link to="/login" className="btn btn-outline-primary w-100">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
