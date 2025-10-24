import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../controller/AuthController";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    loginUser(formData, navigate, setLoading);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3 text-primary">เข้าสู่ระบบ</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้หรืออีเมล</label>
            <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="กรอกชื่อผู้ใช้หรืออีเมล" />
          </div>

          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="กรอกรหัสผ่าน" />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "กําลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <hr />

        <div className="text-center">
          <p className="mb-1">ยังไม่มีบัญชีใช่ไหม?</p>
          <Link to="/register" className="btn btn-outline-secondary w-100">
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
