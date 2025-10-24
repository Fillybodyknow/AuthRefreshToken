import { createRegisterBody, createLoginBody } from "../model/AuthModel";

const HTTPS = "http://localhost:8080"

export async function registerUser(formData, navigate, setLoading) {
    
  const body = createRegisterBody(formData);

  try {
    setLoading(true);
    const res = await fetch(HTTPS +"/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("สมัครสมาชิกสำเร็จ!");
      navigate("/login");
    } else if (res.status === 400) {
      alert("เกิดข้อผิดพลาด: " + (data.error || "ตรวจสอบข้อมูลอีกครั้ง"));
    } else {
      alert("เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  } finally {
    setLoading(false);
  }
}

export async function loginUser(formData, navigate, setLoading) {

  const body = createLoginBody(formData);

  try {
    setLoading(true);
    const res = await fetch(HTTPS +"/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);  
      alert("เข้าสู่ระบบสําเร็จ!");
      navigate("/");
    } else if (res.status === 400) {
      alert("เกิดข้อผิดพลาด: " + (data.error || "ตรวจสอบข้อมูลอีกครั้ง"));
    } else {
      alert("เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  } finally {
    setLoading(false);
  }
}
