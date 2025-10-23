import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Card กลางจอ */}
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3 text-primary">เข้าสู่ระบบ</h3>

        <form>
          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้หรืออีเมล</label>
            <input type="text" className="form-control" placeholder="กรอกชื่อผู้ใช้หรืออีเมล" />
          </div>

          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input type="password" className="form-control" placeholder="กรอกรหัสผ่าน" />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            เข้าสู่ระบบ
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
