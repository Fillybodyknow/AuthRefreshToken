

import { UserProfile } from "../model/home-model";

const HTTPS = "http://localhost:8080"

export async function loadUserProfile(setUser, navigate) {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    navigate("/login");
    return;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const res = await fetchWithAuth(HTTPS + "/api/user/profile");

    if (res.status === 200) {
      const data = await res.json();
      // แปลงข้อมูล JSON เป็น Object ของ Model
      const user = new UserProfile(data);
      setUser(user);
    } else if (res.status === 401) {
      alert("Token หมดอายุหรือไม่ถูกต้อง");
      navigate("/login");
    } else {
      alert("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    }
  } catch (err) {
    console.error(err);
    alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
  }
}

async function fetchWithAuth(url, options = {}) {
  const accessToken = localStorage.getItem('access_token');

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
      localStorage.clear();
      window.location.href = '/login';
      return;
    }

    // แจ้งผู้ใช้ว่า token หมดอายุและกำลังต่ออายุ
    alert("Access token หมดอายุ ระบบกำลังต่ออายุ token...");

    const refreshRes = await fetch(HTTPS + '/api/auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshRes.ok) {
      alert("ไม่สามารถต่ออายุ token ได้ กรุณาเข้าสู่ระบบใหม่");
      localStorage.clear();
      window.location.href = '/login';
      return;
    }

    const data = await refreshRes.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);

    alert("ต่ออายุ token สำเร็จ");

    // เรียก API ซ้ำด้วย token ใหม่
    return fetchWithAuth(url, options);
  }

  return res;
}
